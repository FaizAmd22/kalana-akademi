import { useEffect, useRef, useState, type ReactNode } from "react"
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  Loader2Icon,
  MinusIcon,
  PilcrowIcon,
  QuoteIcon,
  Redo2Icon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toHtml } from "@/lib/rich-text"
import { cn } from "@/lib/utils"
import { uploadImage } from "@/services/storage.service"

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  /** Cloudinary folder for images inserted into the content */
  folder: string
  placeholder?: string
  invalid?: boolean
}

/**
 * Tiptap editor for article bodies. Outputs HTML; old plain-text values
 * are converted on load. Images are uploaded to Cloudinary (also when
 * pasted or dropped) so only URLs end up in the Firestore document.
 */
export default function RichTextEditor({
  value,
  onChange,
  folder,
  placeholder = "Tulis isi artikel di sini...",
  invalid,
}: RichTextEditorProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  // handlers inside editorProps are created once, so reach the latest
  // upload function through a ref
  const insertFilesRef = useRef<(files: File[], pos?: number) => void>(() => {})

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        code: false,
        codeBlock: false,
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
        },
      }),
      Image.configure({ allowBase64: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
    ],
    content: toHtml(value),
    editorProps: {
      attributes: {
        class: "article-content min-h-80 px-4 py-3 outline-none",
      },
      handlePaste(_view, event) {
        const files = imageFiles(event.clipboardData?.files)
        if (files.length === 0) return false
        insertFilesRef.current(files)
        return true
      },
      handleDrop(view, event, _slice, moved) {
        if (moved) return false
        const files = imageFiles(event.dataTransfer?.files)
        if (files.length === 0) return false
        event.preventDefault()
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos
        insertFilesRef.current(files, pos)
        return true
      },
    },
    onUpdate({ editor }) {
      onChange(editor.isEmpty ? "" : editor.getHTML())
    },
  })

  // the form loads an existing article after the editor has mounted
  useEffect(() => {
    if (!editor || editor.isDestroyed) return
    const current = editor.isEmpty ? "" : editor.getHTML()
    if (value !== current) {
      editor.commands.setContent(toHtml(value), { emitUpdate: false })
    }
  }, [editor, value])

  insertFilesRef.current = async (files, pos) => {
    if (!editor) return
    setUploading(true)
    try {
      for (const file of files) {
        const src = await uploadImage(file, folder)
        const chain = editor.chain().focus()
        if (pos !== undefined) chain.insertContentAt(pos, { type: "image", attrs: { src } })
        else chain.setImage({ src })
        chain.run()
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengunggah gambar")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  if (!editor) return null

  return (
    <div
      className={cn(
        "rounded-lg border border-input bg-background transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        invalid && "border-destructive ring-3 ring-destructive/20"
      )}
    >
      <Toolbar
        editor={editor}
        uploading={uploading}
        onPickImage={() => fileInputRef.current?.click()}
      />
      <EditorContent editor={editor} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => insertFilesRef.current(imageFiles(e.target.files))}
      />
    </div>
  )
}

function imageFiles(list: FileList | null | undefined) {
  return Array.from(list ?? []).filter((f) => f.type.startsWith("image/"))
}

function Toolbar({
  editor,
  uploading,
  onPickImage,
}: {
  editor: Editor
  uploading: boolean
  onPickImage: () => void
}) {
  const [linkOpen, setLinkOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")

  // re-render the toolbar only when one of these flags changes
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      paragraph: e.isActive("paragraph"),
      h2: e.isActive("heading", { level: 2 }),
      h3: e.isActive("heading", { level: 3 }),
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      bulletList: e.isActive("bulletList"),
      orderedList: e.isActive("orderedList"),
      blockquote: e.isActive("blockquote"),
      link: e.isActive("link"),
      left: e.isActive({ textAlign: "left" }),
      center: e.isActive({ textAlign: "center" }),
      right: e.isActive({ textAlign: "right" }),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  })

  function openLink() {
    setLinkUrl(editor.getAttributes("link").href ?? "")
    setLinkOpen(true)
  }

  function applyLink() {
    const url = linkUrl.trim()
    const chain = editor.chain().focus().extendMarkRange("link")
    if (url) chain.setLink({ href: url }).run()
    else chain.unsetLink().run()
    setLinkOpen(false)
  }

  const c = () => editor.chain().focus()

  return (
    <div className="sticky top-14 z-10 rounded-t-lg border-b border-input bg-muted/90 backdrop-blur">
      <div className="flex flex-wrap items-center gap-0.5 p-1.5">
        <Tool label="Paragraf" active={state.paragraph} onClick={() => c().setParagraph().run()}>
          <PilcrowIcon />
        </Tool>
        <Tool label="Judul besar" active={state.h2} onClick={() => c().toggleHeading({ level: 2 }).run()}>
          <Heading2Icon />
        </Tool>
        <Tool label="Judul kecil" active={state.h3} onClick={() => c().toggleHeading({ level: 3 }).run()}>
          <Heading3Icon />
        </Tool>
        <Divider />
        <Tool label="Tebal" active={state.bold} onClick={() => c().toggleBold().run()}>
          <BoldIcon />
        </Tool>
        <Tool label="Miring" active={state.italic} onClick={() => c().toggleItalic().run()}>
          <ItalicIcon />
        </Tool>
        <Tool label="Garis bawah" active={state.underline} onClick={() => c().toggleUnderline().run()}>
          <UnderlineIcon />
        </Tool>
        <Tool label="Coret" active={state.strike} onClick={() => c().toggleStrike().run()}>
          <StrikethroughIcon />
        </Tool>
        <Divider />
        <Tool label="Rata kiri" active={state.left} onClick={() => c().setTextAlign("left").run()}>
          <AlignLeftIcon />
        </Tool>
        <Tool label="Rata tengah" active={state.center} onClick={() => c().setTextAlign("center").run()}>
          <AlignCenterIcon />
        </Tool>
        <Tool label="Rata kanan" active={state.right} onClick={() => c().setTextAlign("right").run()}>
          <AlignRightIcon />
        </Tool>
        <Divider />
        <Tool label="Daftar poin" active={state.bulletList} onClick={() => c().toggleBulletList().run()}>
          <ListIcon />
        </Tool>
        <Tool label="Daftar bernomor" active={state.orderedList} onClick={() => c().toggleOrderedList().run()}>
          <ListOrderedIcon />
        </Tool>
        <Tool label="Kutipan" active={state.blockquote} onClick={() => c().toggleBlockquote().run()}>
          <QuoteIcon />
        </Tool>
        <Tool label="Garis pemisah" onClick={() => c().setHorizontalRule().run()}>
          <MinusIcon />
        </Tool>
        <Divider />
        <Tool label="Tautan" active={state.link || linkOpen} onClick={openLink}>
          <LinkIcon />
        </Tool>
        <Tool label="Sisipkan gambar" disabled={uploading} onClick={onPickImage}>
          {uploading ? <Loader2Icon className="animate-spin" /> : <ImageIcon />}
        </Tool>
        <Divider />
        <Tool label="Urungkan" disabled={!state.canUndo} onClick={() => c().undo().run()}>
          <Undo2Icon />
        </Tool>
        <Tool label="Ulangi" disabled={!state.canRedo} onClick={() => c().redo().run()}>
          <Redo2Icon />
        </Tool>
      </div>

      {linkOpen && (
        <div className="flex items-center gap-2 border-t border-input p-1.5">
          <Input
            autoFocus
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              // Enter would submit the whole article form
              if (e.key === "Enter") {
                e.preventDefault()
                applyLink()
              }
              if (e.key === "Escape") setLinkOpen(false)
            }}
            placeholder="https://contoh.com — kosongkan untuk menghapus tautan"
            className="h-8 bg-background"
          />
          <Button type="button" size="sm" onClick={applyLink}>
            Terapkan
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setLinkOpen(false)}>
            Batal
          </Button>
        </div>
      )}
    </div>
  )
}

function Tool({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      // keep the editor selection while clicking the toolbar
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4",
        active && "bg-background text-primary shadow-sm ring-1 ring-foreground/10"
      )}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span aria-hidden className="mx-1 h-5 w-px bg-border" />
}

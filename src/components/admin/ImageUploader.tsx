import { useRef, useState } from "react"
import { ImageIcon, Loader2Icon, UploadIcon, XIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { uploadImage } from "@/services/storage.service"

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  folder: string
}

export function ImageUploader({ value, onChange, folder }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  // dragenter/dragleave also fire when crossing child elements, so count
  // nesting depth instead of toggling on every event
  const dragDepth = useRef(0)

  async function handleFiles(files: FileList | null | undefined) {
    if (!files || files.length === 0) return

    const images = Array.from(files).filter((f) => f.type.startsWith("image/"))
    if (images.length === 0) {
      toast.error("File yang dipilih bukan gambar")
      return
    }
    if (files.length > 1) {
      toast.info("Hanya satu gambar yang bisa diunggah — gambar pertama dipakai")
    }

    setUploading(true)
    try {
      const url = await uploadImage(images[0], folder)
      onChange(url)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengunggah gambar")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault()
    if (uploading) return
    dragDepth.current++
    setDragging(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    dragDepth.current = Math.max(0, dragDepth.current - 1)
    if (dragDepth.current === 0) setDragging(false)
  }

  function handleDragOver(e: React.DragEvent) {
    // required, otherwise the browser opens the dropped file in the tab
    e.preventDefault()
    e.dataTransfer.dropEffect = uploading ? "none" : "copy"
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    dragDepth.current = 0
    setDragging(false)
    if (uploading) return
    handleFiles(e.dataTransfer.files)
  }

  const openPicker = () => inputRef.current?.click()

  return (
    <div className="space-y-2">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative w-full max-w-md"
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Pratinjau"
              className="aspect-video w-full rounded-lg object-cover ring-1 ring-foreground/10"
            />
            {!uploading && (
              <Button
                type="button"
                variant="destructive"
                size="icon-sm"
                className="absolute top-1.5 right-1.5 z-10"
                onClick={() => onChange("")}
              >
                <XIcon />
              </Button>
            )}
          </>
        ) : (
          <button
            type="button"
            disabled={uploading}
            onClick={openPicker}
            className="flex aspect-video w-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border px-4 text-center text-muted-foreground transition-colors hover:bg-muted/50 disabled:pointer-events-none"
          >
            <ImageIcon className="size-8" />
            <span className="text-sm">
              Seret gambar ke sini atau klik untuk memilih
            </span>
          </button>
        )}

        {(dragging || uploading) && (
          <div
            className={cn(
              "pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-lg text-sm font-medium",
              dragging
                ? "border-2 border-dashed border-primary bg-primary/10 text-primary backdrop-blur-[1px]"
                : "bg-background/70 text-muted-foreground"
            )}
          >
            {uploading ? (
              <>
                <Loader2Icon className="size-6 animate-spin" />
                Mengunggah...
              </>
            ) : (
              <>
                <UploadIcon className="size-6" />
                Lepaskan untuk mengunggah
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
        id={`image-upload-${folder}`}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={uploading}
        onClick={openPicker}
      >
        {uploading ? "Mengunggah..." : value ? "Ganti Gambar" : "Unggah Gambar"}
      </Button>
    </div>
  )
}

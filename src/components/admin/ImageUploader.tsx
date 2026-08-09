import { useRef, useState } from "react"
import { ImageIcon, Loader2Icon, XIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { uploadImage } from "@/services/storage.service"

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  folder: string
}

export function ImageUploader({ value, onChange, folder }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadImage(file, folder)
      onChange(url)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengunggah gambar")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative w-fit">
          <img
            src={value}
            alt="Pratinjau"
            className="aspect-video w-64 rounded-lg object-cover ring-1 ring-foreground/10"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            className="absolute top-1.5 right-1.5"
            onClick={() => onChange("")}
          >
            <XIcon />
          </Button>
        </div>
      ) : (
        <div className="flex aspect-video w-64 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
          {uploading ? (
            <Loader2Icon className="size-6 animate-spin" />
          ) : (
            <ImageIcon className="size-6" />
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id={`image-upload-${folder}`}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? "Mengunggah..." : value ? "Ganti Gambar" : "Unggah Gambar"}
      </Button>
    </div>
  )
}

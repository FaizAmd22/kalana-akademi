const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const UPLOAD_TIMEOUT_MS = 30_000

export async function uploadImage(file: File, folder: string): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", UPLOAD_PRESET)
  formData.append("folder", folder)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS)

  let res: Response
  try {
    res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData, signal: controller.signal }
    )
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("Unggah gambar timeout — periksa koneksi internet Anda")
    }
    throw new Error("Gagal terhubung ke Cloudinary — periksa koneksi internet Anda")
  } finally {
    clearTimeout(timeout)
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error?.message ?? "Gagal mengunggah gambar ke Cloudinary")
  }

  const data = await res.json()
  return data.secure_url as string
}

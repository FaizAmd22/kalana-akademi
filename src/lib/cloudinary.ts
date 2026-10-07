const UPLOAD_SEGMENT = "/image/upload/"

/**
 * Smaller, auto-format/quality version of a Cloudinary image, capped at
 * `width` px (never upscaled). Uploads are stored at full resolution, which
 * is often several MB — far more than a thumbnail or lightbox needs.
 * Non-Cloudinary URLs are returned unchanged.
 */
export function optimizeImage(url: string | undefined, width: number) {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes(UPLOAD_SEGMENT)) {
    return url
  }
  return url.replace(
    UPLOAD_SEGMENT,
    `${UPLOAD_SEGMENT}f_auto,q_auto,c_limit,w_${width}/`
  )
}

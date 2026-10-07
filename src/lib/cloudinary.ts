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

/**
 * src/srcSet/sizes for a Cloudinary image so the browser picks the smallest
 * version that is sharp for the actual rendered size and screen density
 * (e.g. a ~170px phone thumbnail no longer downloads the 600px file).
 * Spread onto an <img>: <img {...responsiveImage(url, [300, 600], "50vw")} />
 */
export function responsiveImage(
  url: string | undefined,
  widths: number[],
  sizes: string
) {
  const largest = Math.max(...widths)
  if (!url || optimizeImage(url, largest) === url) {
    return { src: url }
  }
  return {
    src: optimizeImage(url, largest),
    srcSet: widths.map((w) => `${optimizeImage(url, w)} ${w}w`).join(", "),
    sizes,
  }
}

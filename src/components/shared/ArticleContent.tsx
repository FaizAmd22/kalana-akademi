import { useMemo } from "react"
import DOMPurify from "dompurify"

import { responsiveImage } from "@/lib/cloudinary"
import { toHtml } from "@/lib/rich-text"
import { cn } from "@/lib/utils"

const IMAGE_SIZES = "(min-width: 768px) 720px, 100vw"
const TEXT_ALIGN = /text-align:\s*(left|center|right|justify)/i

// Runs on every element DOMPurify keeps, after unsafe markup is removed.
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  // the editor only sets text-align; drop any other inline style
  if (node.hasAttribute("style")) {
    const align = node.getAttribute("style")?.match(TEXT_ALIGN)?.[1]
    if (align) node.setAttribute("style", `text-align: ${align}`)
    else node.removeAttribute("style")
  }

  if (node.tagName === "IMG") {
    const { src, srcSet, sizes } = responsiveImage(
      node.getAttribute("src") ?? undefined,
      [700, 1400],
      IMAGE_SIZES
    )
    if (src) node.setAttribute("src", src)
    if (srcSet && sizes) {
      node.setAttribute("srcset", srcSet)
      node.setAttribute("sizes", sizes)
    }
    node.setAttribute("loading", "lazy")
    node.setAttribute("decoding", "async")
  }

  if (node.tagName === "A") {
    const href = node.getAttribute("href") ?? ""
    if (/^https?:\/\//i.test(href) && !href.startsWith(window.location.origin)) {
      node.setAttribute("target", "_blank")
      node.setAttribute("rel", "noopener noreferrer")
    }
  }
})

/** Sanitized article body from the rich-text editor (or legacy plain text). */
export function ArticleContent({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const html = useMemo(
    () => DOMPurify.sanitize(toHtml(value), { FORBID_TAGS: ["style", "form"] }),
    [value]
  )

  return (
    <div
      className={cn("article-content", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

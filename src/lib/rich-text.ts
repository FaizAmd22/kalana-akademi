/**
 * Article bodies are stored as HTML from the admin rich-text editor.
 * Articles written before the editor existed are plain text with blank
 * lines between paragraphs, so every helper here accepts both.
 */

const HTML_TAG = /<\/?[a-z][\s\S]*>/i

export function isHtml(value: string) {
  return HTML_TAG.test(value)
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/** Plain text (paragraphs split by blank lines) to editor HTML. */
export function plainTextToHtml(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("")
}

/** Always HTML, whichever format the article was saved in. */
export function toHtml(value: string) {
  return isHtml(value) ? value : plainTextToHtml(value)
}

/**
 * Readable text of an article body, for excerpts, search and reading time.
 * DOMParser documents are inert: no scripts run and no images load.
 */
export function toPlainText(value: string) {
  if (!isHtml(value)) return value.trim()
  const doc = new DOMParser().parseFromString(
    // keep words in separate blocks from running together
    value.replace(/<\/(p|h[1-6]|li|blockquote)>|<br\s*\/?>/gi, "$& "),
    "text/html"
  )
  return (doc.body.textContent ?? "").replace(/\s+/g, " ").trim()
}

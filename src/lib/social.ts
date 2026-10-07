/** "@handle" from an Instagram profile URL, e.g. instagram.com/bimbelkalana/. */
export function instagramHandle(url: string) {
  const handle = url.replace(/\/+$/, "").split("/").pop()
  return handle ? `@${handle}` : "Instagram"
}

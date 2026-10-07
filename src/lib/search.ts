/** Lowercase and strip accents so "Matématika" matches "matematika". */
export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
}

/**
 * True when every word of `query` appears somewhere in `text`, in any order
 * ("fisika sma" matches "Bimbel Fisika SMA Kelas 11").
 */
export function matchesQuery(text: string, query: string) {
  const haystack = normalizeText(text)
  return normalizeText(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word))
}

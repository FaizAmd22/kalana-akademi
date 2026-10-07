import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const DEBOUNCE_MS = 300

/**
 * Search box state kept in the `?q=` URL param, so results can be shared and
 * survive back/forward. The input updates instantly; the URL (and therefore
 * the query that triggers fetching) follows after a short pause in typing.
 */
export function useUrlSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = (searchParams.get("q") ?? "").trim()
  const [input, setInput] = useState(query)

  // follow external URL changes (back button, links that clear the search)
  useEffect(() => {
    setInput((current) => (current.trim() === query ? current : query))
  }, [query])

  useEffect(() => {
    const next = input.trim()
    if (next === query) return
    const timeout = setTimeout(() => {
      setSearchParams(
        (params) => {
          const updated = new URLSearchParams(params)
          if (next) updated.set("q", next)
          else updated.delete("q")
          return updated
        },
        { replace: true }
      )
    }, DEBOUNCE_MS)
    return () => clearTimeout(timeout)
  }, [input, query, setSearchParams])

  return { input, setInput, query }
}

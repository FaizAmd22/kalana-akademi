import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Scrolls to the element whose id matches the current URL hash.
 * Runs on mount and whenever the hash changes (e.g. clicking another
 * in-page nav link while already on the page).
 */
export function useScrollToHash() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace("#", "")

    // defer so the target element exists after the page's content renders
    const timeout = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }, 50)

    return () => clearTimeout(timeout)
  }, [hash])
}

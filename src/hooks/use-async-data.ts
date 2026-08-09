import { useEffect, useState } from "react"

interface AsyncState<T> {
  data: T | undefined
  loading: boolean
  error: Error | null
}

/**
 * Runs a one-shot async fetch whenever a dependency changes.
 * Used by public (read-only) hooks — admin lists prefer useLiveCollection for realtime updates.
 */
export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  deps: unknown[]
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: undefined,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((error: Error) => {
        if (!cancelled) setState({ data: undefined, loading: false, error })
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}

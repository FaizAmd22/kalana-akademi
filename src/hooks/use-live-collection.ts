import { useEffect, useState } from "react"
import type { Unsubscribe } from "firebase/firestore"

interface LiveState<T> {
  data: T[]
  loading: boolean
  error: Error | null
}

/**
 * Subscribes to a live Firestore query. Used by admin list pages so tables
 * reflect create/edit/delete immediately without a manual refetch.
 */
export function useLiveCollection<T>(
  subscribe: (
    onChange: (items: T[]) => void,
    onError: (error: Error) => void
  ) => Unsubscribe,
  deps: unknown[]
): LiveState<T> {
  const [state, setState] = useState<LiveState<T>>({
    data: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    setState((s) => ({ ...s, loading: true, error: null }))

    const unsubscribe = subscribe(
      (data) => setState({ data, loading: false, error: null }),
      (error) => setState({ data: [], loading: false, error })
    )

    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}

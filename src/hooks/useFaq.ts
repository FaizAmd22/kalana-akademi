import { useAsyncData } from "@/hooks/use-async-data"
import { useLiveCollection } from "@/hooks/use-live-collection"
import { faqService } from "@/services/faq.service"
import type { Faq } from "@/types"

export function useFaqList() {
  return useAsyncData(() => faqService.listAll(), [])
}

export function useAdminFaqList() {
  return useLiveCollection<Faq>((onChange, onError) => {
    // faqService.listAll() sorts client-side, so admin uses raw subscribe + resort
    return faqService.subscribe((items) => {
      onChange([...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))
    }, onError)
  }, [])
}

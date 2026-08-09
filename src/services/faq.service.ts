import { createCrudService } from "@/lib/firestore-crud"
import type { Faq, FaqInput } from "@/types"

const crud = createCrudService<Faq, FaqInput>("faqs", { stampTimestamps: false })

export const faqService = {
  ...crud,
  // sorted client-side: Firestore orderBy would exclude docs missing "order"
  listAll: async () => {
    const items = await crud.list()
    return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  },
}

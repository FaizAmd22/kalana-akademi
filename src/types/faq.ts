export interface Faq {
  id: string
  question: string
  answer: string
  order?: number
}

export type FaqInput = Omit<Faq, "id">

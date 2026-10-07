import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Faq } from "@/types"

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion multiple className="gap-3">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          className="rounded-xl border-none bg-card px-4 ring-1 ring-foreground/10 transition-shadow not-last:border-b-0 data-open:shadow-md data-open:ring-primary/25"
        >
          <AccordionTrigger className="items-center gap-3 py-4 text-base hover:no-underline">
            <span className="flex items-center gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent text-xs font-bold text-primary">
                {i + 1}
              </span>
              {faq.question}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pl-10 leading-relaxed text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

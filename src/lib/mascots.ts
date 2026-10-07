import flag from "@/assets/images/mascot/mascot-flag.webp"
import graduate from "@/assets/images/mascot/mascot-graduate.webp"
import painter from "@/assets/images/mascot/mascot-painter.webp"
import question from "@/assets/images/mascot/mascot-question.webp"
import siapGabung from "@/assets/images/mascot/mascot-siap-gabung.webp"
import teaching from "@/assets/images/mascot/mascot-teaching.webp"
import telescope from "@/assets/images/mascot/mascot-telescope.webp"
import testimoni from "@/assets/images/mascot/mascot-testimoni.webp"
import trophy from "@/assets/images/mascot/mascot-trophy.webp"

// "Prof Kala" mascot illustrations (720px webp).
export const MASCOT = {
  flag,
  graduate,
  painter,
  question,
  siapGabung,
  teaching,
  telescope,
  testimoni,
  trophy,
}

/** Banner illustration for each Tentang Kami page, keyed by slug. */
export const TENTANG_KAMI_MASCOT: Record<string, string> = {
  profil: graduate,
  "visi-misi": telescope,
  tentor: teaching,
  testimoni,
  faq: question,
  galeri: painter,
  "event-kalana": trophy,
}

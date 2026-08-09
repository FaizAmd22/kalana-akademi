import { doc, getDoc, setDoc } from "firebase/firestore"

import { db } from "@/lib/firebase"
import {
  DEFAULT_EMAIL,
  DEFAULT_GOOGLE_FORM_URL,
  DEFAULT_INSTAGRAM_URL,
  DEFAULT_WA_MESSAGE,
  DEFAULT_WHATSAPP_NUMBER,
} from "@/lib/constants"
import type { Settings, SettingsInput } from "@/types"

const SETTINGS_DOC_ID = "general"
const settingsRef = doc(db, "settings", SETTINGS_DOC_ID)

const defaults: Settings = {
  id: SETTINGS_DOC_ID,
  googleFormUrl: DEFAULT_GOOGLE_FORM_URL,
  whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
  defaultWaMessage: DEFAULT_WA_MESSAGE,
  email: DEFAULT_EMAIL,
  instagramUrl: DEFAULT_INSTAGRAM_URL,
}

export const settingsService = {
  async get(): Promise<Settings> {
    const snap = await getDoc(settingsRef)
    return snap.exists()
      ? ({ ...defaults, ...snap.data(), id: SETTINGS_DOC_ID } as Settings)
      : defaults
  },

  async update(data: Partial<SettingsInput>): Promise<void> {
    await setDoc(settingsRef, data, { merge: true })
  },
}

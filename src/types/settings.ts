export interface Settings {
  id: "general"
  googleFormUrl: string
  whatsappNumber: string
  defaultWaMessage: string
  email: string
  instagramUrl: string
}

export type SettingsInput = Omit<Settings, "id">

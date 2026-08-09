import { useAsyncData } from "@/hooks/use-async-data"
import { settingsService } from "@/services/settings.service"

export function useSettings() {
  return useAsyncData(() => settingsService.get(), [])
}

declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void
  }
}

export function fbqTrack(event: string, params?: Record<string, unknown>) {
  window.fbq?.("track", event, params)
}

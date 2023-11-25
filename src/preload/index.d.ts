import { ElectronAPI } from '@electron-toolkit/preload'

type api = {
  loadFrame: (frame: number) => void
  zeroScale: () => void
  handleOutput: (callback: (data: ArduinoData) => void) => void
  clearHandlers: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: api
  }
}

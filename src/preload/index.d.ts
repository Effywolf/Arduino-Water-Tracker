import { ElectronAPI } from '@electron-toolkit/preload'

type api = {
  write(data: any): void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: api
  }
}

import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ArduinoData } from '../types'

// Custom APIs for renderer
let handlers: { output?: (data: ArduinoData) => void } = {}

ipcRenderer.on('output', (_, data) => handlers.output?.(data))

const api = {
  zeroScale: () => ipcRenderer.send('zero-scale'),
  loadFrame: (frame: number) => ipcRenderer.send('load-frame', frame),
  handleOutput: (callback: (data: ArduinoData) => void) => (handlers.output = callback),
  clearHandlers: () => (handlers = {})
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { SerialPort } from 'serialport'
import { ReadlineParser } from 'serialport'

const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 115200 })

// Open errors will be emitted as an error event
port.on('error', function (err) {
  console.log('Error: ', err)
})

const lineStream = port.pipe(new ReadlineParser())

lineStream.on('data', (line) => {
  console.log(`[Arduino] ${line}`)
})

// Custom APIs for renderer
const api = {
  write(data: any) {
    port.write(data, function (err) {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log('message written')
    })
  }
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

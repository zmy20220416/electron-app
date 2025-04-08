const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  devMode: () => process.env.NODE_ENV === 'development',
  ping: () => ipcRenderer.invoke('ping')
})

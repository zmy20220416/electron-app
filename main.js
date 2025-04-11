const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('node:path')

const handleSetTitle = (event, title) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
};

const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (canceled) {
    return null
  } else {
    return filePaths[0]
  }
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.on('set-title', handleSetTitle);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

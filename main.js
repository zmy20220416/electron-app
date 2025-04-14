const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron/main')
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

const handleCounterValue = (_event, value) => {
  console.log('value:', value);
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([{
    label: app.name,
    submenu: [
      {
        label: 'Increment',
        click: () => mainWindow.webContents.send('update-counter', 1)
      },
      {
        label: 'Decrement',
        click: () => mainWindow.webContents.send('update-counter', -1)
      }
    ]
  }])

  Menu.setApplicationMenu(menu)
  mainWindow.loadFile('index.html')

  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.on('set-title', handleSetTitle);
  ipcMain.on('counter-value', handleCounterValue)

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

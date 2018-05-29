const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const fs = require('fs');

const path = require('path');

let mainWindow = null;

app.on('ready', () => {
  console.log('The application is ready.')

  mainWindow = new BrowserWindow({
    title: 'The Holy Grail',
    //alwaysOnTop: true,
    //frame: false,
    width: 1200, 
    height: 600, 
    x: 0, 
    y: 0
  });
 
  // open chome developer tools
  //mainWindow.webContents.openDevTools()

  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'))

  // This event fires once the browser window's DOM is loaded
  mainWindow.webContents.on('did-finish-load', () => {
    //openFile()
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
  })
})

function openFile () {
  const files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown', 'txt'] }
    ]
  })

  if (!files) return

  const file = files[0]
  const content = fs.readFileSync(file).toString()

  mainWindow.webContents.send('sandwich', file, content)
}

function saveFile (content) {
  const fileName = dialog.showSaveDialog(mainWindow, {
    title: 'Save HTML Output',
    defaultPath: app.getPath('documents'),
    filters: [
      { name: 'HTML Files', extensions: ['html'] }
    ]
  })

  if (!fileName) return

  fs.writeFileSync(fileName, content)
}

exports.openFile = openFile
exports.saveFile = saveFile

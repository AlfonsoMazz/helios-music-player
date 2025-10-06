// main.js (Archivo principal de Electron)

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

try {
  require('electron-reloader')(module);
} catch (_) {}

let mainWindow;
let miniPlayerWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname, 'src/assets/icon2.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.setMenu(null);
  mainWindow.loadFile('src/index.html');
}

function createMiniPlayerWindow() {
  miniPlayerWindow = new BrowserWindow({
    width: 320,
    height: 320,
    frame: false,
    alwaysOnTop: true,
    show: false,
    icon: path.join(__dirname, 'src/assets/icon2.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  miniPlayerWindow.loadFile('src/miniplayer.html');
}

// ---- CANALES DE COMUNICACIÓN (IPC) ----

ipcMain.on('toggle-miniplayer', () => {
  if (miniPlayerWindow && !miniPlayerWindow.isDestroyed()) {
    if (miniPlayerWindow.isVisible()) {
      miniPlayerWindow.hide();
    } else {
      const [mainX, mainY] = mainWindow.getPosition();
      const [mainWidth, mainHeight] = mainWindow.getSize();
      miniPlayerWindow.setPosition(mainX + mainWidth - 400, mainY + mainHeight - 400);
      miniPlayerWindow.show();
    }
  }
});

ipcMain.on('sync-state-to-main', (event, state) => {
  // Se comprueba que la ventana del MiniPlayer exista Y no esté destruida
  if (miniPlayerWindow && !miniPlayerWindow.isDestroyed()) { // <-- AÑADIR ESTA COMPROBACIÓN
    miniPlayerWindow.webContents.send('state-updated', state);
  }
});

ipcMain.on('miniplayer-control-action', (event, action) => {
  // Se comprueba que la ventana Principal exista Y no esté destruida
  if (mainWindow && !mainWindow.isDestroyed()) { // <-- AÑADIR ESTA COMPROBACIÓN
    mainWindow.webContents.send('execute-control-action', action);
  }
});

// -----------------------------------------

app.whenReady().then(() => {
  createMainWindow();
  createMiniPlayerWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// main.js

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
    minWidth: 940,
    minHeight: 600,
    icon: path.join(__dirname, 'src/assets/icon2.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    show: true
  });
  mainWindow.setMenu(null);
  mainWindow.loadFile('src/index.html');

  mainWindow.on('closed', () => {
    app.quit();
  });
}

function createMiniPlayerWindow() {
  if (miniPlayerWindow) {
    return;
  }

  miniPlayerWindow = new BrowserWindow({
    width: 320,
    height: 320,
    minWidth: 280,
    minHeight: 64, // [CAMBIO] Se establece el mínimo global para permitir la contracción vertical.
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    show: false,
    resizable: true,
    icon: path.join(__dirname, 'src/assets/icon2.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  miniPlayerWindow.loadFile('src/miniplayer.html');

  miniPlayerWindow.on('closed', () => {
    miniPlayerWindow = null;
  });
}

// ---- CANALES DE COMUNICACIÓN (IPC) ----

ipcMain.on('toggle-miniplayer', () => {
  const performToggle = () => {
    if (!miniPlayerWindow || miniPlayerWindow.isDestroyed()) {
      return;
    }

    if (miniPlayerWindow.isVisible()) {
      miniPlayerWindow.hide();
    } else {
      if (mainWindow) {
        mainWindow.webContents.send('force-state-sync'); 
      }
      miniPlayerWindow.show();
    }
  };

  if (!miniPlayerWindow) {
    createMiniPlayerWindow();
    miniPlayerWindow.once('ready-to-show', performToggle);
  } else {
    performToggle();
  }
});

ipcMain.on('set-minimum-size', (event, { width, height }) => {
  if (miniPlayerWindow && !miniPlayerWindow.isDestroyed()) {
    miniPlayerWindow.setMinimumSize(width, height);
  }
});

ipcMain.on('sync-state', (event, state) => {
  if (miniPlayerWindow && !miniPlayerWindow.isDestroyed()) {
    miniPlayerWindow.webContents.send('state-updated', state);
  }
});

ipcMain.on('control-action', (event, action) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('execute-action', action);
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
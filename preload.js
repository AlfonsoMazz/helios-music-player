// preload.js

const { contextBridge, ipcRenderer } = require('electron');

// Exponemos un objeto 'electronAPI' al mundo de la ventana (renderer process)
// de forma segura y controlada.
contextBridge.exposeInMainWorld('electronAPI', {
  // --- Funciones que las ventanas pueden INVOCAR (Renderer -> Main) ---

  /**
   * Le pide al proceso principal que muestre u oculte la ventana del mini-player.
   */
  toggleMiniPlayer: () => ipcRenderer.send('toggle-miniplayer'),
  
  /**
   * [NUEVO] Le pide al proceso principal que establezca el tamaño mínimo de la ventana.
   * @param {object} size - Un objeto con { width, height }.
   */
  setMinimumSize: (size) => ipcRenderer.send('set-minimum-size', size),

  /**
   * Envía el estado actualizado del reproductor (canción, tiempo, etc.) desde la
   * ventana principal hacia el proceso principal para que este lo retransmita.
   * @param {object} state - El objeto con el estado actual de la reproducción.
   */
  syncState: (state) => ipcRenderer.send('sync-state', state),

  /**
   * Envía una acción de control (play, pause, next, etc.) desde el mini-player
   * hacia el proceso principal para que la ejecute en la ventana principal.
   * @param {string|object} action - La acción a ejecutar.
   */
  sendControlAction: (action) => ipcRenderer.send('control-action', action),

  // --- Funciones para que las ventanas ESCUCHEN (Main -> Renderer) ---

  /**
   * Permite que la ventana del mini-player se suscriba a las actualizaciones de estado.
   * @param {function} callback - La función que se ejecutará cada vez que llegue un nuevo estado.
   */
  onStateUpdate: (callback) => ipcRenderer.on('state-updated', (_event, state) => callback(state)),

  /**
   * Permite que la ventana principal se suscriba a los comandos enviados desde el mini-player.
   * @param {function} callback - La función que se ejecutará para procesar el comando.
   */
  onExecuteAction: (callback) => ipcRenderer.on('execute-action', (_event, action) => callback(action)),

  /**
   * Permite que la ventana principal escuche la orden de forzar una sincronización.
   * @param {function} callback - La función que se ejecutará cuando se reciba la orden.
   */
  onForceStateSync: (callback) => ipcRenderer.on('force-state-sync', () => callback()),
});
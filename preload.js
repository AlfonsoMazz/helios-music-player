// preload.js

const { contextBridge, ipcRenderer } = require('electron');

// Exponemos de forma segura las funciones a nuestro código de la ventana
contextBridge.exposeInMainWorld('electronAPI', {
  // Función para ENVIAR mensajes al proceso principal de Electron
  sendMessage: (channel, data) => ipcRenderer.send(channel, data),
  
  // NUEVO: Función para RECIBIR mensajes desde el proceso principal de Electron
  on: (channel, callback) => {
    // Creamos un listener seguro que invoca el callback que nos pasen desde la ventana
    ipcRenderer.on(channel, (event, ...args) => callback(...args));
  }
});
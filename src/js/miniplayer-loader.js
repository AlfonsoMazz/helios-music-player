// src/js/miniplayer-loader.js

import { initMiniPlayer } from './views/miniPlayer.js';

// Creamos un objeto de estado local solo para esta ventana.
// Se llenará con los datos que recibamos de la app principal.
const miniPlayerState = {
    track: null,
    isPlaying: false,
    currentTime: 0,
    volume: 0.3,
    isMuted: false,
    isShuffled: false,
    repeatState: 0
};

// Inicializamos la interfaz del MiniPlayer, pasándole nuestro estado local.
// Esto nos devuelve un objeto con métodos para controlar la UI, como 'update'.
const miniPlayerControls = initMiniPlayer(miniPlayerState);

// Nos ponemos a escuchar los mensajes del proceso principal.
if (window.electronAPI) {
    // CAMBIO: Usamos la función específica 'onStateUpdate' en lugar de la genérica 'on'.
    // Esto hace que el código sea más seguro y claro.
    window.electronAPI.onStateUpdate((newState) => {
        // Cuando llega un nuevo estado, actualizamos nuestro estado local.
        Object.assign(miniPlayerState, newState);
        
        // Y le decimos al MiniPlayer que se redibuje con la nueva información.
        if (miniPlayerControls && miniPlayerControls.update) {
            miniPlayerControls.update();
        }
    });
}
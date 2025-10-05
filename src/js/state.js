// src/js/state.js

import { loadSettings } from './settings.js';

/**
 * Define la estructura inicial del estado de la aplicación.
 * Combina los ajustes guardados del usuario con los valores predeterminados.
 */
export const appState = {
    // Carga las configuraciones persistentes (volumen, shuffle, etc.)
    ...loadSettings(),
    
    // El estado de la biblioteca de música cargada
    library: {},
    
    // Un indicador para saber si se está escaneando una nueva biblioteca.
    isScanning: false,

    /**
     * CONTEXTO DE REPRODUCCIÓN: La fuente de verdad sobre lo que está sonando.
     */
    playingContext: {}, // Lo inicializamos como objeto vacío

    /**
     * CONTEXTO DE VISUALIZACIÓN: La fuente de verdad sobre lo que se está viendo.
     */
    viewingContext: null, // Lo inicializamos como null para claridad

    // Lista de reproducción aleatoria (solo se usa cuando isShuffled es true)
    shuffledPlaylist: [],
    
    // Cola de reproducción manual
    playQueue: [],
    
    // Estado del reproductor
    isPlaying: false,
    currentTime: 0, 

    // Referencias a los controles de los módulos para comunicación entre ellos
    playerControls: null,
    queueControls: null,
    sidebarControls: null,
    mainViewControls: null,
    settingsControls: null
};
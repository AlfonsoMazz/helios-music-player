// src/js/settings.js
const SETTINGS_KEY = 'AlfonsoMusicPlayerSettings';

export function loadSettings() {
    try {
        const savedSettings = localStorage.getItem(SETTINGS_KEY);
        if (savedSettings) {
            console.log("Ajustes encontrados, cargando...");
            const defaults = { 
                volume: 0.3, 
                eq: Array(10).fill(0),
                repeatState: 0,
                isShuffled: false,
                playlistSortOrders: {},
                lastSession: null,
                expandedFolderPaths: [],
                sidebarScrollTop: 0, // <-- NUEVO: Valor predeterminado
            };
            return { ...defaults, ...JSON.parse(savedSettings) };
        }
    } catch (e) {
        console.error("No se pudieron cargar los ajustes, usando predeterminados.", e);
    }
    
    console.log("No se encontraron ajustes, usando valores predeterminados.");
    return {
        volume: 0.3,
        eq: Array(10).fill(0),
        repeatState: 0,
        isShuffled: false,
        playlistSortOrders: {},
        lastSession: null,
        expandedFolderPaths: [],
        sidebarScrollTop: 0, // <-- NUEVO: Valor predeterminado
    };
}

export function saveSettings(appState) {
    try {
        const settingsToSave = {
            volume: appState.volume,
            eq: appState.eq,
            repeatState: appState.repeatState,
            isShuffled: appState.isShuffled,
            playlistSortOrders: appState.playlistSortOrders,
            lastSession: appState.playingContext && appState.playingContext.path ? {
                path: appState.playingContext.path,
                trackIndex: appState.playingContext.trackIndex,
                currentTime: appState.currentTime
            } : null,
            expandedFolderPaths: appState.expandedFolderPaths,
            sidebarScrollTop: appState.sidebarScrollTop, // <-- NUEVO: Guardado de estado
        };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsToSave));
    } catch (e) {
        console.error("Error al guardar los ajustes.", e);
    }
}
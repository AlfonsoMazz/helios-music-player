// src/main.js
import { initPlayer } from './js/player.js';
import { initLibrary, loadLibrary } from './js/library.js';
import { initQueue } from './js/queue.js';
import { saveSettings } from './js/settings.js';
import { initSidebar } from './js/sidebar.js';
import { initMainView } from './js/mainView.js';
import { appState } from './js/state.js';

async function loadComponent(componentUrl, elementId) {
    try {
        const response = await fetch(componentUrl);
        if (!response.ok) throw new Error(`Error al cargar: ${response.statusText}`);
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) element.innerHTML = html;
    } catch (error) {
        console.error(`Falló la carga de ${componentUrl}:`, error);
    }
}

function findNodeByPath(path, libraryNode) {
    let currentNode = { _items: libraryNode };
    for (const part of path) {
        if (currentNode && currentNode._items && currentNode._items[part]) {
            currentNode = currentNode._items[part];
        } else {
            return null;
        }
    }
    return currentNode;
}

async function initializeApp() {
    await Promise.all([
        loadComponent('./components/sidebar.txt', 'sidebar-container'),
        loadComponent('./components/mainView.txt', 'main-content-container'),
        loadComponent('./components/player.txt', 'player-container')
    ]);
    
    const audioPlayer = document.getElementById('audio-player');
    
    appState.settingsControls = { save: saveSettings };

    initLibrary(appState);
    appState.mainViewControls = initMainView(appState); 
    appState.sidebarControls = initSidebar(appState, appState.mainViewControls);
    appState.queueControls = initQueue(appState);
    
    appState.playerControls = initPlayer(
        audioPlayer, 
        appState, 
        appState.sidebarControls.updateNowPlayingInfo,
        appState.mainViewControls.highlightPlayingTrack
    );

    await loadLibrary(appState);

    // --- LÓGICA DE INICIO Y RESTAURACIÓN DE SESIÓN (REFACTORIZADA) ---
    if (appState.lastSession) {
        const { path, trackIndex, currentTime } = appState.lastSession;
        const node = findNodeByPath(path, appState.library);
        
        if (node && node._tracks && node._tracks[trackIndex]) {
            const playlistName = path[path.length - 1];
            const trackToRestore = node._tracks[trackIndex];
            
            appState.playingContext = {
                node: node,
                name: playlistName,
                path: path,
                trackIndex: trackIndex,
                tracks: [...node._tracks],
                originalTracks: [...node._tracks]
            };
            appState.currentTime = currentTime;

            audioPlayer.src = URL.createObjectURL(trackToRestore.file);
            audioPlayer.load();
            audioPlayer.currentTime = currentTime;
            
            appState.sidebarControls.updateNowPlayingInfo(trackToRestore);
            
            appState.mainViewControls.renderPlaylistView(node, playlistName, path, null, trackToRestore.id);

            const targetSidebarItem = document.querySelector(`.sidebar-item[data-path='${JSON.stringify(path)}']`);
            if (targetSidebarItem) targetSidebarItem.classList.add('sidebar-item-active');

        }
    } else if (appState.library && Object.keys(appState.library).length > 0) {
        appState.mainViewControls.renderHomeView();
    }

    console.log('¡Aplicación completamente inicializada y refactorizada!');
}

document.addEventListener('DOMContentLoaded', initializeApp);
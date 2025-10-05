// src/main.js
import { initPlayer } from './js/player.js';
import { initLibrary, loadLibrary, handleFileSelection } from './js/library.js';
import { initQueue } from './js/queue.js';
import { saveSettings } from './js/settings.js';
import { initSidebar } from './js/sidebar.js';
import { initMainView } from './js/mainView.js';
import { initMiniPlayer } from './js/views/miniPlayer.js'; 
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
    const loader = document.getElementById('app-loader');
    const appContainer = document.getElementById('app-container');

    await Promise.all([
        loadComponent('./components/sidebar.txt', 'sidebar-container'),
        loadComponent('./components/mainView.txt', 'main-content-container'),
        loadComponent('./components/player.txt', 'player-container'),
        loadComponent('./components/miniPlayer.txt', 'mini-player-container') 
    ]);

    if (loader) loader.classList.add('hidden');
    if (appContainer) {
        appContainer.classList.remove('hidden');
        appContainer.classList.add('flex');
    }
    
    const audioPlayer = document.getElementById('audio-player');
    
    appState.settingsControls = { save: saveSettings };

    initLibrary(appState);
    appState.mainViewControls = initMainView(appState); 
    appState.sidebarControls = initSidebar(appState, appState.mainViewControls);
    appState.miniPlayerControls = initMiniPlayer(appState);

    appState.playerControls = initPlayer(
        audioPlayer, 
        appState, 
        appState.sidebarControls.updateNowPlayingInfo,
        appState.mainViewControls.highlightPlayingTrack
    );
    appState.queueControls = initQueue(appState);


    const fileInput = document.getElementById('file-input');
    if (fileInput && appState.sidebarControls.renderOrUpdateNode) {
        fileInput.addEventListener('change', async (event) => {
            appState.isScanning = true;
            appState.sidebarControls.renderSidebar();

            await handleFileSelection(event, appState, appState.sidebarControls.renderOrUpdateNode);
            
            appState.isScanning = false;
            appState.sidebarControls.renderSidebar();
        });
    }

    await loadLibrary(appState);

    if (appState.lastSession) {
        const { path, trackIndex, currentTime } = appState.lastSession;
        const node = findNodeByPath(path, appState.library);
        
        if (node && node._tracks && node._tracks[trackIndex]) {
            const playlistName = path[path.length - 1];
            const trackToRestore = node._tracks[trackIndex];
            
            const playlistPath = JSON.stringify(path);
            const sortBy = appState.playlistSortOrders[playlistPath] || 'default';
            let sortedTracks = [...node._tracks];
            switch (sortBy) {
                case 'alpha-asc': sortedTracks.sort((a, b) => a.title.localeCompare(b.title)); break;
                case 'alpha-desc': sortedTracks.sort((a, b) => b.title.localeCompare(a.title)); break;
                case 'date-desc': sortedTracks.sort((a, b) => b.dateAdded - a.dateAdded); break;
                case 'date-asc': sortedTracks.sort((a, b) => a.dateAdded - b.dateAdded); break;
                default: break;
            }

            if (appState.isShuffled) {
                appState.shuffledPlaylist = [...sortedTracks].sort(() => Math.random() - 0.5);
            }
            
            appState.playingContext = {
                node: node,
                name: playlistName,
                path: path,
                trackIndex: trackIndex,
                tracks: sortedTracks,
                originalTracks: [...node._tracks]
            };
            appState.currentTime = currentTime;

            audioPlayer.src = URL.createObjectURL(trackToRestore.file);
            audioPlayer.load();
            audioPlayer.currentTime = currentTime;
            
            appState.sidebarControls.updateNowPlayingInfo(trackToRestore);
            
            setTimeout(() => {
                appState.mainViewControls.renderPlaylistView(node, playlistName, path, trackToRestore.id);

                const targetSidebarItem = document.querySelector(`.sidebar-item[data-path='${JSON.stringify(path)}']`);
                if (targetSidebarItem) targetSidebarItem.classList.add('sidebar-item-active');
            }, 0);

            if (appState.playerControls) {
                appState.playerControls.updateNextInQueueCard();
            }

            // --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
            // Le decimos al mini-reproductor que se actualice con el estado restaurado.
            appState.miniPlayerControls?.update();
        }
    } else if (appState.library && Object.keys(appState.library).length > 0) {
        appState.mainViewControls.renderHomeView();
    }

    console.log('¡Aplicación completamente inicializada y refactorizada!');
}

document.addEventListener('DOMContentLoaded', initializeApp);
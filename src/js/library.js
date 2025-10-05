// src/js/library.js
import { saveLibraryToCache, loadLibraryFromCache } from './cache.js';

const loadingSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="7.33" height="7.33" x="1" y="1" fill="currentColor"><animate id="svgSpinnersBlocksWave0" attributeName="x" begin="0;svgSpinnersBlocksWave1.end+0.2s" dur="0.6s" values="1;4;1"/><animate attributeName="y" begin="0;svgSpinnersBlocksWave1.end+0.2s" dur="0.6s" values="1;4;1"/><animate attributeName="width" begin="0;svgSpinnersBlocksWave1.end+0.2s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="0;svgSpinnersBlocksWave1.end+0.2s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="8.33" y="1" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="8.33;11.33;8.33"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="1;4;1"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="1" y="8.33" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="1;4;1"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="8.33;11.33;8.33"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="15.66" y="1" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="15.66;18.66;15.66"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="1;4;1"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="8.33" y="8.33" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="8.33;11.33;8.33"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="8.33;11.33;8.33"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="1" y="15.66" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="1;4;1"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="15.66;18.66;15.66"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="15.66" y="8.33" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="15.66;18.66;15.66"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="8.33;11.33;8.33"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="8.33" y="15.66" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="8.33;11.33;8.33"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="15.66;18.66;15.66"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="15.66" y="15.66" fill="currentColor"><animate id="svgSpinnersBlocksWave1" attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.4s" dur="0.6s" values="15.66;18.66;15.66"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.4s" dur="0.6s" values="15.66;18.66;15.66"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.4s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.4s" dur="0.6s" values="7.33;1.33;7.33"/></rect></svg>`;

function getAudioDuration(file) {
    return new Promise((resolve) => {
        const audio = document.createElement('audio');
        audio.preload = 'metadata';
        audio.onloadedmetadata = function() {
            window.URL.revokeObjectURL(audio.src);
            resolve({ duration: audio.duration, error: false });
        };
        audio.onerror = () => {
            window.URL.revokeObjectURL(audio.src);
            resolve({ duration: 0, error: true });
        };
        audio.src = URL.createObjectURL(file);
    });
}

async function parseTrackMetadata(file) {
    const { duration, error: durationError } = await getAudioDuration(file);
    const dateAdded = file.lastModified;

    return new Promise((resolve) => {
        window.jsmediatags.read(file, {
            onSuccess: (tag) => {
                const tags = tag.tags;
                let coverUrl = 'https://placehold.co/64x64/121212/808080?text=...';
                if (tags.picture) {
                    const { data, format } = tags.picture;
                    let base64String = "";
                    for (let i = 0; i < data.length; i++) { base64String += String.fromCharCode(data[i]); }
                    coverUrl = `data:${format};base64,${window.btoa(base64String)}`;
                }
                resolve({ 
                    file, 
                    title: tags.title || file.name.replace(/\.[^/.]+$/, ""), 
                    artist: tags.artist || 'Artista Desconocido', 
                    album: tags.album || 'Álbum Desconocido', 
                    cover: coverUrl, 
                    duration: duration,
                    dateAdded: dateAdded,
                    id: `track-${Date.now()}-${Math.random()}`,
                    hasError: durationError
                });
            },
            onError: () => resolve({ 
                file, 
                title: file.name.replace(/\.[^/.]+$/, ""), 
                artist: 'Artista Desconocido', 
                album: 'Álbum Desconocido', 
                cover: 'https://placehold.co/64x64/121212/808080?text=...', 
                duration: duration,
                dateAdded: dateAdded,
                id: `track-${Date.now()}-${Math.random()}`,
                hasError: true
            })
        });
    });
}

async function processAndStoreLibrary(files, appState, onNodeReadyCallback) {
    const playlistContainer = document.getElementById('playlist-container');
    if (playlistContainer) {
        playlistContainer.innerHTML = `<div class="loading-container">${loadingSVG}<p id="loading-status-text">Analizando archivos...</p></div>`;
    }
    const loadingStatusText = document.getElementById('loading-status-text');
    
    const libraryTree = {};
    let processedCount = 0;
    const totalFiles = files.length;

    for (const file of files) {
        const pathParts = file.webkitRelativePath.split('/');
        const folders = pathParts.slice(0, -1);
        let parentNode = { _items: libraryTree };
        for (const folderName of folders) {
            if (!parentNode._items[folderName]) {
                parentNode._items[folderName] = { _type: 'folder', _items: {}, _tracks: [] };
            }
            parentNode = parentNode._items[folderName];
        }
        const trackData = await parseTrackMetadata(file);
        if (trackData) {
            parentNode._tracks.push(trackData);
        }
        processedCount++;
        if (loadingStatusText) {
            loadingStatusText.textContent = `Procesando ${processedCount} de ${totalFiles} canciones...`;
        }
    }
    
    appState.library = libraryTree;
    if(playlistContainer) playlistContainer.innerHTML = '';

    function traverseAndNotify(node, currentPath) {
        const sortedKeys = Object.keys(node._items).sort((a, b) => a.localeCompare(b));
        for (const key of sortedKeys) {
            const childNode = node._items[key];
            const newPath = [...currentPath, key];
            
            if (onNodeReadyCallback) {
                onNodeReadyCallback(newPath, childNode);
            }
            
            if (Object.keys(childNode._items).length > 0) {
                traverseAndNotify(childNode, newPath);
            }
        }
    }

    traverseAndNotify({ _items: appState.library }, []);
    
    await saveLibraryToCache(libraryTree);
    
    console.log("Procesamiento de biblioteca finalizado y guardado en caché.");
}

export async function handleFileSelection(event, appState, onNodeReadyCallback) {
    const files = Array.from(event.target.files).filter(file => /\.(mp3|wav|ogg|flac|m4a)$/i.test(file.name));
    if (files.length === 0) return;
    
    appState.library = {};
    if (appState.sidebarControls) {
        appState.sidebarControls.renderSidebar();
    }
    
    await processAndStoreLibrary(files, appState, onNodeReadyCallback);
}

export async function loadLibrary(appState) {
    // AÑADIMOS LOGS PARA DIAGNÓSTICO
    console.log("Intentando cargar la biblioteca desde la caché...");
    const cachedLibrary = await loadLibraryFromCache();
    if (cachedLibrary && Object.keys(cachedLibrary).length > 0) {
        console.log("%c¡Éxito! Biblioteca encontrada y cargada desde la caché.", "color: lightgreen; font-weight: bold;", cachedLibrary);
        appState.library = cachedLibrary;
        if (appState.sidebarControls && appState.sidebarControls.renderSidebar) {
            appState.sidebarControls.renderSidebar();
        }
    } else {
        console.log("No se encontró ninguna biblioteca en la caché. Esperando selección del usuario.");
    }
}

export function initLibrary(appState) {
    console.log('Módulo de la biblioteca inicializado.');
}
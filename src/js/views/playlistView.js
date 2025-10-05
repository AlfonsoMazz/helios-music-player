// src/js/views/playlistView.js

let renderCancelled = false;

/**
 * Crea el elemento DOM para una sola canción.
 */
function createTrackElement(track, index, appState) {
    const trackElement = document.createElement('div');
    const hasError = track.hasError;

    trackElement.className = `grid grid-cols-[auto_4fr_3fr_auto] gap-4 items-center p-2 rounded-md group track-item ${hasError ? 'opacity-50' : 'hover:bg-white/10'}`;
    trackElement.dataset.trackId = track.id;

    const playingIconHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)">
                <animateTransform id="svgSpinnersPulseRings30" attributeName="transform" begin="0;svgSpinnersPulseRings32.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/>
                <animateTransform additive="sum" attributeName="transform" begin="0;svgSpinnersPulseRings32.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/>
                <animate attributeName="opacity" begin="0;svgSpinnersPulseRings32.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/>
            </path>
            <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)">
                <animateTransform id="svgSpinnersPulseRings31" attributeName="transform" begin="svgSpinnersPulseRings30.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/>
                <animateTransform additive="sum" attributeName="transform" begin="svgSpinnersPulseRings30.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/>
                <animate attributeName="opacity" begin="svgSpinnersPulseRings30.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/>
            </path>
            <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)">
                <animateTransform id="svgSpinnersPulseRings32" attributeName="transform" begin="svgSpinnersPulseRings30.begin+0.8s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/>
                <animateTransform additive="sum" attributeName="transform" begin="svgSpinnersPulseRings30.begin+0.8s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/>
                <animate attributeName="opacity" begin="svgSpinnersPulseRings30.begin+0.8s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/>
            </path>
        </svg>`;

    const playIconContainerClass = hasError ? 'pointer-events-none' : 'cursor-pointer';

    trackElement.innerHTML = `
        <div class="text-center text-gray-400 w-8 flex items-center justify-center">
            <span class="track-number group-hover:hidden">${index + 1}</span>
            <div class="playing-icon hidden">${playingIconHTML}</div>
            <div class="hidden group-hover:block ${playIconContainerClass} play-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-white"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/></svg>
            </div>
        </div>
        <div class="flex items-center space-x-4 min-w-0">
            <img src="${track.cover}" class="w-10 h-10 rounded flex-shrink-0">
            <div class="truncate">
                <p class="text-white font-medium truncate title-text flex items-center gap-2">
                    ${track.title}
                    ${hasError ? `<svg title="No se pudo leer el archivo" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-yellow-500 flex-shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>` : ''}
                </p>
                <p class="text-sm text-gray-400 truncate">${track.artist}</p>
            </div>
        </div>
        <div class="text-sm truncate text-gray-400">${track.album}</div>
        <div class="text-center text-sm text-gray-400">${formatTime(track.duration)}</div>`;
    
    if (!hasError) {
        trackElement.querySelector('.play-icon-container').addEventListener('click', (e) => {
            e.stopPropagation();
            const originalIndex = appState.viewingContext.originalTracks.indexOf(track);
            if (appState.playerControls && originalIndex !== -1) {
                appState.playerControls.playTrack(originalIndex);
            }
        });
        trackElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showContextMenu(e.clientX, e.clientY, track, appState);
        });
    }
    return trackElement;
}

function showContextMenu(x, y, track, appState) {
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.top = `${y}px`;
    contextMenu.style.left = `${x}px`;
    contextMenu.classList.remove('hidden');
    contextMenu.innerHTML = '<button class="context-menu-item" id="ctx-add-to-queue">Añadir a la cola</button>';
    document.getElementById('ctx-add-to-queue').onclick = () => {
        appState.playQueue.push(track);
        if (appState.queueControls && typeof appState.queueControls.renderQueue === 'function') {
            appState.queueControls.renderQueue(appState);
        }
        contextMenu.classList.add('hidden');
    };
}

function clearAllPlayingHighlights() {
    const allPlayingTracks = document.querySelectorAll('.now-playing-track');
    allPlayingTracks.forEach(trackEl => {
        trackEl.classList.remove('now-playing-track');
        const trackNumber = trackEl.querySelector('.track-number');
        const playingIcon = trackEl.querySelector('.playing-icon');
        if (trackNumber) trackNumber.classList.remove('hidden');
        if (playingIcon) playingIcon.classList.add('hidden');
    });
}

export function highlightPlayingTrack(trackId, appState) {
    clearAllPlayingHighlights();
    if (!trackId || !appState.playingContext || !appState.playingContext.path || !appState.viewingContext) return;
    const playingPath = JSON.stringify(appState.playingContext.path);
    const viewingPath = JSON.stringify(appState.viewingContext.path);
    if (playingPath === viewingPath) {
        const currentlyPlaying = document.querySelector(`[data-track-id="${trackId}"]`);
        if (currentlyPlaying) {
            currentlyPlaying.classList.add('now-playing-track');
            const newTrackNumber = currentlyPlaying.querySelector('.track-number');
            const newPlayingIcon = currentlyPlaying.querySelector('.playing-icon');
            if (newTrackNumber) newTrackNumber.classList.add('hidden');
            if (newPlayingIcon) newPlayingIcon.classList.remove('hidden');
        }
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '--:--';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function formatTotalDuration(totalSeconds) {
    if (isNaN(totalSeconds)) return '';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    let result = [];
    if (hours > 0) result.push(`${hours} h`);
    if (minutes > 0) result.push(`${minutes} min`);
    return result.join(', ');
}

export function ensureTrackIsVisible(trackId, appState) {
    const trackElement = document.querySelector(`#track-list .track-item[data-track-id="${trackId}"]`);
    if (trackElement) {
        trackElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        highlightPlayingTrack(trackId, appState);
    }
}

export function renderPlaylistView(node, name, path, appState, onCompleteCallback, targetTrackId = null) {
    const mainContentContainer = document.getElementById('main-content-container');
    if (!mainContentContainer) return;

    renderCancelled = true;
    clearAllPlayingHighlights();

    appState.viewingContext = { tracks: [], originalTracks: [...node._tracks], node, name, path };

    const playlistPath = JSON.stringify(path);
    const sortBy = appState.playlistSortOrders[playlistPath] || 'default';
    let tracksToRender = [...node._tracks];
    switch (sortBy) {
        case 'alpha-asc': tracksToRender.sort((a, b) => a.title.localeCompare(b.title)); break;
        case 'alpha-desc': tracksToRender.sort((a, b) => b.title.localeCompare(a.title)); break;
        case 'date-desc': tracksToRender.sort((a, b) => b.dateAdded - a.dateAdded); break;
        case 'date-asc': tracksToRender.sort((a, b) => a.dateAdded - b.dateAdded); break;
        default: break;
    }
    appState.viewingContext.tracks = tracksToRender;

    mainContentContainer.innerHTML = `
        <main class="flex-1 bg-gradient-to-b from-gray-800 to-black main-view overflow-y-auto relative">
            <div id="playlist-header" class="p-6 flex items-end justify-between">
                <div class="flex items-end space-x-6">
                    <div id="playlist-cover-container" class="w-48 h-48 bg-gray-700 rounded shadow-lg flex-shrink-0"></div>
                    <div class="flex flex-col gap-2">
                        <h2 id="playlist-name" class="text-5xl font-bold text-white"></h2>
                        <p id="playlist-metadata" class="text-sm text-gray-300"></p>
                    </div>
                </div>
            </div>
            <div class="p-6">
                <div id="playlist-controls" class="mb-4 flex items-center justify-end gap-4 relative">
                    <input type="text" id="search-input" class="bg-gray-700 text-white rounded-full focus:outline-none" spellcheck="false" autocomplete="off">
                    <div id="default-controls" class="flex items-center gap-4">
                        <button id="show-search-btn" class="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
                        </button>
                        <div class="relative">
                            <button id="playlist-sort-btn" class="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M17 4V2.067a.5.5 0 0 1 .82-.384l4.12 3.433a.5.5 0 0 1-.321.884H2V4h15ZM2 18h20v2H2v-2Zm0-7h20v2H2v-2Z"/></svg>
                                <span>Ordenar</span>
                            </button>
                            <div id="playlist-sort-panel" class="hidden absolute top-full right-0 mt-2 w-48 bg-[#282828] rounded-lg shadow-lg z-50 p-2">
                                <button class="sort-option" data-sort-by="default">Orden por defecto</button>
                                <button class="sort-option" data-sort-by="alpha-asc">Título (A-Z)</button>
                                <button class="sort-option" data-sort-by="alpha-desc">Título (Z-A)</button>
                                <button class="sort-option" data-sort-by="date-desc">Más reciente</button>
                                <button class="sort-option" data-sort-by="date-asc">Más antiguo</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="track-list-header" class="grid grid-cols-[auto_4fr_3fr_auto] gap-4 text-gray-400 border-b border-gray-700 p-2 text-sm uppercase tracking-wider mt-4">
                    <div class="text-center">#</div><div>Título</div><div>Álbum</div><div class="text-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg></div>
                </div>
                <div id="track-list" class="mt-4 space-y-1"></div>
            </div>
        </main>`;
    
    const coverContainer = mainContentContainer.querySelector('#playlist-cover-container');
    const playlistNameEl = mainContentContainer.querySelector('#playlist-name');
    const playlistMetadataEl = mainContentContainer.querySelector('#playlist-metadata');
    const songCount = tracksToRender.length;
    const totalDuration = tracksToRender.reduce((sum, track) => sum + (track.duration || 0), 0);
    const coverUrl = songCount > 0 ? tracksToRender[0].cover : 'https://placehold.co/192x192/121212/808080?text=Playlist';
    
    coverContainer.innerHTML = `<img src="${coverUrl}" alt="Portada de ${name}">`;
    playlistNameEl.textContent = name;
    playlistMetadataEl.textContent = `${songCount} canciones, ${formatTotalDuration(totalDuration)}`;

    const trackListEl = document.getElementById('track-list');
    if (!trackListEl) return;
    
    renderCancelled = false;

    // Lógica de renderizado por lotes (batch rendering)
    const BATCH_SIZE = 50; // Renderiza 50 canciones por frame para fluidez
    const renderBatch = (index = 0) => {
        if (index >= tracksToRender.length || renderCancelled) {
            // Cuando termina el renderizado, se llama al callback si existe.
            if (onCompleteCallback) onCompleteCallback();
            
            // Si la playlist cargada es la que está sonando, resalta la canción activa
            if (appState.playingContext && appState.playingContext.path && JSON.stringify(appState.playingContext.path) === playlistPath) {
                const activeTrack = appState.playingContext.originalTracks[appState.playingContext.trackIndex];
                if(activeTrack) highlightPlayingTrack(activeTrack.id, appState);
            }
            return;
        }

        const fragment = document.createDocumentFragment();
        const end = Math.min(index + BATCH_SIZE, tracksToRender.length);

        for (let i = index; i < end; i++) {
            const trackElement = createTrackElement(tracksToRender[i], i, appState);
            fragment.appendChild(trackElement);
        }
        trackListEl.appendChild(fragment);

        requestAnimationFrame(() => renderBatch(end));
    };

    // Si hay un targetTrackId, renderiza un lote inicial y luego el resto.
    // Esto asegura que el elemento exista antes de intentar hacer scroll.
    if (targetTrackId) {
        const targetIndex = tracksToRender.findIndex(t => t.id === targetTrackId);
        if (targetIndex !== -1) {
            // Renderiza todo hasta el target de inmediato para asegurar que exista
            const fragment = document.createDocumentFragment();
            for (let i = 0; i <= targetIndex; i++) {
                const trackElement = createTrackElement(tracksToRender[i], i, appState);
                fragment.appendChild(trackElement);
            }
            trackListEl.appendChild(fragment);

            // Haz scroll y luego renderiza el resto
            ensureTrackIsVisible(targetTrackId, appState);
            renderBatch(targetIndex + 1);
            return;
        }
    }
    
    // Si no hay target, simplemente renderiza todo desde el principio.
    renderBatch(0);
}
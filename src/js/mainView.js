// src/js/mainView.js

import { renderHomeView, showWelcomeView } from './views/homeView.js';
import { renderPlaylistView, highlightPlayingTrack, ensureTrackIsVisible } from './views/playlistView.js';

function findNodeByPath(path, library) {
    let currentNode = { _items: library };
    for (const part of path) {
        if (currentNode && currentNode._items && currentNode._items[part]) {
            currentNode = currentNode._items[part];
        } else {
            return null;
        }
    }
    return currentNode;
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

export function initMainView(appState) {
    const mainContentContainer = document.getElementById('main-content-container');

    const handleSearch = (searchTerm) => {
        if (!appState.viewingContext) return;
        
        const trackItems = mainContentContainer.querySelectorAll('#track-list .track-item');
        trackItems.forEach(item => {
            const title = item.querySelector('.title-text')?.textContent.toLowerCase() || '';
            const artist = item.querySelector('.text-sm.text-gray-400')?.textContent.toLowerCase() || '';
            const album = item.querySelector('.text-sm.truncate.text-gray-400')?.textContent.toLowerCase() || '';
            const isMatch = title.includes(searchTerm) || artist.includes(searchTerm) || album.includes(searchTerm);
            item.style.display = isMatch ? 'grid' : 'none';
        });
        
        const placeholders = mainContentContainer.querySelectorAll('#track-list .track-item-placeholder');
        placeholders.forEach(p => p.style.display = 'none');
    };
    const debouncedSearch = debounce(handleSearch, 300);

    mainContentContainer.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.play-mosaic-btn');
        const mosaic = e.target.closest('.playlist-mosaic');
        
        if (playBtn) {
            e.stopPropagation();
            const path = JSON.parse(playBtn.dataset.path);
            const node = findNodeByPath(path, appState.library);
            if (node && node._tracks.length > 0 && appState.playerControls) {
                const name = path[path.length - 1];
                let trackIndexToPlay = 0;
                if (appState.isShuffled) {
                    trackIndexToPlay = Math.floor(Math.random() * node._tracks.length);
                }
                appState.viewingContext = { tracks: [...node._tracks], originalTracks: [...node._tracks], node, name, path };
                appState.playerControls.playTrack(trackIndexToPlay);
                renderPlaylistView(node, name, path, appState, null);
            }
            return;
        }

        if (mosaic) {
            const path = JSON.parse(mosaic.dataset.path);
            const node = findNodeByPath(path, appState.library);
            if (node) {
                const name = path[path.length - 1];
                const currentlyActive = document.querySelector('.sidebar-item-active');
                if (currentlyActive) currentlyActive.classList.remove('sidebar-item-active');
                const targetSidebarItem = document.querySelector(`.sidebar-item[data-path='${JSON.stringify(path)}']`);
                if (targetSidebarItem) targetSidebarItem.classList.add('sidebar-item-active');
                renderPlaylistView(node, name, path, appState, null);
            }
            return;
        }

        const controlsContainer = document.getElementById('playlist-controls');
        if (!controlsContainer) return;

        const sortBtn = e.target.closest('#playlist-sort-btn');
        const sortOption = e.target.closest('.sort-option');
        const sortPanel = document.getElementById('playlist-sort-panel');
        const showSearchBtn = e.target.closest('#show-search-btn');
        const searchInput = document.getElementById('search-input');
        
        if (showSearchBtn) {
            controlsContainer.classList.add('search-active');
            searchInput.focus();
            return;
        }

        if (sortBtn) {
            sortPanel?.classList.toggle('hidden');
            return;
        }

        if (sortOption && appState.viewingContext) {
            const sortBy = sortOption.dataset.sortBy;
            const playlistPath = JSON.stringify(appState.viewingContext.path);
            appState.playlistSortOrders[playlistPath] = sortBy;
            appState.settingsControls.save(appState);
            renderPlaylistView(appState.viewingContext.node, appState.viewingContext.name, appState.viewingContext.path, appState, null);
            sortPanel?.classList.add('hidden');
            return;
        }
        
        if (controlsContainer.classList.contains('search-active')) {
            const isClickOnControls = e.target.closest('#default-controls') || e.target.closest('#search-input');
            if (!isClickOnControls && searchInput && searchInput.value.trim() === '') {
                controlsContainer.classList.remove('search-active');
            }
        }
        
        if (sortPanel && !sortPanel.contains(e.target) && e.target !== sortBtn) {
            sortPanel.classList.add('hidden');
        }
    });
    
    mainContentContainer.addEventListener('input', (e) => {
        if (e.target.id === 'search-input') {
            debouncedSearch(e.target.value.toLowerCase().trim());
        }
    });

    showWelcomeView();
    console.log('Módulo de MainView inicializado.');

    function scrollToActiveTrack() {
        if (!appState.playingContext || !appState.playingContext.path) return;
        const currentTrack = appState.playingContext.originalTracks[appState.playingContext.trackIndex];
        if (!currentTrack) return;
        ensureTrackIsVisible(currentTrack.id, appState);
    }

    function navigateToTrack(trackId) {
        if (!appState.playingContext || !appState.playingContext.path) return;

        const { node, name, path } = appState.playingContext;
        const playingPlaylistPath = JSON.stringify(path);

        const currentlyActiveSidebarItem = document.querySelector('.sidebar-item-active');
        if (currentlyActiveSidebarItem) currentlyActiveSidebarItem.classList.remove('sidebar-item-active');
        
        const targetSidebarItem = document.querySelector(`.sidebar-item[data-path='${playingPlaylistPath}']`);
        if (targetSidebarItem) {
            targetSidebarItem.classList.add('sidebar-item-active');
            
            let parentLi = targetSidebarItem.closest('li');
            while (parentLi) {
                const parentUl = parentLi.parentElement;
                if (parentUl && parentUl.classList.contains('hidden')) {
                    parentUl.classList.remove('hidden');
                    const parentLiOfUl = parentUl.closest('li');
                    if (parentLiOfUl) {
                        const arrow = parentLiOfUl.querySelector('.folder-arrow');
                        if (arrow) arrow.classList.add('rotate-90');
                    }
                }
                parentLi = parentUl.closest('li');
            }
        }

        renderPlaylistView(node, name, path, appState, trackId);
        
        // --- ARREGLO FINAL PARA EL RESALTADO ---
        // Esperamos un instante para dar tiempo al renderizado prioritario
        // a crear el elemento, y luego lo resaltamos.
        setTimeout(() => {
            highlightPlayingTrack(trackId, appState);
        }, 100); // 100ms es un retraso seguro e imperceptible
    }

    return {
        renderHomeView: () => renderHomeView(appState),
        renderPlaylistView: (node, name, path, targetTrackId = null) => renderPlaylistView(node, name, path, appState, targetTrackId),
        highlightPlayingTrack: (trackId) => highlightPlayingTrack(trackId, appState),
        scrollToActiveTrack,
        navigateToTrack,
    };
}
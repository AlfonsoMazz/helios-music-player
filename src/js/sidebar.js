// src/js/sidebar.js

// --- Lógica de la Animación de Texto (Versión Definitiva) ---
function handleTextOverflow(parentElement) {
    const spanElement = parentElement.querySelector('span');
    const originalText = parentElement.dataset.originalText;

    if (!spanElement || !originalText || originalText === '...') {
        spanElement.innerText = '...';
        spanElement.classList.remove('is-scrolling');
        return;
    }

    const temporarySpan = document.createElement('span');
    temporarySpan.style.position = 'absolute';
    temporarySpan.style.visibility = 'hidden';
    temporarySpan.style.whiteSpace = 'nowrap';
    
    if (parentElement.id === 'current-track-title') {
        temporarySpan.style.fontWeight = '600';
        temporarySpan.style.fontSize = '16px';
    } else {
        temporarySpan.style.fontSize = '12px';
    }
    
    temporarySpan.innerText = originalText;
    document.body.appendChild(temporarySpan);

    const textWidth = temporarySpan.getBoundingClientRect().width;
    const containerWidth = parentElement.clientWidth;

    document.body.removeChild(temporarySpan);

    const isOverflowing = textWidth > containerWidth;

    if (isOverflowing) {
        // --- CAMBIO: Lógica de duplicación mejorada para un bucle perfecto ---
        // Definimos un separador amplio para asegurar que haya espacio.
        const separator = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'; // Son 6 espacios de no ruptura
        // Creamos una unidad que contiene el texto y el separador.
        const displayUnit = `${originalText}${separator}`;
        // Duplicamos la unidad completa para un ciclo perfecto.
        spanElement.innerText = `${displayUnit}${displayUnit}`;
        spanElement.classList.add('is-scrolling');
    } else {
        spanElement.innerText = originalText;
        spanElement.classList.remove('is-scrolling');
    }
}

// --- Lógica para Actualizar la UI de "Ahora Suena" ---
function updateNowPlayingInfo(track) {
    const currentTrackImg = document.getElementById('current-track-img');
    const currentTrackTitle = document.getElementById('current-track-title');
    const currentTrackArtist = document.getElementById('current-track-artist');

    if (!currentTrackImg || !currentTrackTitle || !currentTrackArtist) return;

    if (!track) {
        currentTrackImg.src = 'https://placehold.co/64x64/121212/808080?text=...';
        currentTrackTitle.dataset.originalText = '...';
        currentTrackArtist.dataset.originalText = '...';
        handleTextOverflow(currentTrackTitle);
        handleTextOverflow(currentTrackArtist);
        return;
    }
    
    currentTrackImg.src = track.cover;
    
    currentTrackTitle.dataset.originalText = track.title;
    currentTrackArtist.dataset.originalText = track.artist;

    handleTextOverflow(currentTrackTitle);
    handleTextOverflow(currentTrackArtist);
}

// --- Función Principal de Inicialización ---
export function initSidebar(appState, mainViewControls) {
    const playlistContainer = document.getElementById('playlist-container');
    const fileInput = document.getElementById('file-input');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const addLibraryBtn = document.getElementById('add-library-btn');
    const selectFolderBtn = document.getElementById('select-folder-btn');
    const nowPlayingContainer = document.getElementById('now-playing-container');
    const homeBtn = document.getElementById('home-btn');

    function saveExpandedState() {
        if (!appState.settingsControls) return;
        const expandedFolderPaths = [];
        const potentialFolders = document.querySelectorAll('#playlist-container li > div + ul');
        potentialFolders.forEach(ul => {
            if (!ul.classList.contains('hidden')) {
                const itemDiv = ul.previousElementSibling;
                if (itemDiv && itemDiv.dataset.path) {
                    expandedFolderPaths.push(itemDiv.dataset.path);
                }
            }
        });
        appState.expandedFolderPaths = expandedFolderPaths;
        appState.settingsControls.save(appState);
    }
    
    function createSidebarNode(name, node, path, isAnimated = false) {
        const li = document.createElement('li');
        if (isAnimated) {
             li.classList.add('sidebar-item-fade-in');
        }

        const hasSubFolders = Object.keys(node._items).length > 0;
        const hasTracks = node._tracks.length > 0;
        
        const galaxyIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0 text-gray-400" viewBox="0 0 1024 896" fill="currentColor"><path d="M576 896q-104 0-192.5-51.5t-140-140T192 512q0-106 75-181t181-75q34 0 78 19t79 57.5t35 83.5q0 59-11 84q33-15 54-46.5t21-69.5q0-106-75-181t-181-75q-87 0-160.5 43T171 287.5T128 448q0 125 37.5 228T256 832Q117 786 58.5 693T0 448q0-91 35.5-174T131 131t143-95.5T448 0q104 0 192.5 51.5t140 140T832 384q0 106-75 181t-181 75q-34 0-78-19t-79-57.5t-35-83.5q0-59 11-84q-33 15-54 46.5T320 512q0 106 75 181t181 75q87 0 160.5-43T853 608.5T896 448q0-124-37.5-227.5T768 64q139 46 197.5 139t58.5 245q0 91-35.5 174T893 765t-143 95.5T576 896z"/></svg>`;
        const planetIcon = `<svg viewBox="0 0 20 20" class="w-5 h-5 flex-shrink-0 text-gray-400" fill="currentColor"><g><g opacity=".2"><path d="M18.5 10.5a8 8 0 1 1-16 0a8 8 0 0 1 16 0Z"/><path fill-rule="evenodd" d="M10.5 16.5a6 6 0 1 0 0-12a6 6 0 0 0 0 12Zm0 2a8 8 0 1 0 0-16a8 8 0 0 0 0 16Z" clip-rule="evenodd"/></g><path fill-rule="evenodd" d="M9.5 2a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15ZM1 9.5a8.5 8.5 0 1 1 17 0a8.5 8.5 0 0 1-17 0Z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.873 4.679a.5.5 0 0 1-.184.683c-.614.354-1.446.638-2.403.841a.5.5 0 1 1-.208-.978c.9-.191 1.621-.447 2.112-.73a.5.5 0 0 1 .683.184Zm-12.534.147a.5.5 0 0 1 .67-.223c1.132.567 3.144.968 5.491.968a.5.5 0 0 1 0 1c-2.424 0-4.612-.41-5.938-1.074a.5.5 0 0 1-.223-.671Zm13.467 3.311a.5.5 0 0 1-.229.67C15.08 9.538 12.382 10 9.367 10c-2.838 0-5.386-.408-6.92-1.062a.5.5 0 1 1 .392-.92C4.196 8.597 6.592 9 9.367 9c2.96 0 5.477-.458 6.77-1.092a.5.5 0 0 1 .67.23Zm0 3.429a.5.5 0 0 1-.229.669c-.775.38-2.099.673-3.555.874a35.51 35.51 0 0 1-4.665.32a.5.5 0 1 1 0-1c1.47 0 3.099-.114 4.529-.31c1.448-.2 2.632-.479 3.251-.782a.5.5 0 0 1 .67.229Zm-14.623.145a.5.5 0 0 1 .656-.264c.477.203 1.091.388 1.816.541a.5.5 0 1 1-.206.978c-.768-.161-1.448-.363-2.002-.6a.5.5 0 0 1-.264-.655Z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.357 12.286a.929.929 0 1 0 0 1.857a.929.929 0 0 0 0-1.857Zm-1.928.928a1.929 1.929 0 1 1 3.857 0a1.929 1.929 0 0 1-3.857 0Z" clip-rule="evenodd"/></g></svg>`;
        
        const iconHTML = hasTracks ? planetIcon : galaxyIcon;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800 cursor-pointer sidebar-item';
        itemDiv.dataset.path = JSON.stringify(path);
        itemDiv.innerHTML = `<svg class="w-4 h-4 transform transition-transform flex-shrink-0 folder-arrow ${hasSubFolders ? '' : 'invisible'}" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>${iconHTML}<span class="flex-1 truncate">${name}</span>`;
        
        li.appendChild(itemDiv);
        
        if (hasSubFolders) {
            const sublist = document.createElement('ul');
            sublist.className = 'pl-5 hidden';
            li.appendChild(sublist);
        }
        
        itemDiv.addEventListener('click', (e) => {
            e.stopPropagation();

            if (hasTracks) {
                const currentlyActive = document.querySelector('.sidebar-item-active');
                if (currentlyActive) currentlyActive.classList.remove('sidebar-item-active');
                itemDiv.classList.add('sidebar-item-active');

                if (mainViewControls) {
                    mainViewControls.renderPlaylistView(node, name, path, null, null);
                }
            }

            if (hasSubFolders) {
                const sublist = li.querySelector('ul');
                const arrow = itemDiv.querySelector('.folder-arrow');
                sublist.classList.toggle('hidden');
                arrow.classList.toggle('rotate-90');
                saveExpandedState();
            }
        });

        return li;
    }

    function renderOrUpdateNode(path, node) {
        if (!playlistContainer) return;

        const name = path[path.length - 1];
        const parentPath = path.slice(0, -1);
        
        let parentUl;
        if (parentPath.length === 0) {
            parentUl = playlistContainer.querySelector('ul');
            if (!parentUl) {
                parentUl = document.createElement('ul');
                playlistContainer.appendChild(parentUl);
            }
        } else {
            const parentDiv = playlistContainer.querySelector(`.sidebar-item[data-path='${JSON.stringify(parentPath)}']`);
            if (parentDiv) {
                parentUl = parentDiv.nextElementSibling;
            }
        }
        
        if (parentUl) {
            const existingItem = parentUl.querySelector(`.sidebar-item[data-path='${JSON.stringify(path)}']`);
            if (!existingItem) {
                const newNodeEl = createSidebarNode(name, node, path, true);
                parentUl.appendChild(newNodeEl);
            }
        } else {
            console.warn("No se pudo encontrar el contenedor padre para:", path);
        }
    }
    
    function renderSidebar() {
        if (!playlistContainer) return;
        playlistContainer.innerHTML = '';

        // LÓGICA DE FEEDBACK VISUAL
        if (appState.isScanning) {
            playlistContainer.innerHTML = `<p class="text-xs text-gray-500 px-2 animate-pulse">Escaneando y guardando biblioteca...</p>`;
            return;
        }

        if (Object.keys(appState.library).length > 0) {
            const rootUl = document.createElement('ul');
            
            function buildCachedTree(node, currentPath, parentUl) {
                const sortedKeys = Object.keys(node._items).sort((a, b) => a.localeCompare(b));
                for (const key of sortedKeys) {
                    const childNode = node._items[key];
                    const newPath = [...currentPath, key];
                    const li = createSidebarNode(key, childNode, newPath, false);
                    parentUl.appendChild(li);

                    if (Object.keys(childNode._items).length > 0) {
                        const sublist = li.querySelector('ul');
                        const pathString = JSON.stringify(newPath);
                        const isExpanded = appState.expandedFolderPaths && appState.expandedFolderPaths.includes(pathString);
                        
                        if (isExpanded) {
                            sublist.classList.remove('hidden');
                            const arrow = li.querySelector('.folder-arrow');
                            if (arrow) arrow.classList.add('rotate-90');
                            buildCachedTree(childNode, newPath, sublist);
                        }
                    }
                }
            }

            buildCachedTree({ _items: appState.library }, [], rootUl);
            playlistContainer.appendChild(rootUl);
            
            if (appState.sidebarScrollTop) {
                playlistContainer.scrollTop = appState.sidebarScrollTop;
            }

        } else {
            playlistContainer.innerHTML = `<p class="text-xs text-gray-500 px-2">Usa "+" para cargar tu música.</p>`;
        }
    }

    // --- Event Listeners ---
    if(addLibraryBtn) addLibraryBtn.addEventListener('click', () => fileInput.click());
    if(settingsBtn) settingsBtn.addEventListener('click', (e) => { e.stopPropagation(); settingsPanel.classList.toggle('hidden'); });
    if (selectFolderBtn) selectFolderBtn.addEventListener('click', () => fileInput.click());
    
    if (playlistContainer) {
        playlistContainer.addEventListener('scroll', () => {
            appState.sidebarScrollTop = playlistContainer.scrollTop;
            appState.settingsControls.save(appState);
        }, { passive: true }); // Usamos passive para mejor rendimiento de scroll
    }
    
    if (homeBtn && mainViewControls) {
        homeBtn.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.sidebar-item-active');
            if (currentlyActive) {
                currentlyActive.classList.remove('sidebar-item-active');
            }
            mainViewControls.renderHomeView();
        });
    }

    window.addEventListener('click', (e) => {
        if (settingsPanel && !settingsPanel.contains(e.target) && e.target !== settingsBtn && !settingsBtn.contains(e.target)) {
            settingsPanel.classList.add('hidden');
        }
    });
    
    if (nowPlayingContainer) {
        nowPlayingContainer.style.cursor = 'pointer';
        nowPlayingContainer.addEventListener('click', () => {
            if (!appState.playingContext || !appState.playingContext.path || !mainViewControls) return;

            const activeTrack = appState.playingContext.originalTracks[appState.playingContext.trackIndex];
            if (!activeTrack) return;
            
            if (mainViewControls.navigateToTrack) {
                mainViewControls.navigateToTrack(activeTrack.id);
            }
        });
    }

    renderSidebar();
    console.log('Módulo de la Sidebar inicializado.');

    return {
        renderSidebar,
        updateNowPlayingInfo,
        renderOrUpdateNode 
    };
}
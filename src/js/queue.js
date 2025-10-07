// src/js/queue.js

/**
 * Renderiza el contenido del panel de la cola.
 * @param {object} appState - El estado actual de la aplicación.
 * @param {boolean} force - Si es true, renderiza el panel incluso si está oculto.
 */
function renderQueue(appState, force = false) {
    const queuePanel = document.getElementById('queue-panel');
    if (!queuePanel) return;

    // Optimización: No hacer nada si la función es llamada dinámicamente y el panel está cerrado.
    if (!force && !queuePanel.classList.contains('visible')) {
        return;
    }

    const queueListEl = document.getElementById('queue-list');
    if (!queueListEl) return;
    queueListEl.innerHTML = '';

    const manualQueue = appState.playQueue;
    const naturalQueue = (appState.playerControls && typeof appState.playerControls.getUpcomingTracks === 'function') 
        ? appState.playerControls.getUpcomingTracks(50) 
        : [];

    if (manualQueue.length === 0 && naturalQueue.length === 0) {
        queueListEl.innerHTML = '<p class="text-gray-500 text-center p-4">La cola está vacía.</p>';
        return;
    }

    if (manualQueue.length > 0) {
        const manualHeader = document.createElement('h4');
        manualHeader.className = 'px-2 pt-2 text-xs font-bold text-gray-400 uppercase tracking-wider';
        manualHeader.textContent = 'Added by the user';
        queueListEl.appendChild(manualHeader);

        const manualContainer = document.createElement('div');
        manualContainer.id = 'manual-queue-container';
        manualQueue.forEach((track) => {
            const item = document.createElement('div');
            item.className = 'queue-item flex items-center space-x-3 p-2 rounded-md hover:bg-white/10 cursor-pointer';
            item.draggable = true;
            item.dataset.trackId = track.id; 
            
            item.innerHTML = `
                <img src="${track.cover}" class="w-10 h-10 rounded flex-shrink-0">
                <div class="truncate flex-1">
                    <p class="text-white font-medium truncate">${track.title}</p>
                    <p class="text-sm text-gray-400 truncate">${track.artist}</p>
                </div>
                <button class="remove-from-queue-btn text-gray-400 hover:text-white p-1 ml-2 flex-shrink-0" data-track-id="${track.id}" title="Eliminar de la cola">
                    <svg xmlns="http://www.w.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708 .708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
            `;
            manualContainer.appendChild(item);
        });
        queueListEl.appendChild(manualContainer);
    }
    
    if (naturalQueue.length > 0) {
        const naturalHeader = document.createElement('h4');
        naturalHeader.className = 'px-2 pt-4 text-xs font-bold text-gray-400 uppercase tracking-wider';
        naturalHeader.textContent = 'Next Songs';
        queueListEl.appendChild(naturalHeader);
        
        naturalQueue.forEach((track) => {
            const item = document.createElement('div');
            item.className = 'flex items-center space-x-3 p-2 rounded-md opacity-70';
            item.dataset.trackId = track.id; 
            
            item.innerHTML = `
                <img src="${track.cover}" class="w-10 h-10 rounded flex-shrink-0">
                <div class="truncate flex-1">
                    <p class="text-white font-medium truncate">${track.title}</p>
                    <p class="text-sm text-gray-400 truncate">${track.artist}</p>
                </div>
            `;
            queueListEl.appendChild(item);
        });
    }
}

let draggedItem = null;

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.queue-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

export function initQueue(appState) {
    const queueBtn = document.getElementById('queue-btn');
    const queuePanel = document.getElementById('queue-panel');
    const queueListEl = document.getElementById('queue-list');
    const clearQueueBtn = document.getElementById('clear-queue-btn');

    queueBtn.addEventListener('click', () => {
        // Primero cambiamos la visibilidad
        queuePanel.classList.toggle('visible');
        // Si ahora está visible, forzamos el renderizado
        if (queuePanel.classList.contains('visible')) {
            renderQueue(appState, true);
        }
    });

    if (clearQueueBtn) {
        clearQueueBtn.addEventListener('click', () => {
            appState.playQueue.length = 0;
            renderQueue(appState, true); // Forzar renderizado
            if (appState.playerControls) {
                appState.playerControls.updateNextInQueueCard();
            }
        });
    }

    if (queueListEl) {
        queueListEl.addEventListener('click', (e) => {
            const removeButton = e.target.closest('.remove-from-queue-btn');
            if (removeButton) {
                e.stopPropagation();
                const trackIdToRemove = removeButton.dataset.trackId;
                
                const trackIndex = appState.playQueue.findIndex(track => track.id === trackIdToRemove);
                if (trackIndex > -1) {
                    appState.playQueue.splice(trackIndex, 1);
                    renderQueue(appState, true); // Forzar renderizado
                    if (appState.playerControls) {
                        appState.playerControls.updateNextInQueueCard();
                    }
                }
            }
        });

        queueListEl.addEventListener('dragstart', (e) => {
            draggedItem = e.target.closest('.queue-item');
            if (draggedItem) {
                setTimeout(() => {
                    draggedItem.classList.add('dragging');
                }, 0);
            }
        });

        queueListEl.addEventListener('dragend', () => {
            if (draggedItem) {
                draggedItem.classList.remove('dragging');
                
                const manualContainer = document.getElementById('manual-queue-container');
                if (manualContainer) {
                    const newOrderedIds = [...manualContainer.querySelectorAll('.queue-item')].map(item => item.dataset.trackId);
                    appState.playQueue.sort((a, b) => newOrderedIds.indexOf(a.id) - newOrderedIds.indexOf(b.id));

                    if (appState.playerControls) {
                        appState.playerControls.updateNextInQueueCard();
                    }
                }

                draggedItem = null;
                renderQueue(appState, true); // Forzar renderizado
            }
        });

        queueListEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            const manualContainer = document.getElementById('manual-queue-container');
            if (!manualContainer || !manualContainer.contains(e.target)) return;
            
            const afterElement = getDragAfterElement(manualContainer, e.clientY);
            const draggable = document.querySelector('.dragging');

            if (draggable) {
                if (afterElement == null) {
                    manualContainer.appendChild(draggable);
                } else {
                    manualContainer.insertBefore(draggable, afterElement);
                }
            }
        });
    }

    console.log('Módulo de la cola inicializado.');
    return { renderQueue };
}
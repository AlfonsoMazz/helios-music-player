function renderQueue(appState) {
    const queueListEl = document.getElementById('queue-list');
    if (!queueListEl) return;
    queueListEl.innerHTML = '';

    if (appState.playQueue.length === 0) {
        queueListEl.innerHTML = '<p class="text-gray-500 text-center p-4">Añade canciones a la cola con clic derecho.</p>';
        return;
    }

    appState.playQueue.forEach((track, index) => {
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
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        `;
        queueListEl.appendChild(item);
    });
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
        queuePanel.classList.toggle('visible');
    });

    if (clearQueueBtn) {
        clearQueueBtn.addEventListener('click', () => {
            appState.playQueue.length = 0;
            renderQueue(appState);
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
                    renderQueue(appState);
                }
            }
        });
    }

    // --- LÓGICA DE DRAG AND DROP MEJORADA ---
    queueListEl.addEventListener('dragstart', (e) => {
        draggedItem = e.target.closest('.queue-item');
        if (draggedItem) {
            setTimeout(() => {
                draggedItem.classList.add('dragging');
            }, 0);
        }
    });

    queueListEl.addEventListener('dragend', (e) => {
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
            
            // Limpia cualquier línea divisoria que haya quedado
            const currentIndicator = queueListEl.querySelector('.drag-over');
            if (currentIndicator) {
                currentIndicator.classList.remove('drag-over');
            }

            // Actualiza el orden en el array de estado y vuelve a renderizar
            const newOrderedIds = [...queueListEl.querySelectorAll('.queue-item')].map(item => item.dataset.trackId);
            appState.playQueue.sort((a, b) => newOrderedIds.indexOf(a.id) - newOrderedIds.indexOf(b.id));

            draggedItem = null;
            renderQueue(appState); 
        }
    });

    queueListEl.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(queueListEl, e.clientY);
        const draggable = document.querySelector('.dragging');

        // Limpia la línea divisoria anterior antes de dibujar la nueva
        const currentIndicator = queueListEl.querySelector('.drag-over');
        if (currentIndicator) {
            currentIndicator.classList.remove('drag-over');
        }
        
        // Muestra la nueva línea divisoria
        if (afterElement) {
            afterElement.classList.add('drag-over');
        }

        // Mueve el elemento en el DOM para la retroalimentación visual
        if (draggable) {
            if (afterElement == null) {
                queueListEl.appendChild(draggable);
            } else {
                queueListEl.insertBefore(draggable, afterElement);
            }
        }
    });

    console.log('Módulo de la cola inicializado.');
    return { renderQueue };
}
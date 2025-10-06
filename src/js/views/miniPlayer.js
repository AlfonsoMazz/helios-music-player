// src/js/views/miniPlayer.js

// --- Declaraciones de variables del DOM ---
let miniPlayerContainer, dragHandle, closeBtn, bgCover, mainCoverArt, titleEl, artistEl, playPauseBtn, playIcon, pauseIcon, prevBtn, nextBtn, shuffleBtn, repeatBtn, volumeBtn, volumeBar, progressBarContainer, progressBarFg, mpCurrentTime, mpTotalTime;
let dragHandleBar, closeBtnBar, playPauseBtnBar, playIconBar, pauseIconBar, prevBtnBar, nextBtnBar, shuffleBtnBar, repeatBtnBar, volumeBtnBar, coverBar, titleBar, artistBar, progressBarContainerBar, progressBarFgBar;
let globalVolumePopup, globalVolumeBar;
let volumePopupTimeout;
let animationFrameId = null;

// --- Íconos SVG ---
const shuffleIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" d="M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37Z"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" d="m69 153.99l187 110l187-110m-187 310v-200"/><ellipse cx="256" cy="152" fill="currentColor" rx="16" ry="10"/><ellipse cx="208" cy="296" fill="currentColor" rx="10" ry="16"/><ellipse cx="112" cy="328" fill="currentColor" rx="10" ry="16"/><ellipse cx="304" cy="296" fill="currentColor" rx="10" ry="16"/><ellipse cx="400" cy="240" fill="currentColor" rx="10" ry="16"/><ellipse cx="304" cy="384" fill="currentColor" rx="10" ry="16"/><ellipse cx="400" cy="328" fill="currentColor" rx="10" ry="16"/></svg>`;
const repeatIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M365.8 22.43c-10.6.2-22.6 2.5-36.5 7.6c-51.7-7.9-149.3 1.1-219.4 67.5C91.73 113 75.93 132 63.51 154.1C5.036 258.4 43.62 394.3 150.4 457.6C257 520.8 390.1 487.3 448.5 383c48.1-85.5 30.6-192.7-36.4-263.2c-7.9-3.5-16.1-6.1-24.4-5.9c1.7 1.4 3.1 2.7 4.7 4.1l-12.6 13.9c-2.3-2.2-5-4.6-7.2-6.3c-1.3 4.3-1.6 10.1-.2 17.3c42.4 51.9 55 135.2 23.8 191.2c-38.7 69.3-128.2 93.7-197.5 52.3c-69.4-41.3-85.6-127.1-46.9-196.4c23.7-42.5 68.2-66.4 112.1-66.2c10.4 0 20.8 1.4 30.8 4.3c-3.9-12.9-6-24.2-8.1-36.77l6.2-3.1c9.4-4.7 17.7-11.6 25.2-20.5l-5.6-.7l2.4-18.6c4.1.51 8.1 1.1 12.2 1.7l-1.1 6.9c5.2 3.14 10.6 6.44 16 9.7c-9.4 14.3-20.7 26.4-34.4 34.67c2.7 14 7.5 30.6 15.4 46.5c14.2 26.1 32.9 50.5 59.1 53.9c-14-17.6-22.8-34.6-26.8-50c-4.5-17.3-3.1-33.2 6.1-44.3c6.8-8.27 17.5-12.37 29.7-12.07c4.1.1 8.3.6 12.7 1.6c16.5 3.97 35.5 14.47 56.8 32.47c8.2-10.5 9.8-23 7.6-37.07c-31.5-9.2-45.4-70.8-102.3-70.zm2.9 16.4c4.4.1 9.4 1.2 14.4 3.3c13 5.4 21.5 15.8 18.9 23.1c-2.6 7.3-15.3 8.8-28.4 3.3c-13.1-5.5-21.6-15.8-19-23.1c1.5-4.1 6.2-6.4 12.3-6.6zm-73.4 8l-.7 18.7c-6-.36-12.1-.6-18.1-.3l-.5-18.6c6.4-.27 12.9-.1 19.3.2zm-38.6 1l1.8 18.6c-6.3.78-12.2 1.29-17.6 2.5l-3.5-18.4c6.9-.99 12.8-2.16 19.3-2.6zm-38 7.29l4.6 17.81c-6.1 1.64-11 3.3-16.9 5.4l-6.5-17.5c7.9-2.65 11.8-4.19 18.8-5.71zm-36.9 13.31l8.2 16.8c-5.5 2.62-11.4 5.72-16 8.4l-9.3-16.2c5.8-3.17 11.9-6.32 17.1-9zM159 103.3c-5.4 3.9-9.3 7-14 10.9L132.9 100c5-4.5 10.9-8.79 15.4-12.27c3.2 5.27 7.1 10.45 10.7 15.57zm-40.4 10l13.3 13.1c-4.2 4.5-8.6 9.2-11.9 13.3l-14.5-11.9c4.2-5.2 9.2-10.6 13.1-14.5zm287.7 18.4c4.4 4.9 9.1 10.3 12.6 14.9L404.1 158c-3.7-4.8-8-9.7-11.6-13.6zM93.76 143.4L109.1 154c-3.4 5.1-6.7 10.6-9.41 15.1l-16.25-9.2c3.29-5.7 6.87-11.8 10.32-16.5zm336.34 19.2c3.6 5.6 7.1 11.9 9.6 17.1l-16.6 8.4c-3-5.8-5.6-10.4-8.8-15.5zM74.6 177.3l16.99 7.8c-2.53 5.7-4.93 11.7-6.66 16.5l-17.6-6.2c1.65-6.4 3.64-12.6 7.27-18.1zm373 20.3l.1.1v.1c2.2 6.1 4.4 12.3 5.9 18.6l-18 4.7c-1.8-5.9-3.6-11.9-5.5-16.9c5.9-2 11.7-4.3 17.5-6.6zM61.67 214l18.08 4.7c-1.45 6-2.71 12.3-3.6 17.5l-18.42-3.1c1.24-6.7 2.44-13.7 3.94-19.1zm396.03 21.5c.6 6.7 1.6 13.6 2 19.6l-18.6 1c-.3-5.8-1.1-11.6-1.8-17.4c5.6-1.2 12.4-2.2 18.4-3.2zM55.52 252.7l18.41 1c-.51 6 0 11.9 0 17.9l-18.67.7c-.15-6.8 0-13.8.26-19.6zm385.68 21.1l18.7 1c-.4 7.4-.9 12.7-1.8 19.5l-18.5-2.5c.9-6 1.3-12 1.6-18zm-362.73 33l-18.19 4.3c-1.51-6.3-2.45-12.8-3.32-19.2l18.52-2.5c.47 5.7 1.81 12.4 2.99 17.4zm357.83 2.3l18.2 4.3c-1.4 6.4-3.2 12.5-5.2 18.7v.1l-.1.1c-5.9-2.1-11.8-4-17.7-5.9v-.2c1.9-5.6 3.6-11.3 4.8-17.1zM83.39 323.8c2.16 6.2 4.23 11.1 6.62 16.5l-16.94 7.8c-2.96-5.8-5.04-12-7.17-18.2c5.61-2 12.5-4.2 17.49-6.1zm341.71 19.3l17.2 7.3c-2.8 6.7-5.6 11.8-8.5 17.6l-16.4-8.9c2.9-5.2 5.5-11.2 7.7-16zM98.28 355.9c3.22 5.2 6.52 10.7 9.82 14.8l-14.98 11.2c-4.1-5.6-8.23-11.6-11.13-16.4c4.67-3.5 10.88-6.7 16.29-9.6zm310.02 18.5l15.5 10.4c-4.1 6.1-7.1 10.4-11.3 15.7L397.8 389c3.7-4.7 7.1-9.6 10.5-14.6zm-288.9 10c4 4.5 8.3 8.7 12.6 12.8l-12.7 13.7c-4.8-4.5-9.8-9.6-13.8-13.8zm266.7 18l13.6 12.9c-5.1 5.2-9.3 9.4-14.2 13.6l-12.2-14.1c4.5-4.2 9.2-8.5 12.8-12.4zm-240.5 6.2c4.7 3.6 9.6 7.1 14.7 10.4l-10.2 15.7c-5.5-3.5-10.6-7.3-15.8-11.2zm213.8 17.2l10.7 15.3c-5.4 3.8-11.3 7.6-16.3 10.5l-9.4-16.2c5.8-3.3 9.8-6 15-9.6zm-183.6 2.4c5.2 3 10.6 5.6 16.1 8.1l-7.9 17c-5.8-2.8-11.6-5.6-17.3-8.7zm152.8 15.1l7.5 17.1c-6 2.8-12.2 4.9-18.5 6.9l-5.5-17.9c5.6-1.6 11.1-3.7 16.5-6.1zm-120 .1c5.8 2.2 11.8 4.2 16.8 5.8l-5.2 18c-6.4-2.1-13-4.2-18.5-6.5c2.3-5.7 4.7-12 6.9-17.3zm34 10c6 1.1 12.1 1.8 17.4 2.2l-1 18.7c-6.8-.9-13.8-1.4-19.8-2.5zm52.4.2l3.3 18.4c-6.6 1.6-12.6 2.3-19.7 2.3l-.9-18.6c5.8-.3 11.5-1.2 17.3-2.1z"/></svg>`;
const volumeIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M64 96v64a8 8 0 0 1-8 8h-8a8 8 0 0 1-8-8V96a8 8 0 0 1 8-8h8a8 8 0 0 1 8 8Zm32-72h-8a8 8 0 0 0-8 8v192a8 8 0 0 0 8 8h8a8 8 0 0 0 8-8V32a8 8 0 0 0-8-8Zm40 32h-8a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h8a8 8 0 0 0 8-8V64a8 8 0 0 0-8-8Zm40 32h-8a8 8 0 0 0-8 8v64a8 8 0 0 0 8 8h8a8 8 0 0 0 8-8V96a8 8 0 0 0-8-8Zm40-16h-8a8 8 0 0 0-8 8v96a8 8 0 0 0 8 8h8a8 8 0 0 0 8-8V80a8 8 0 0 0-8-8Z"/></svg>`;
const muteIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M60 96v64a12 12 0 0 1-24 0V96a12 12 0 0 1 24 0m-3.12-64.07a12 12 0 1 0-17.76 16.14L76 88.64V224a12 12 0 0 0 24 0V115l16 17.6V192a12 12 0 0 0 24 0v-33l59.12 65a12 12 0 0 0 17.76-16.14ZM128 80.54a12 12 0 0 0 12-12V64a12 12 0 0 0-24 0v4.54a12 12 0 0 0 12 12m40 44a12 12 0 0 0 12-12V96a12 12 0 0 0-24 0v16.54a12 12 0 0 0 12 12M208 68a12 12 0 0 0-12 12v76.54a12 12 0 0 0 24 0V80a12 12 0 0 0-12-12"/></svg>`;

// --- Lógica de Arrastre (sin cambios) ---
let isDragging = false;
let initialTx, initialTy, mousePressX, mousePressY;
function onDragStart(e) { /* ... */ }
function onDragMove(e) { /* ... */ }
function onDragEnd(e) { /* ... */ }
onDragStart = function(e) { if (e.target.closest('button') || e.target.closest('input[type="range"]')) return; isDragging = true; mousePressX = e.clientX; mousePressY = e.clientY; const t = new DOMMatrix(window.getComputedStyle(miniPlayerContainer).transform); initialTx = t.m41; initialTy = t.m42; miniPlayerContainer.style.transition = 'none'; window.addEventListener('mousemove', onDragMove, { passive: false }); window.addEventListener('mouseup', onDragEnd, { once: true }); };
onDragMove = function(e) { if (!isDragging) return; e.preventDefault(); const t = e.clientX - mousePressX, n = e.clientY - mousePressY; miniPlayerContainer.style.transform = `translate(${initialTx+t}px, ${initialTy+n}px)`; };
onDragEnd = function(e) { if (!isDragging) return; isDragging = false; const t = miniPlayerContainer.getBoundingClientRect(); miniPlayerContainer.style.left = `${t.left}px`; miniPlayerContainer.style.top = `${t.top}px`; miniPlayerContainer.style.transform = 'none'; miniPlayerContainer.style.transition = 'opacity 0.3s ease-out'; window.removeEventListener('mousemove', onDragMove); };


// --- Lógica de Utilidad ---
function formatTime(seconds) { if (isNaN(seconds)) return '0:00'; const minutes = Math.floor(seconds / 60); const secs = Math.floor(seconds % 60); return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; }
const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        const { width, height } = entry.contentRect;
        miniPlayerContainer.classList.toggle('is-bar-mode', width / height > 1.8);
    }
});
function updateRangeFill(input) { if (!input) return; const value = (input.value - input.min) / (input.max - input.min) * 100; input.style.background = `linear-gradient(to right, #ffffff ${value}%, #535353 ${value}%)`; }


export function initMiniPlayer(localState) {
    
    // --- Lógica de UI interna ---
    function updateMiniPlayerProgress() {
        if (!localState || !localState.isPlaying || !miniPlayerContainer.classList.contains('visible')) {
            animationFrameId = null;
            return;
        }
        const currentTrack = localState.track;
        if (currentTrack && currentTrack.duration > 0) {
            const progressPercent = (localState.currentTime / currentTrack.duration) * 100;
            if(progressBarFg) progressBarFg.style.width = `${progressPercent}%`;
            if(progressBarFgBar) progressBarFgBar.style.width = `${progressPercent}%`;
        } else {
            if(progressBarFg) progressBarFg.style.width = '0%';
            if(progressBarFgBar) progressBarFgBar.style.width = '0%';
        }
        animationFrameId = requestAnimationFrame(updateMiniPlayerProgress);
    }
    
    function syncButtonsUI() {
        if (!localState) return;
        [shuffleBtn, shuffleBtnBar].forEach(btn => btn?.classList.toggle('active-icon', localState.isShuffled));
        [repeatBtn, repeatBtnBar].forEach(btn => {
            if (!btn) return;
            btn.classList.remove('active-icon', 'amber-icon');
            if (localState.repeatState === 1) btn.classList.add('active-icon');
            else if (localState.repeatState === 2) btn.classList.add('amber-icon');
        });
        const isMuted = localState.volume === 0 || localState.isMuted;
        [volumeBtn, volumeBtnBar].forEach(btn => {
            if (btn) btn.innerHTML = isMuted ? muteIconSVG : volumeIconSVG;
        });
    }

    function update() {
        if (!miniPlayerContainer || !localState) return;
        const currentTrack = localState.track;
        if (currentTrack) {
            mainCoverArt.src = currentTrack.cover;
            bgCover.style.backgroundImage = `url('${currentTrack.cover}')`;
            mpTotalTime.textContent = formatTime(currentTrack.duration);
            titleEl.textContent = currentTrack.title;
            artistEl.textContent = currentTrack.artist;
            coverBar.src = currentTrack.cover;
            titleBar.textContent = currentTrack.title;
            artistBar.textContent = currentTrack.artist;
            if (currentTrack.duration > 0) {
                const progressPercent = (localState.currentTime / currentTrack.duration) * 100;
                progressBarFg.style.width = `${progressPercent}%`;
                progressBarFgBar.style.width = `${progressPercent}%`;
                mpCurrentTime.textContent = formatTime(localState.currentTime);
            } else {
                progressBarFg.style.width = '0%';
                progressBarFgBar.style.width = '0%';
                mpCurrentTime.textContent = formatTime(0);
            }
        } else {
            mainCoverArt.src = 'https://placehold.co/320x320/121212/808080?text=...';
            bgCover.style.backgroundImage = 'none';
            mpTotalTime.textContent = '0:00';
            titleEl.textContent = 'Título no disponible';
            artistEl.textContent = '...';
            coverBar.src = 'https://placehold.co/80x80/121212/808080?text=...';
            titleBar.textContent = 'No hay nada en reproducción';
            artistBar.textContent = '...';
            progressBarFg.style.width = '0%';
            progressBarFgBar.style.width = '0%';
            mpCurrentTime.textContent = formatTime(0);
        }
        playIcon.classList.toggle('hidden', localState.isPlaying);
        pauseIcon.classList.toggle('hidden', !localState.isPlaying);
        playIconBar.classList.toggle('hidden', localState.isPlaying);
        pauseIconBar.classList.toggle('hidden', !localState.isPlaying);
        volumeBar.value = localState.volume * 100;
        globalVolumeBar.value = localState.volume * 100;
        updateRangeFill(volumeBar);
        updateRangeFill(globalVolumeBar);
        syncButtonsUI();
        if (localState.isPlaying && !animationFrameId) {
            animationFrameId = requestAnimationFrame(updateMiniPlayerProgress);
        }
    }

    // --- Cache de elementos del DOM ---
    miniPlayerContainer = document.getElementById('mini-player-container');
    dragHandle = document.getElementById('mp-drag-handle');
    closeBtn = document.getElementById('mp-close-btn');
    mainCoverArt = document.getElementById('mp-cover-art-main');
    bgCover = document.getElementById('mp-bg-cover');
    titleEl = document.getElementById('mp-title');
    artistEl = document.getElementById('mp-artist');
    playPauseBtn = document.getElementById('mp-play-pause-btn');
    playIcon = document.getElementById('mp-play-icon');
    pauseIcon = document.getElementById('mp-pause-icon');
    prevBtn = document.getElementById('mp-prev-btn');
    nextBtn = document.getElementById('mp-next-btn');
    shuffleBtn = document.getElementById('mp-shuffle-btn');
    repeatBtn = document.getElementById('mp-repeat-btn');
    volumeBtn = document.getElementById('mp-volume-btn');
    volumeBar = document.getElementById('mp-volume-bar');
    progressBarContainer = document.getElementById('mp-progress-container');
    progressBarFg = document.getElementById('mp-progress-bar-fg');
    mpCurrentTime = document.getElementById('mp-current-time');
    mpTotalTime = document.getElementById('mp-total-time');
    dragHandleBar = document.getElementById('mp-drag-handle-bar');
    closeBtnBar = document.getElementById('mp-close-btn-bar');
    playPauseBtnBar = document.getElementById('mp-play-pause-btn-bar');
    playIconBar = document.getElementById('mp-play-icon-bar');
    pauseIconBar = document.getElementById('mp-pause-icon-bar');
    prevBtnBar = document.getElementById('mp-prev-btn-bar');
    nextBtnBar = document.getElementById('mp-next-btn-bar');
    shuffleBtnBar = document.getElementById('mp-shuffle-btn-bar');
    repeatBtnBar = document.getElementById('mp-repeat-btn-bar');
    volumeBtnBar = document.getElementById('mp-volume-btn-bar');
    coverBar = document.getElementById('mp-cover-bar');
    titleBar = document.getElementById('mp-title-bar');
    artistBar = document.getElementById('mp-artist-bar');
    progressBarContainerBar = document.getElementById('mp-progress-container-bar');
    progressBarFgBar = document.getElementById('mp-progress-bar-fg-bar');
    globalVolumePopup = document.getElementById('global-volume-popup');
    globalVolumeBar = document.getElementById('global-volume-bar');

    // --- Inyectar SVGs en botones ---
    [shuffleBtn, shuffleBtnBar].forEach(btn => btn.innerHTML = shuffleIconSVG);
    [repeatBtn, repeatBtnBar].forEach(btn => btn.innerHTML = repeatIconSVG);
    [volumeBtn, volumeBtnBar].forEach(btn => btn.innerHTML = volumeIconSVG);
    
    // --- Asignar Event Listeners ---
    const returnToMain = () => window.electronAPI?.sendMessage('toggle-miniplayer');
    [closeBtn, closeBtnBar].forEach(btn => btn?.addEventListener('click', returnToMain));
    [dragHandle, dragHandleBar].forEach(btn => btn?.addEventListener('mousedown', onDragStart));
    
    [playPauseBtn, playPauseBtnBar].forEach(btn => btn?.addEventListener('click', () => window.electronAPI?.sendMessage('miniplayer-control-action', 'togglePlayPause')));
    [nextBtn, nextBtnBar].forEach(btn => btn?.addEventListener('click', () => window.electronAPI?.sendMessage('miniplayer-control-action', 'playNext')));
    [prevBtn, prevBtnBar].forEach(btn => btn?.addEventListener('click', () => window.electronAPI?.sendMessage('miniplayer-control-action', 'playPrev')));
    [shuffleBtn, shuffleBtnBar].forEach(btn => btn?.addEventListener('click', () => window.electronAPI?.sendMessage('miniplayer-control-action', 'toggleShuffle')));
    [repeatBtn, repeatBtnBar].forEach(btn => btn?.addEventListener('click', () => window.electronAPI?.sendMessage('miniplayer-control-action', 'cycleRepeatState')));
    [volumeBtn, volumeBtnBar].forEach(btn => btn?.addEventListener('click', () => window.electronAPI?.sendMessage('miniplayer-control-action', 'toggleMute')));
    
    [volumeBar, globalVolumeBar].forEach(bar => {
        bar?.addEventListener('input', (e) => {
            const newVolume = e.target.value / 100;
            window.electronAPI?.sendMessage('miniplayer-control-action', { type: 'setVolume', value: newVolume });
            updateRangeFill(e.target);
        });
    });

    [progressBarContainer, progressBarContainerBar].forEach(container => {
        container?.addEventListener('click', (e) => {
            const rect = container.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            if (width > 0) {
                const percentage = (clickX / width) * 100;
                window.electronAPI?.sendMessage('miniplayer-control-action', { type: 'seekTo', value: percentage });
            }
        });
    });

    // --- Lógica para el pop-up de volumen global ---
    const showVolumePopup = () => { /* ... sin cambios ... */ };
    const hideVolumePopup = () => { /* ... sin cambios ... */ };
    showVolumePopup = () => { clearTimeout(volumePopupTimeout); const rect = volumeBtnBar.getBoundingClientRect(); globalVolumePopup.style.left = `${rect.left+rect.width/2}px`; globalVolumePopup.style.top = `${rect.top}px`; globalVolumePopup.style.transform = `translate(-50%, -100%) translateY(-12px)`; globalVolumePopup.classList.remove('hidden'); };
    hideVolumePopup = () => { volumePopupTimeout = setTimeout(() => { globalVolumePopup.classList.add('hidden'); }, 250); };
    volumeBtnBar.addEventListener('mouseenter', showVolumePopup);
    volumeBtnBar.addEventListener('mouseleave', hideVolumePopup);
    globalVolumePopup.addEventListener('mouseenter', () => clearTimeout(volumePopupTimeout));
    globalVolumePopup.addEventListener('mouseleave', hideVolumePopup);

    resizeObserver.observe(miniPlayerContainer);
    updateRangeFill(volumeBar);
    updateRangeFill(globalVolumeBar);
    
    console.log('Módulo del Mini-Reproductor inicializado y escuchando.');
    
    return { update };
}
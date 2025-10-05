// src/js/player.js
// ELIMINAMOS el updateQueueCallback de los argumentos
export function initPlayer(audioPlayer, appState, updateSidebarCallback, updateMainViewCallback) {
    
    // ... (El resto de los íconos y la configuración inicial no cambia) ...
    const diceIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" d="M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37Z"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" d="m69 153.99l187 110l187-110m-187 310v-200"/><ellipse cx="256" cy="152" fill="currentColor" rx="16" ry="10"/><ellipse cx="208" cy="296" fill="currentColor" rx="10" ry="16"/><ellipse cx="112" cy="328" fill="currentColor" rx="10" ry="16"/><ellipse cx="304" cy="296" fill="currentColor" rx="10" ry="16"/><ellipse cx="400" cy="240" fill="currentColor" rx="10" ry="16"/><ellipse cx="304" cy="384" fill="currentColor" rx="10" ry="16"/><ellipse cx="400" cy="328" fill="currentColor" rx="10" ry="16"/></svg>`;
    const ouroborosIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M365.8 22.43c-10.6.2-22.6 2.5-36.5 7.6c-51.7-7.9-149.3 1.1-219.4 67.5C91.73 113 75.93 132 63.51 154.1C5.036 258.4 43.62 394.3 150.4 457.6C257 520.8 390.1 487.3 448.5 383c48.1-85.5 30.6-192.7-36.4-263.2c-7.9-3.5-16.1-6.1-24.4-5.9c1.7 1.4 3.1 2.7 4.7 4.1l-12.6 13.9c-2.3-2.2-5-4.6-7.2-6.3c-1.3 4.3-1.6 10.1-.2 17.3c42.4 51.9 55 135.2 23.8 191.2c-38.7 69.3-128.2 93.7-197.5 52.3c-69.4-41.3-85.6-127.1-46.9-196.4c23.7-42.5 68.2-66.4 112.1-66.2c10.4 0 20.8 1.4 30.8 4.3c-3.9-12.9-6-24.2-8.1-36.77l6.2-3.1c9.4-4.7 17.7-11.6 25.2-20.5l-5.6-.7l2.4-18.6c4.1.51 8.1 1.1 12.2 1.7l-1.1 6.9c5.2 3.14 10.6 6.44 16 9.7c-9.4 14.3-20.7 26.4-34.4 34.67c2.7 14 7.5 30.6 15.4 46.5c14.2 26.1 32.9 50.5 59.1 53.9c-14-17.6-22.8-34.6-26.8-50c-4.5-17.3-3.1-33.2 6.1-44.3c6.8-8.27 17.5-12.37 29.7-12.07c4.1.1 8.3.6 12.7 1.6c16.5 3.97 35.5 14.47 56.8 32.47c8.2-10.5 9.8-23 7.6-37.07c-31.5-9.2-45.4-70.8-102.3-70zm2.9 16.4c4.4.1 9.4 1.2 14.4 3.3c13 5.4 21.5 15.8 18.9 23.1c-2.6 7.3-15.3 8.8-28.4 3.3c-13.1-5.5-21.6-15.8-19-23.1c1.5-4.1 6.2-6.4 12.3-6.6zm-73.4 8l-.7 18.7c-6-.36-12.1-.6-18.1-.3l-.5-18.6c6.4-.27 12.9-.1 19.3.2zm-38.6 1l1.8 18.6c-6.3.78-12.2 1.29-17.6 2.5l-3.5-18.4c6.9-.99 12.8-2.16 19.3-2.6zm-38 7.29l4.6 17.81c-6.1 1.64-11 3.3-16.9 5.4l-6.5-17.5c7.9-2.65 11.8-4.19 18.8-5.71zm-36.9 13.31l8.2 16.8c-5.5 2.62-11.4 5.72-16 8.4l-9.3-16.2c5.8-3.17 11.9-6.32 17.1-9zM159 103.3c-5.4 3.9-9.3 7-14 10.9L132.9 100c5-4.5 10.9-8.79 15.4-12.27c3.2 5.27 7.1 10.45 10.7 15.57zm-40.4 10l13.3 13.1c-4.2 4.5-8.6 9.2-11.9 13.3l-14.5-11.9c4.2-5.2 9.2-10.6 13.1-14.5zm287.7 18.4c4.4 4.9 9.1 10.3 12.6 14.9L404.1 158c-3.7-4.8-8-9.7-11.6-13.6zM93.76 143.4L109.1 154c-3.4 5.1-6.7 10.6-9.41 15.1l-16.25-9.2c3.29-5.7 6.87-11.8 10.32-16.5zm336.34 19.2c3.6 5.6 7.1 11.9 9.6 17.1l-16.6 8.4c-3-5.8-5.6-10.4-8.8-15.5zM74.6 177.3l16.99 7.8c-2.53 5.7-4.93 11.7-6.66 16.5l-17.6-6.2c1.65-6.4 3.64-12.6 7.27-18.1zm373 20.3l.1.1v.1c2.2 6.1 4.4 12.3 5.9 18.6l-18 4.7c-1.8-5.9-3.6-11.9-5.5-16.9c5.9-2 11.7-4.3 17.5-6.6zM61.67 214l18.08 4.7c-1.45 6-2.71 12.3-3.6 17.5l-18.42-3.1c1.24-6.7 2.44-13.7 3.94-19.1zm396.03 21.5c.6 6.7 1.6 13.6 2 19.6l-18.6 1c-.3-5.8-1.1-11.6-1.8-17.4c5.6-1.2 12.4-2.2 18.4-3.2zM55.52 252.7l18.41 1c-.51 6 0 11.9 0 17.9l-18.67.7c-.15-6.8 0-13.8.26-19.6zm385.68 21.1l18.7 1c-.4 7.4-.9 12.7-1.8 19.5l-18.5-2.5c.9-6 1.3-12 1.6-18zm-362.73 33l-18.19 4.3c-1.51-6.3-2.45-12.8-3.32-19.2l18.52-2.5c.47 5.7 1.81 12.4 2.99 17.4zm357.83 2.3l18.2 4.3c-1.4 6.4-3.2 12.5-5.2 18.7v.1l-.1.1c-5.9-2.1-11.8-4-17.7-5.9v-.2c1.9-5.6 3.6-11.3 4.8-17.1zM83.39 323.8c2.16 6.2 4.23 11.1 6.62 16.5l-16.94 7.8c-2.96-5.8-5.04-12-7.17-18.2c5.61-2 12.5-4.2 17.49-6.1zm341.71 19.3l17.2 7.3c-2.8 6.7-5.6 11.8-8.5 17.6l-16.4-8.9c2.9-5.2 5.5-11.2 7.7-16zM98.28 355.9c3.22 5.2 6.52 10.7 9.82 14.8l-14.98 11.2c-4.1-5.6-8.23-11.6-11.13-16.4c4.67-3.5 10.88-6.7 16.29-9.6zm310.02 18.5l15.5 10.4c-4.1 6.1-7.1 10.4-11.3 15.7L397.8 389c3.7-4.7 7.1-9.6 10.5-14.6zm-288.9 10c4 4.5 8.3 8.7 12.6 12.8l-12.7 13.7c-4.8-4.5-9.8-9.6-13.8-13.8zm266.7 18l13.6 12.9c-5.1 5.2-9.3 9.4-14.2 13.6l-12.2-14.1c4.5-4.2 9.2-8.5 12.8-12.4zm-240.5 6.2c4.7 3.6 9.6 7.1 14.7 10.4l-10.2 15.7c-5.5-3.5-10.6-7.3-15.8-11.2zm213.8 17.2l10.7 15.3c-5.4 3.8-11.3 7.6-16.3 10.5l-9.4-16.2c5.8-3.3 9.8-6 15-9.6zm-183.6 2.4c5.2 3 10.6 5.6 16.1 8.1l-7.9 17c-5.8-2.8-11.6-5.6-17.3-8.7zm152.8 15.1l7.5 17.1c-6 2.8-12.2 4.9-18.5 6.9l-5.5-17.9c5.6-1.6 11.1-3.7 16.5-6.1zm-120 .1c5.8 2.2 11.8 4.2 16.8 5.8l-5.2 18c-6.4-2.1-13-4.2-18.5-6.5c2.3-5.7 4.7-12 6.9-17.3zm34 10c6 1.1 12.1 1.8 17.4 2.2l-1 18.7c-6.8-.9-13.8-1.4-19.8-2.5zm52.4.2l3.3 18.4c-6.6 1.6-12.6 2.3-19.7 2.3l-.9-18.6c5.8-.3 11.5-1.2 17.3-2.1z"/></svg>`;
    const equalizerIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M992 1024H32q-13 0-22.5-9.5T0 992t9.5-22.5T32 960h960q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5zm-64-128h-64q-13 0-22.5-9.5T832 864v-64q0-13 9.5-22.5T864 768h64q13 0 22.5 9.5T960 800v64q0 13-9.5 22.5T928 896zm0-192h-64q-13 0-22.5-9.5T832 672v-64q0-13 9.5-22.5T864 576h64q13 0 22.5 9.5T960 608v64q0 13-9.5 22.5T928 704zm0-192h-64q-13 0-22.5-9.5T832 480v-64q0-13 9.5-22.5T864 384h64q13 0 22.5 9.5T960 416v64q0 13-9.5 22.5T928 512zM736 896h-64q-13 0-22.5-9.5T640 864v-64q0-13 9.5-22.5T672 768h64q13 0 22.5 9.5T768 800v64q0 13-9.5 22.5T736 896zm0-192h-64q-13 0-22.5-9.5T640 672v-64q0-13 9.5-22.5T672 576h64q13 0 22.5 9.5T768 608v64q0 13-9.5 22.5T736 704zm0-192h-64q-13 0-22.5-9.5T640 480v-64q0-13 9.5-22.5T672 384h64q13 0 22.5 9.5T768 416v64q0 13-9.5 22.5T736 512zm0-192h-64q-13 0-22.5-9.5T640 288v-64q0-13 9.5-22.5T672 192h64q13 0 22.5 9.5T768 224v64q0 13-9.5 22.5T736 320zm0-192h-64q-13 0-22.5-9.5T640 96V32q0-13 9.5-22.5T672 0h64q13 0 22.5 9.5T768 32v64q0 13-9.5 22.5T736 128zM544 896h-64q-13 0-22.5-9.5T448 864v-64q0-13 9.5-22.5T480 768h64q13 0 22.5 9.5T576 800v64q0 13-9.5 22.5T544 896zm0-192h-64q-13 0-22.5-9.5T448 672v-64q0-13 9.5-22.5T480 576h64q13 0 22.5 9.5T576 608v64q0 13-9.5 22.5T544 704zm0-192h-64q-13 0-22.5-9.5T448 480v-64q0-13 9.5-22.5T480 384h64q13 0 22.5 9.5T576 416v64q0 13-9.5 22.5T544 512zm0-192h-64q-13 0-22.5-9.5T448 288v-64q0-13 9.5-22.5T480 192h64q13 0 22.5 9.5T576 224v64q0 13-9.5 22.5T544 320zM352 896h-64q-13 0-22.5-9.5T256 864v-64q0-13 9.5-22.5T288 768h64q13 0 22.5 9.5T384 800v64q0 13-9.5 22.5T352 896zm0-192h-64q-13 0-22.5-9.5T256 672v-64q0-13 9.5-22.5T288 576h64q13 0 22.5 9.5T384 608v64q0 13-9.5 22.5T352 704zM160 896H96q-13 0-22.5-9.5T64 864v-64q0-13 9.5-22.5T96 768h64q13 0 22.5 9.5T192 800v64q0 13-9.5 22.5T160 896zm0-192H96q-13 0-22.5-9.5T64 672v-64q0-13 9.5-22.5T96 576h64q13 0 22.5 9.5T192 608v64q0 13-9.5 22.5T160 704zm0-192H96q-13 0-22.5-9.5T64 480v-64q0-13 9.5-22.5T96 384h64q13 0 22.5 9.5T192 416v64q0 13-9.5 22.5T160 512zm0-192H96q-13 0-22.5-9.5T64 288v-64q0-13 9.5-22.5T96 192h64q13 0 22.5 9.5T192 224v64q0 13-9.5 22.5T160 320z"/></svg>`;
    const queueIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.784 19q-.996 0-1.688-.69t-.692-1.675q0-1.002.695-1.703q.696-.701 1.69-.701q.384 0 .733.143q.35.143.651.384V7H21v1.462h-2.827v8.173q0 .985-.697 1.675q-.697.69-1.692.69ZM4 14.77v-1h7.038v1H4Zm0-3.385v-1h10.788v1H4ZM4 8V7h10.788v1H4Z"/></svg>`;
    const volumeIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M64 96v64a8 8 0 0 1-8 8h-8a8 8 0 0 1-8-8V96a8 8 0 0 1 8-8h8a8 8 0 0 1 8 8Zm32-72h-8a8 8 0 0 0-8 8v192a8 8 0 0 0 8 8h8a8 8 0 0 0 8-8V32a8 8 0 0 0-8-8Zm40 32h-8a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h8a8 8 0 0 0 8-8V64a8 8 0 0 0-8-8Zm40 32h-8a8 8 0 0 0-8 8v64a8 8 0 0 0 8 8h8a8 8 0 0 0 8-8V96a8 8 0 0 0-8-8Zm40-16h-8a8 8 0 0 0-8 8v96a8 8 0 0 0 8 8h8a8 8 0 0 0 8-8V80a8 8 0 0 0-8-8Z"/></svg>`;
    const muteIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M60 96v64a12 12 0 0 1-24 0V96a12 12 0 0 1 24 0m-3.12-64.07a12 12 0 1 0-17.76 16.14L76 88.64V224a12 12 0 0 0 24 0V115l16 17.6V192a12 12 0 0 0 24 0v-33l59.12 65a12 12 0 0 0 17.76-16.14ZM128 80.54a12 12 0 0 0 12-12V64a12 12 0 0 0-24 0v4.54a12 12 0 0 0 12 12m40 44a12 12 0 0 0 12-12V96a12 12 0 0 0-24 0v16.54a12 12 0 0 0 12 12M208 68a12 12 0 0 0-12 12v76.54a12 12 0 0 0 24 0V80a12 12 0 0 0-12-12"/></svg>`;
    
    let audioContext;
    let sourceNode;
    let gainNode;
    let eqBands = [];
    const frequencies = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
    
    // ... (El resto de las declaraciones de variables no cambia) ...
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const volumeBar = document.getElementById('volume-bar');
    const volumeBtn = document.getElementById('volume-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const eqBtn = document.getElementById('eq-btn');
    const queueBtn = document.getElementById('queue-btn');
    const equalizerPanel = document.getElementById('equalizer-panel');
    const queuePanel = document.getElementById('queue-panel');
    const eqBandsContainer = document.getElementById('eq-bands');
    const eqResetBtn = document.getElementById('eq-reset-btn');
    const nextInQueueContainer = document.getElementById('next-in-queue-container');
    const nextTrackImg = document.getElementById('next-track-img');
    const nextTrackTitle = document.getElementById('next-track-title');
    const nextTrackArtist = document.getElementById('next-track-artist');

    let lastSaveTime = 0;

    function triggerSVGAnimation(element) {
        if (!element) return;
        const firstAnimation = element.querySelector('animate[begin="indefinite"]');
        if (firstAnimation && typeof firstAnimation.beginElement === 'function') {
            firstAnimation.beginElement();
        }
    }

    function setupAudioContextAndEQ() {
        if (audioContext) return; 

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        sourceNode = audioContext.createMediaElementSource(audioPlayer);
        gainNode = audioContext.createGain();
        eqBands = frequencies.map((freq, i) => {
            const filter = audioContext.createBiquadFilter();
            filter.type = 'peaking';
            filter.frequency.value = freq;
            filter.Q.value = 1.41;
            filter.gain.value = appState.eq[i] || 0;
            return filter;
        });
        sourceNode.connect(eqBands[0]);
        for (let i = 0; i < eqBands.length - 1; i++) {
            eqBands[i].connect(eqBands[i + 1]);
        }
        eqBands[eqBands.length - 1].connect(gainNode);
        gainNode.connect(audioContext.destination);
        renderEQBands();
    }

    function renderEQBands() {
        // ... (Esta función no cambia) ...
        const titleEl = equalizerPanel.querySelector('h3');
        if (titleEl) titleEl.remove();
        eqBandsContainer.innerHTML = '';
        const bandsWrapper = document.createElement('div');
        bandsWrapper.id = 'eq-bands-wrapper';
        const gainLabels = document.createElement('div');
        gainLabels.className = 'eq-gain-labels';
        gainLabels.innerHTML = `<span>+12</span><span>+6</span><span>0</span><span>-6</span><span>-12</span>`;
        bandsWrapper.appendChild(gainLabels);
        const slidersWrapper = document.createElement('div');
        slidersWrapper.className = 'eq-sliders-wrapper';
        frequencies.forEach((freq, index) => {
            const container = document.createElement('div');
            container.className = 'eq-slider-container';
            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = -12;
            slider.max = 12;
            slider.step = 0.1;
            slider.value = appState.eq[index] || 0;
            slider.className = 'eq-slider';
            const valueInput = document.createElement('input');
            valueInput.type = 'text';
            valueInput.className = 'eq-value-input';
            valueInput.value = parseFloat(slider.value).toFixed(1);
            slider.addEventListener('input', (e) => {
                const newGain = parseFloat(e.target.value);
                eqBands[index].gain.value = newGain;
                appState.eq[index] = newGain;
                valueInput.value = newGain.toFixed(1);
                appState.settingsControls.save(appState);
            });
            valueInput.addEventListener('change', (e) => {
                let newValue = parseFloat(e.target.value);
                if (isNaN(newValue)) newValue = 0;
                newValue = Math.max(-12, Math.min(12, newValue));
                e.target.value = newValue.toFixed(1);
                slider.value = newValue;
                eqBands[index].gain.value = newValue;
                appState.eq[index] = newValue;
                appState.settingsControls.save(appState);
            });
            const freqLabel = document.createElement('span');
            freqLabel.className = 'eq-freq-label';
            freqLabel.textContent = freq < 1000 ? `${freq}` : `${freq/1000}k`;
            container.appendChild(slider);
            container.appendChild(valueInput);
            container.appendChild(freqLabel);
            slidersWrapper.appendChild(container);
        });
        bandsWrapper.appendChild(slidersWrapper);
        eqBandsContainer.appendChild(bandsWrapper);
    }
    
    function playTrackInternal(track) {
        if (!track) return;
        if (!audioContext) {
            setupAudioContextAndEQ();
        }
        audioPlayer.src = URL.createObjectURL(track.file);
        audioPlayer.play().catch(e => console.error("Error al reproducir:", e));
        
        if (updateSidebarCallback) {
            updateSidebarCallback(track);
        }
        if (updateMainViewCallback) {
            updateMainViewCallback(track.id);
        }
        // --- ARREGLO: LLAMADA DIRECTA A LA COLA A TRAVÉS DEL appState ---
        if (appState.queueControls) {
            appState.queueControls.renderQueue(appState);
        }
        
        appState.isPlaying = true;
        updatePlayPauseIcon();
        updateNextInQueueCard();
    }

    function getNextTrack(direction = 1) {
        // ... (Esta función no cambia) ...
        if (direction === 1 && appState.playQueue.length > 0) {
            const nextTrackInQueue = appState.playQueue.shift();
            if (appState.queueControls) {
                appState.queueControls.renderQueue(appState, true);
            }
            return { track: nextTrackInQueue, newIndex: -1 };
        }

        if (!appState.playingContext || !appState.playingContext.path) {
            return { track: null, newIndex: -1 };
        }

        const validOriginalTracks = (appState.playingContext.originalTracks || []).filter(t => t);
        if (validOriginalTracks.length === 0) return { track: null, newIndex: -1 };
        
        let currentPlaylist = (appState.isShuffled ? appState.shuffledPlaylist : appState.playingContext.tracks || []).filter(t => t);
        if (currentPlaylist.length === 0) return { track: null, newIndex: -1 };

        const currentTrack = validOriginalTracks[appState.playingContext.trackIndex];
        if (!currentTrack) return { track: null, newIndex: -1 };
        
        let currentIndexInList = currentPlaylist.findIndex(t => t && t.id === currentTrack.id);
        
        if (currentIndexInList === -1) {
            if (currentPlaylist.length > 0) {
                 const nextTrack = direction === 1 ? currentPlaylist[0] : currentPlaylist[currentPlaylist.length - 1];
                 const newIndex = validOriginalTracks.findIndex(t => t && t.id === nextTrack.id);
                 return { track: nextTrack, newIndex };
            }
            return { track: null, newIndex: -1 };
        }

        let nextIndexInList = currentIndexInList + direction;

        if (nextIndexInList >= currentPlaylist.length) {
            if (appState.repeatState === 1) {
                nextIndexInList = 0;
            } else {
                return { track: null, newIndex: -1 };
            }
        }

        if (nextIndexInList < 0) {
            if (appState.repeatState === 1) {
                nextIndexInList = currentPlaylist.length - 1;
            } else {
                return { track: null, newIndex: -1 };
            }
        }
        
        const nextTrack = currentPlaylist[nextIndexInList];
        const newIndex = validOriginalTracks.findIndex(t => t && t.id === nextTrack.id);
        return { track: nextTrack, newIndex };
    }
    
    function getUpcomingTracks(limit = 10) {
        // ... (Esta función no cambia) ...
        let upcoming = [...appState.playQueue];
        if (!appState.playingContext || !appState.playingContext.path) {
            return upcoming.slice(0, limit);
        }

        const validOriginalTracks = (appState.playingContext.originalTracks || []).filter(t => t);
        if (validOriginalTracks.length === 0) return upcoming.slice(0, limit);
        
        let currentPlaylist = (appState.isShuffled ? appState.shuffledPlaylist : appState.playingContext.tracks || []).filter(t => t);
        if (currentPlaylist.length === 0) return upcoming.slice(0, limit);
        
        const currentTrack = validOriginalTracks[appState.playingContext.trackIndex];
        let currentIndex = currentTrack ? currentPlaylist.findIndex(t => t.id === currentTrack.id) : -1;

        if (currentIndex === -1) {
            currentIndex = -1;
        }
        
        for (let i = 1; i <= limit && upcoming.length < limit; i++) {
            let nextIndex = currentIndex + i;
            if (nextIndex >= currentPlaylist.length) {
                if (appState.repeatState === 1) {
                    nextIndex = nextIndex % currentPlaylist.length;
                } else {
                    break;
                }
            }
            upcoming.push(currentPlaylist[nextIndex]);
        }
        
        return upcoming.slice(0, limit);
    }

    function updateNextInQueueCard() {
        // ... (Esta función no cambia) ...
        const [nextTrack] = getUpcomingTracks(1);
        if (nextTrack && nextInQueueContainer) {
            nextTrackImg.src = nextTrack.cover;
            nextTrackTitle.textContent = nextTrack.title;
            nextTrackArtist.textContent = nextTrack.artist;
            nextInQueueContainer.classList.remove('hidden');
            nextInQueueContainer.classList.add('flex');
        } else if (nextInQueueContainer) {
            nextInQueueContainer.classList.add('hidden');
            nextInQueueContainer.classList.remove('flex');
        }
    }

    function playNext() {
        const { track, newIndex } = getNextTrack(1);
        if (track) {
            if (newIndex !== -1) appState.playingContext.trackIndex = newIndex;
            playTrackInternal(track);
        } else {
            appState.isPlaying = false;
            updatePlayPauseIcon();
            if (updateSidebarCallback) updateSidebarCallback(null);
            if (updateMainViewCallback) updateMainViewCallback(null);
            updateNextInQueueCard();
            // --- ARREGLO: LLAMADA DIRECTA A LA COLA A TRAVÉS DEL appState ---
            if (appState.queueControls) {
                appState.queueControls.renderQueue(appState);
            }
        }
    }

    function playPrev() {
        // ... (Esta función no cambia) ...
        const { track, newIndex } = getNextTrack(-1);
        if (track) {
            if (newIndex !== -1) appState.playingContext.trackIndex = newIndex;
            playTrackInternal(track);
        }
    }

    function handleSongEnd() {
        if (appState.repeatState === 2) {
            const currentTrack = appState.playingContext.originalTracks[appState.playingContext.trackIndex];
            playTrackInternal(currentTrack);
        } else {
            playNext();
        }
    }

    function togglePlayPause() {
        // ... (Esta función no cambia) ...
       if (!audioPlayer.src) return;
        if (appState.isPlaying) {
            audioPlayer.pause();
        } else {
            if (audioContext && audioContext.state === 'suspended') {
                audioContext.resume();
            }
            audioPlayer.play();
        }
        appState.isPlaying = !appState.isPlaying;
        updatePlayPauseIcon();
    }
    function toggleShuffle() {
       appState.isShuffled = !appState.isShuffled;
       shuffleBtn.classList.toggle('active-icon', appState.isShuffled);
       if (appState.isShuffled && appState.playingContext && appState.playingContext.tracks) {
           appState.shuffledPlaylist = [...appState.playingContext.tracks].sort(() => Math.random() - 0.5);
       }
       appState.settingsControls.save(appState); 
       triggerSVGAnimation(shuffleBtn);
       updateNextInQueueCard();
       // --- ARREGLO: LLAMADA DIRECTA A LA COLA A TRAVÉS DEL appState ---
       if (appState.queueControls) {
            appState.queueControls.renderQueue(appState);
       }
    }
    function cycleRepeatState() {
        appState.repeatState = (appState.repeatState + 1) % 3;
        appState.settingsControls.save(appState);
        updateRepeatUI();
        updateNextInQueueCard();
        // --- ARREGLO: LLAMADA DIRECTA A LA COLA A TRAVÉS DEL appState ---
        if (appState.queueControls) {
            appState.queueControls.renderQueue(appState);
        }
    }
    
    // ... (El resto de funciones como updateRepeatUI, updatePlayPauseIcon, etc., no cambian) ...
    function updateRepeatUI() {
        const state = appState.repeatState;
        const iconContainer = repeatBtn.querySelector('svg');

        repeatBtn.classList.remove('active-icon', 'amber-icon');
        if (iconContainer) iconContainer.classList.remove('is-rotating');

        if (state === 1) {
            repeatBtn.classList.add('active-icon');
            if (iconContainer) iconContainer.classList.add('is-rotating');
        } else if (state === 2) {
            repeatBtn.classList.add('amber-icon');
            if (iconContainer) iconContainer.classList.add('is-rotating');
        }
    }
    
    function updatePlayPauseIcon() {
        playIcon.classList.toggle('hidden', appState.isPlaying);
        pauseIcon.classList.toggle('hidden', !appState.isPlaying);
    }
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    function updateRangeFill(input) {
        const value = (input.value - input.min) / (input.max - input.min) * 100;
        input.style.background = `linear-gradient(to right, #f0f0f0 ${value}%, #4d4d4d ${value}%)`;
    }

    function updateVolumeIcon() {
        if (appState.volume === 0 || appState.isMuted) {
            volumeBtn.innerHTML = muteIconSVG;
        } else {
            volumeBtn.innerHTML = volumeIconSVG;
        }
    }

    function toggleMute() {
        appState.isMuted = !appState.isMuted;
        if (appState.isMuted) {
            if (appState.volume > 0) {
                appState.volumeBeforeMute = appState.volume;
            }
            appState.volume = 0;
        } else {
            appState.volume = appState.volumeBeforeMute > 0 ? appState.volumeBeforeMute : 0.5;
        }
        audioPlayer.volume = appState.volume;
        volumeBar.value = appState.volume * 100;
        updateRangeFill(volumeBar);
        updateVolumeIcon();
    }

    if (nextInQueueContainer) {
        nextInQueueContainer.addEventListener('click', () => {
            if (queueBtn) queueBtn.click();
        });
    }

    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', playNext);
    prevBtn.addEventListener('click', playPrev);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', cycleRepeatState);
    volumeBtn.addEventListener('click', toggleMute);
    
    eqBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!audioContext) setupAudioContextAndEQ();
        equalizerPanel.classList.toggle('hidden');
        setTimeout(() => equalizerPanel.classList.toggle('visible'), 10);
    });
    
    eqResetBtn.addEventListener('click', () => {
        const sliders = equalizerPanel.querySelectorAll('.eq-slider');
        sliders.forEach((slider, index) => {
            slider.value = 0;
            if (eqBands[index]) {
                eqBands[index].gain.value = 0;
                appState.eq[index] = 0;
                const valueInput = slider.parentElement.querySelector('.eq-value-input');
                if (valueInput) valueInput.value = "0.0";
            }
        });
        appState.settingsControls.save(appState);
    });

    audioPlayer.addEventListener('timeupdate', () => {
        if (isNaN(audioPlayer.duration)) return;
        const currentTime = audioPlayer.currentTime;
        progressBar.value = (currentTime / audioPlayer.duration) * 100;
        currentTimeEl.textContent = formatTime(currentTime);
        updateRangeFill(progressBar);
        
        appState.currentTime = currentTime;
        const now = Date.now();
        if (now - lastSaveTime > 2000) {
            lastSaveTime = now;
            appState.settingsControls.save(appState);
        }
    });

    audioPlayer.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
    });
    audioPlayer.addEventListener('ended', handleSongEnd);

    progressBar.addEventListener('input', () => {
        if (isNaN(audioPlayer.duration)) return;
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    });
    
    volumeBar.addEventListener('input', (e) => { 
        const newVolume = e.target.value / 100;
        audioPlayer.volume = newVolume;
        appState.volume = newVolume;
        if (newVolume > 0 && appState.isMuted) {
            appState.isMuted = false;
        }
        updateRangeFill(e.target);
        updateVolumeIcon();
        appState.settingsControls.save(appState);
    });
    
    window.addEventListener('click', (e) => {
        const contextMenu = document.getElementById('context-menu');
        const mainContentContainer = document.getElementById('main-content-container');

        if (contextMenu) contextMenu.classList.add('hidden');

        if (equalizerPanel && !equalizerPanel.contains(e.target) && e.target !== eqBtn && !eqBtn.contains(e.target)) {
            equalizerPanel.classList.add('hidden');
            equalizerPanel.classList.remove('visible');
        }

        if (queuePanel && queuePanel.classList.contains('visible') && mainContentContainer && mainContentContainer.contains(e.target)) {
            queuePanel.classList.remove('visible');
        }
    });

    shuffleBtn.innerHTML = diceIconSVG;
    repeatBtn.innerHTML = ouroborosIconSVG;
    eqBtn.innerHTML = equalizerIconSVG;
    queueBtn.innerHTML = queueIconSVG;
    
    audioPlayer.volume = appState.volume;
    volumeBar.value = appState.volume * 100;
    
    updateRangeFill(volumeBar);
    updateRangeFill(progressBar);
    shuffleBtn.classList.toggle('active-icon', appState.isShuffled);
    updateRepeatUI();
    updateVolumeIcon();
    updatePlayPauseIcon();
    updateNextInQueueCard();

    return { 
        playTrack: (index) => {
            if (!appState.viewingContext) return;
            
            appState.playingContext = { ...appState.viewingContext, trackIndex: index };
            
            const trackToPlay = appState.playingContext.originalTracks[index];

            if (appState.isShuffled) {
                appState.shuffledPlaylist = [...appState.playingContext.tracks].sort(() => Math.random() - 0.5);
            }
            
            if (trackToPlay) {
                playTrackInternal(trackToPlay);
            }
        },
        getUpcomingTracks,
        updateNextInQueueCard
    };
}
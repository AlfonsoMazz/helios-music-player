// src/js/views/homeView.js

const animatedPulseIconSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
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

const staticPlayIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/></svg>`;

function buildHierarchyHTML(node, currentPath, appState) {
    let html = '';
    const sortedItemKeys = Object.keys(node._items).sort((a, b) => a.localeCompare(b));

    const directPlaylists = [];
    const subfolders = [];
    for (const key of sortedItemKeys) {
        const childNode = node._items[key];
        const childPath = [...currentPath, key];
        if (childNode._tracks && childNode._tracks.length > 0) {
            directPlaylists.push({ name: key, node: childNode, path: childPath });
        } else if (Object.keys(childNode._items).length > 0) {
            subfolders.push({ name: key, node: childNode, path: childPath });
        }
    }

    if (directPlaylists.length > 0) {
        html += `<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-6">`;
        for (const playlist of directPlaylists) {
            const isPlayingThisPlaylist = JSON.stringify(appState.playingContext?.path) === JSON.stringify(playlist.path);
            const buttonColorClass = isPlayingThisPlaylist ? 'text-amber-400' : 'text-white';
            const iconSVG = isPlayingThisPlaylist ? animatedPulseIconSVG : staticPlayIconSVG;
            const activeMosaicClass = isPlayingThisPlaylist ? 'active-playlist-mosaic' : '';

            html += `
                <div class="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700 transition-colors playlist-mosaic ${activeMosaicClass}"
                     data-path='${JSON.stringify(playlist.path)}'>
                    <img src="${playlist.node._tracks[0].cover}" alt="Cover for ${playlist.name}" class="w-full h-auto rounded-md mb-2 aspect-square object-cover cursor-pointer">
                    <div class="flex items-center justify-between mt-2">
                        <div class="truncate cursor-pointer flex-1">
                            <h3 class="text-white font-bold truncate">${playlist.name}</h3>
                            <p class="text-sm text-gray-400">${playlist.node._tracks.length} ${playlist.node._tracks.length === 1 ? 'canción' : 'canciones'}</p>
                        </div>
                        <button class="play-mosaic-btn p-1 rounded-full hover:bg-gray-700 transition-colors ${buttonColorClass}" data-path='${JSON.stringify(playlist.path)}'>
                            ${iconSVG}
                        </button>
                    </div>
                </div>`;
        }
        html += `</div>`;
    }

    for (const subfolder of subfolders) {
        // --- AQUÍ ESTÁ EL CAMBIO: AÑADIMOS MARGEN INFERIOR (mb-12) ---
        html += `<div class="mb-12">
                    <h3 class="text-xl font-semibold text-gray-300 mt-4 mb-2">${subfolder.name}</h3>
                    <hr class="border-gray-700 mb-4">
                    ${buildHierarchyHTML(subfolder.node, subfolder.path, appState)}
                 </div>`;
    }

    return html;
}

export function renderHomeView(appState) {
    const mainContentContainer = document.getElementById('main-content-container');
    if (!mainContentContainer) return;

    appState.viewingContext = null;

    let homeHTML = `<main class="flex-1 bg-gradient-to-b from-gray-900 to-black main-view overflow-y-auto p-6">
                        <h1 class="text-3xl font-bold text-white mb-6">Home</h1>`;

    const sortedRootFolders = Object.keys(appState.library).sort((a, b) => a.localeCompare(b));

    for (const folderName of sortedRootFolders) {
        const rootNode = appState.library[folderName];
        homeHTML += `<section class="mb-8">
                        ${buildHierarchyHTML(rootNode, [folderName], appState)}
                     </section>`;
    }

    homeHTML += `</main>`;
    mainContentContainer.innerHTML = homeHTML;
}

export function showWelcomeView() {
    const mainContentContainer = document.getElementById('main-content-container');
    if (!mainContentContainer) return;
    mainContentContainer.innerHTML = `
        <div class="welcome-view">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19.039 11.459c.001.015.022.244.03.407c.006.113 0 .29 0 .3c.003 0 .029.023.03.024c1.428 1.17 2.943 2.767 3.204 3.94c.073.325.056.618-.072.868c-.152.293-.439.503-.834.638c-2.046.7-6.925-.642-10.907-2.609c-2.845-1.406-5.342-3.081-7.032-4.719c-1.57-1.523-1.995-2.71-1.59-3.427c.155-.271.42-.472.776-.609c1.299-.507 3.788-.152 6.239.579c-1.16.866-1.968 2.034-2.342 3.202l-.001.007a.051.051 0 0 1-.001.006c-.115 1.07 1.434 2.47 3 3.25c-.002-.006.084.032.084.026c-.002-.006-.015-.109-.017-.113c-.366-2.66 1.648-6.64 3.765-7.513c.136-.056.254-.09.27-.095l-.273-.027c-.074-.006-.148-.013-.228-.015a7.464 7.464 0 0 0-.272-.01a6.443 6.443 0 0 0-3.4.92C5.378 5.057 2.383 4.892 1.13 5.31c-.497.167-.833.418-1 .751c-.174.35-.175.79-.002 1.306c.57 1.704 3.058 4.032 6.211 6.099c.457 2.407 2.615 4.875 5.703 5.204l.142.015a.278.278 0 0 1 .05 0a6.618 6.618 0 0 0-.173-.132c-.955-.736-1.813-1.949-2.107-3l.185.093l.143.07c4.985 2.465 10.215 3.72 12.53 2.947c.519-.174.9-.418 1.075-.768c.167-.335.139-.78-.029-1.278c-.436-1.3-2.304-3.284-4.675-5.052a5.003 5.003 0 0 0-.145-.107"/></svg>
            <h1>Bienvenido a tu biblioteca</h1>
            <p>Selecciona una playlist en el panel de la izquierda para comenzar a escuchar.</p>
        </div>
    `;
}
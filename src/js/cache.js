// src/js/cache.js

const DB_NAME = 'AlfonsoMusicDB';
const DB_VERSION = 1;
const STORE_NAME = 'libraryStore';
const KEY = 'userLibrary';

let db = null;

/**
 * Abre y prepara la conexión con la base de datos IndexedDB.
 * @returns {Promise<IDBDatabase>} Una promesa que resuelve con la instancia de la base de datos.
 */
function openDb() {
    return new Promise((resolve, reject) => {
        if (db) {
            return resolve(db);
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error('Error al abrir la base de datos IndexedDB:', event.target.error);
            reject('Error al abrir la base de datos.');
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const tempDb = event.target.result;
            if (!tempDb.objectStoreNames.contains(STORE_NAME)) {
                tempDb.createObjectStore(STORE_NAME);
            }
        };
    });
}

/**
 * Guarda el árbol de la biblioteca completo en la caché de IndexedDB.
 * @param {object} libraryTree El objeto de la biblioteca para guardar.
 */
export async function saveLibraryToCache(libraryTree) {
    try {
        const dbInstance = await openDb();
        const transaction = dbInstance.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        store.put(libraryTree, KEY);

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => {
                console.log('Biblioteca guardada en la caché exitosamente.');
                resolve();
            };
            transaction.onerror = (event) => {
                console.error('Error al guardar la biblioteca en la caché:', event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('No se pudo iniciar la transacción para guardar en caché:', error);
    }
}

/**
 * Carga la biblioteca desde la caché de IndexedDB.
 * @returns {Promise<object|null>} Una promesa que resuelve con el objeto de la biblioteca o null si no se encuentra.
 */
export async function loadLibraryFromCache() {
    try {
        const dbInstance = await openDb();
        const transaction = dbInstance.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(KEY);

        return new Promise((resolve, reject) => {
            request.onsuccess = (event) => {
                if (event.target.result) {
                    console.log('Biblioteca cargada desde la caché.');
                    resolve(event.target.result);
                } else {
                    console.log('No se encontró ninguna biblioteca en la caché.');
                    resolve(null);
                }
            };
            request.onerror = (event) => {
                console.error('Error al cargar la biblioteca desde la caché:', event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('No se pudo iniciar la transacción para cargar desde caché:', error);
        return null;
    }
}
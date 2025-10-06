# 🎵 Helios Music Player by Almazz

Un reproductor de música de escritorio, personalizable y offline, construido con tecnologías web modernas y **empaquetado con Electron** para funcionar como una aplicación nativa. Diseñado para reproducir bibliotecas de música locales con un enfoque en la calidad de audio, una interfaz limpia y un rendimiento fluido.

---

## ✨ Características Clave

### Arquitectura de Escritorio
* **Aplicación Nativa con Electron:** El proyecto está construido sobre Electron, lo que le permite ejecutarse como una aplicación de escritorio independiente en Windows, macOS y Linux, sin depender de un navegador web.
* **Arquitectura Multi-Ventana:** La aplicación utiliza dos ventanas separadas:
    1.  Una **ventana principal** para la gestión de la biblioteca y la reproducción.
    2.  Una **ventana de MiniPlayer** independiente, pequeña y sin bordes, con la funcionalidad **"Always On Top"** para flotar sobre todas las demás aplicaciones.
* **Comunicación Inter-Proceso (IPC):** Ambas ventanas se comunican en tiempo real para mantener el estado de la reproducción perfectamente sincronizado.

### Rendimiento y Carga de Biblioteca
* **Caché Persistente (IndexedDB):** La biblioteca de música se escanea solo una vez y se guarda en la base de datos del navegador, permitiendo un arranque **casi instantáneo** en sesiones posteriores.
* **Renderizado Asíncrono Inteligente:** La aplicación está optimizada para manejar miles de canciones sin congelar la interfaz.

### Experiencia de Reproducción
* **Mini-Reproductor Avanzado:**
    * Una ventana **flotante, arrastrable y redimensionable** que funciona de forma independiente a la aplicación principal.
    * **Diseño Dual:** Se adapta automáticamente a un modo "Cuadrado" (ideal para mostrar la carátula) o un modo "Barra" (una elegante barra de controles) según el usuario redimensione la ventana.
    * **Controles Completos y Sincronizados:** Todos los controles del MiniPlayer (play, volumen, barra de progreso) están sincronizados con la aplicación principal.
* **Cola de Reproducción Unificada:** El panel "A continuación" combina canciones añadidas manualmente y la cola generada por el orden de la playlist o el modo aleatorio.
* **Salto Automático por Error:** El reproductor detecta archivos de audio corruptos, los salta automáticamente y muestra una notificación.

### Persistencia y UI
* **Restauración Completa de Sesión:** La aplicación recuerda y restaura todo: la última canción, el segundo exacto, el estado de los controles (Shuffle, Repeat), la ecualización y el estado visual de la UI.
* **Ecualizador Gráfico de 10 Bandas:** Procesamiento de audio en tiempo real a través de la Web Audio API.

---

## 🛠️ Arquitectura y Desglose de Archivos

El proyecto sigue una arquitectura de Electron con un **proceso principal** (que gestiona las ventanas) y **procesos de renderizado** (las ventanas con la interfaz web).

### Archivos de Electron (Proceso Principal)
* `package.json`: El manifiesto del proyecto. Define el nombre, versión, y gestiona las dependencias (como Electron) y los scripts de ejecución (`npm start`).
* `main.js`: El **cerebro de la aplicación de escritorio**. Este script se ejecuta en el proceso principal de Node.js. Es responsable de:
    1.  Crear y gestionar las ventanas del sistema operativo (`BrowserWindow`).
    2.  Implementar la lógica de `alwaysOnTop` para el MiniPlayer.
    3.  Manejar la comunicación (IPC) entre las diferentes ventanas.
* `preload.js`: Actúa como un **puente seguro** entre el proceso principal (`main.js`) y los procesos de renderizado (las ventanas). Expone de forma controlada las APIs de Electron al código del frontend.
* `.gitignore`: Especifica qué archivos (como `node_modules/`) deben ser ignorados por Git.

### Archivos de la Interfaz (Procesos de Renderizado)
* `src/index.html`: La vista HTML para la **ventana principal** de la aplicación.
* `src/miniplayer.html`: Una vista HTML dedicada y autocontenida para la **ventana del MiniPlayer**.
* `src/renderer.js`: (Anteriormente `main.js`) Es el **orquestador del frontend** para la ventana principal. Carga componentes, inicializa todos los módulos y gestiona el envío de actualizaciones de estado al proceso principal.
* `src/js/miniplayer-loader.js`: Un script de arranque exclusivo para `miniplayer.html`. Inicializa la interfaz del MiniPlayer y establece los listeners para recibir actualizaciones de estado y enviar comandos.
* `src/js/state.js`: El **cerebro del frontend**. Mantiene el estado de la aplicación para la ventana principal.
* `src/components/*.txt`: Plantillas HTML para las secciones de la UI de la ventana principal.

---

## 📁 Estructura del Proyecto
/
├── node_modules/
├── src/
│   ├── assets/
│   │   └── icon2.ico
│   ├── components/
│   │   ├── mainView.txt
│   │   ├── miniPlayer.txt
│   │   ├── player.txt
│   │   └── sidebar.txt
│   ├── js/
│   │   ├── views/
│   │   │   ├── homeView.js
│   │   │   ├── miniPlayer.js
│   │   │   └── playlistView.js
│   │   ├── cache.js
│   │   ├── library.js
│   │   ├── mainView.js
│   │   ├── miniplayer-loader.js
│   │   ├── player.js
│   │   ├── queue.js
│   │   ├── settings.js
│   │   ├── sidebar.js
│   │   └── state.js
│   ├── index.html
│   ├── miniplayer.html
│   └── renderer.js
├── .gitignore
├── main.js
├── package.json
├── package-lock.json
└── preload.js

---

## 🚀 Cómo Ejecutar en Modo Desarrollo

Para probar la aplicación en un entorno de escritorio local, necesitas tener instalado [Node.js](https://nodejs.org/).

1.  Abre la carpeta raíz del proyecto en tu terminal (o la terminal integrada de VS Code).
2.  Si es la primera vez, instala todas las dependencias con el comando:
    ```bash
    npm install
    ```
3.  Una vez instaladas, ejecuta la aplicación con:
    ```bash
    npm start
    ```

Esto lanzará la aplicación en su propia ventana de escritorio. Gracias a `electron-reloader`, cualquier cambio que guardes en el código fuente refrescará la aplicación automáticamente.
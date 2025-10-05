# 🎵 Helios Music Player by Almazz

Un reproductor de música de escritorio, personalizable y offline, construido con tecnologías web modernas. Diseñado para reproducir bibliotecas de música locales con un enfoque en la calidad de audio, una interfaz limpia y un rendimiento fluido, incluso con bibliotecas masivas.

---

## ✨ Características Clave

### Rendimiento y Carga de Biblioteca
* **Caché Persistente (IndexedDB):** La biblioteca de música se escanea solo una vez y se guarda en la base de datos del navegador, permitiendo un arranque **casi instantáneo** en sesiones posteriores.
* **Renderizado Asíncrono Inteligente:** La aplicación está optimizada para manejar miles de canciones sin congelar la interfaz.
    * **Escaneo en Tiempo Real:** Durante el escaneo inicial, las carpetas y playlists aparecen en la barra lateral una por una, proporcionando feedback visual inmediato.
    * **Carga Instantánea de Playlists (UI Esqueleto):** Al abrir una playlist grande, la interfaz aparece **al instante** con marcadores de posición (`placeholders`) para cada canción, evitando cualquier retraso.
    * **Renderizado de Doble Flujo:** Las canciones se cargan en la lista a través de dos procesos simultáneos: un renderizado de arriba hacia abajo y un renderizado prioritario que dibuja inmediatamente la pista actual y sus vecinas, permitiendo una navegación instantánea.

### Experiencia de Reproducción
* **Mini-Reproductor Avanzado:**
    * Una ventana **flotante, arrastrable y redimensionable** inspirada en el modo Picture-in-Picture de Spotify.
    * **Diseño Responsivo:** Se adapta automáticamente a un modo "Cuadrado" (ideal para mostrar la carátula) o un modo "Barra" (una elegante barra de controles) según el usuario redimensione la ventana.
    * **Interfaz Dinámica:** Muestra la carátula nítida por defecto. Al pasar el cursor, la carátula se desenfoca suavemente para dar contraste a los controles que aparecen con una transición fluida.
    * **Controles Completos:** Incluye una barra de progreso funcional e interactiva y un control de volumen animado que aparece de forma simétrica al pasar el cursor.
* **Cola de Reproducción Unificada:** El panel "A continuación" combina canciones añadidas manualmente por el usuario y la cola "natural" generada por el orden de la playlist o el modo aleatorio.
* **Salto Automático por Error:** El reproductor detecta archivos de audio corruptos o ilegibles, los salta automáticamente para no interrumpir la sesión y muestra una notificación temporal.

### Persistencia y UI
* **Restauración Completa de Sesión:** La aplicación recuerda y restaura todo: la última canción, el segundo exacto, el estado de los controles (Shuffle, Repeat), la ecualización y el **estado visual de la UI** (carpetas expandidas y posición de scroll).
* **Interfaz Coherente:** El resaltado de la canción y la playlist activas es persistente y está sincronizado en todas las vistas.
* **Ecualizador Gráfico de 10 Bandas:** Procesamiento de audio en tiempo real a través de la Web Audio API con ganancia ajustable por banda.

---

## 🛠️ Arquitectura y Desglose de Archivos

El proyecto sigue una arquitectura modular orquestada por un estado centralizado, lo que facilita la comunicación entre componentes y la escalabilidad.

### Archivos Principales
* `index.html`: Es el esqueleto principal de la aplicación. Contiene la estructura HTML base, los contenedores para los componentes dinámicos (`sidebar`, `main-content`, `player`), y todos los estilos CSS personalizados del proyecto dentro de una etiqueta `<style>`.
* `main.js`: Es el **orquestador central**. Su función `initializeApp` se encarga de:
    1.  Cargar dinámicamente los componentes HTML (`.txt`) en el `index.html`.
    2.  Inicializar todos los módulos de JavaScript (`player.js`, `sidebar.js`, etc.).
    3.  Gestionar la restauración de la sesión al iniciar la aplicación.
* `state.js`: El **cerebro de la aplicación**. Exporta un único objeto `appState` que contiene toda la información relevante: la biblioteca de música, el estado de reproducción (qué canción suena, tiempo actual, shuffle, etc.), y referencias a los controles de otros módulos para que puedan comunicarse entre sí.

### Módulos de Datos y Persistencia
* `library.js`: Se encarga de toda la lógica de escaneo de la biblioteca. Utiliza `jsmediatags` para leer los metadatos de los archivos de audio y construye la estructura jerárquica de carpetas y playlists.
* `cache.js`: Abstrae la lógica de la base de datos **IndexedDB**. Proporciona funciones para guardar (`saveLibraryToCache`) y cargar (`loadLibraryFromCache`) la biblioteca de música, asegurando la persistencia entre sesiones.
* `settings.js`: Gestiona la configuración del usuario y el estado de la sesión (volumen, ecualización, última canción reproducida, etc.) usando `localStorage`.

### Módulos de UI y Controladores
* `player.js`: Controla el reproductor principal en el footer. Gestiona el elemento `<audio>`, el ecualizador (Web Audio API), y expone todas las funciones de control (`play`, `pause`, `next`, `seekTo`, etc.) que otros módulos consumen a través de `appState`.
* `sidebar.js`: Controla la barra lateral izquierda. Es responsable de renderizar el árbol de carpetas de la biblioteca, gestionar la expansión/colapso de carpetas y actualizar la sección "Ahora Suena" en la parte inferior.
* `mainView.js`: Actúa como el **controlador de la vista principal** (el área de contenido central). Decide qué vista renderizar (`homeView` o `playlistView`) y maneja la lógica de los botones de esa sección, como la búsqueda y el ordenamiento.
* `queue.js`: Gestiona la lógica y la interfaz del panel "A continuación", incluyendo la funcionalidad de arrastrar y soltar para reordenar las canciones.

### Módulos de Vista (Renderizado)
* `homeView.js`: Contiene la lógica para renderizar la pantalla de inicio, mostrando los mosaicos de playlists y carpetas.
* `playlistView.js`: Se encarga de renderizar la lista detallada de canciones de una playlist, incluyendo la optimización de carga con UI esqueleto.
* `miniPlayer.js`: Módulo dedicado que controla toda la lógica y la interfaz de la ventana flotante del mini-reproductor. Gestiona su estado, la animación, el arrastre y la sincronización con el estado principal de la aplicación.

### Componentes HTML
* `/components/*.txt`: Son plantillas de HTML puro que definen la estructura de las principales secciones de la UI. Son cargados por `main.js` al iniciar la aplicación.

---

## 📁 Estructura del Proyecto

```
/
└── src/
    ├── components/
    │   ├── mainView.txt
    │   ├── miniPlayer.txt  <-- (Nuevo)
    │   ├── player.txt
    │   └── sidebar.txt
    ├── js/
    │   ├── views/
    │   │   ├── homeView.js
    │   │   ├── miniPlayer.js   <-- (Nuevo)
    │   │   └── playlistView.js
    │   ├── cache.js
    │   ├── library.js
    │   ├── mainView.js
    │   ├── player.js
    │   ├── queue.js
    │   ├── settings.js
    │   ├── sidebar.js
    │   └── state.js
    ├── index.html
    └── main.js
```

---

## 🚀 Cómo Ejecutar en Modo Desarrollo

Para probar la aplicación en un entorno local, necesitas [Visual Studio Code](https://code.visualstudio.com/) y la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

1.  Abre la carpeta raíz del proyecto en VS Code.
2.  Haz clic derecho en `src/index.html`.
3.  Selecciona **"Open with Live Server"**.
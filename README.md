# 🎵 Alfonso Music Player

Un reproductor de música de escritorio, offline y personalizable, construido con tecnologías web modernas. Diseñado para reproducir bibliotecas de música locales con un enfoque en la calidad de audio, una interfaz limpia y un rendimiento fluido, incluso con bibliotecas masivas.

![image](https://i.imgur.com/K3aYq0T.png)

## ✨ Características Principales

* **Arquitectura Modular (Vista-Controlador):** El código está segmentado en módulos con responsabilidades únicas y un estado centralizado (`appState`). La lógica de la vista principal ha sido refactorizada en un controlador (`mainView.js`) y módulos de vista dedicados (`homeView.js`, `playlistView.js`), facilitando su mantenimiento.
* **Navegación Dual:**
    * **Vista de Biblioteca Detallada:** Un árbol de carpetas lateral para una navegación rápida y precisa.
    * **Vista de Inicio (Mosaicos):** Una vista de "Home" con mosaicos visuales de todas las playlists, agrupadas jerárquicamente por carpetas para una exploración más intuitiva.
* **Rendimiento Optimizado para Bibliotecas Masivas:**
    * **Caché Persistente (IndexedDB):** La biblioteca de música se guarda en una base de datos del navegador después del primer escaneo, permitiendo una carga **casi instantánea** en sesiones posteriores.
    * **Renderizado Inteligente con Placeholders:** Al navegar a una canción en una playlist larga, la aplicación renderiza "slots" genéricos, realiza un **scroll animado instantáneo** sobre ellos y luego renderiza de forma prioritaria la "ventana" de canciones alrededor de la activa, rellenando el resto en segundo plano. Esto elimina cualquier tiempo de espera.
* **Persistencia de Sesión Completa:** La aplicación recuerda la última canción que estabas escuchando y **reanuda la sesión en el segundo exacto** donde la dejaste, incluyendo el estado de los controles (Shuffle, Repeat) y los ajustes del ecualizador.
* **Controles de Reproducción Avanzados:**
    * **Play Instantáneo Inteligente:** El botón de Play en los mosaicos respeta el estado de **Shuffle**: inicia una canción aleatoria si está activo, o la primera si está desactivado.
    * **Ordenación por Playlist y Persistente:** Cada playlist recuerda su propia configuración de orden (alfabético, por fecha, etc.).
    * **Búsqueda Optimizada:** Búsqueda fluida que utiliza "debouncing" para no sobrecargar la interfaz.
* **UI Coherente y Reactiva:**
    * **Indicadores de Estado Persistentes:** La playlist activa mantiene un brillo ámbar permanente en la vista de mosaico.
    * **Sincronización de Vistas:** El resaltado en la sidebar siempre se sincroniza con la playlist que se está viendo o reproduciendo.
* **Cola de Reproducción Interactiva:** Permite añadir canciones mediante un menú contextual y reordenarlas fácilmente con drag-and-drop.
* **Ecualizador Gráfico de 10 Bandas:** Procesamiento de audio en tiempo real a través de la Web Audio API.

---

## 🛠️ Tecnologías y Conceptos

* **Base:** HTML5, CSS3, JavaScript (ECMAScript Modules)
* **Estilos:** **Tailwind CSS**
* **Arquitectura:**
    * Estado centralizado y modular (`js/state.js`).
    * Patrón **Vista-Controlador** para la vista principal.
    * Orquestador central (`main.js`) que coordina los módulos.
    * Carga de componentes HTML mediante la **API Fetch**.
* **Persistencia de Datos:**
    * **IndexedDB:** Para el cacheo de la biblioteca.
    * **`localStorage`**: Para el guardado de ajustes y estado de la sesión.
* **Procesamiento de Audio:** **Web Audio API**
* **Metadatos de Audio:** **jsmediatags**
* **Optimización de UI:**
    * **Renderizado con Placeholders (Skeleton UI)** para scroll instantáneo.
    * Lazy Loading y Renderizado Asíncrono.
    * Técnica de **Debouncing** para búsqueda eficiente.

---

## 📁 Estructura del Proyecto

/
└── src/
    ├── components/
    │   ├── sidebar.txt
    │   ├── mainView.txt
    │   └── player.txt
    ├── js/
    │   ├── views/              # **Nuevo:** Módulos dedicados a renderizar vistas específicas
    │   │   ├── homeView.js     # Lógica para la vista de mosaicos y bienvenida
    │   │   └── playlistView.js # Lógica para la vista de lista de canciones
    │   ├── cache.js
    │   ├── library.js
    │   ├── mainView.js         # **Refactorizado:** Ahora actúa como un controlador de vistas
    │   ├── player.js
    │   ├── queue.js
    │   ├── settings.js
    │   ├── sidebar.js
    │   └── state.js
    ├── index.html
    └── main.js

---

## 🚀 Cómo Ejecutar en Modo Desarrollo

Para probar la aplicación en un entorno local, se necesita [Visual Studio Code](https://code.visualstudio.com/) y la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

1.  Abre la carpeta raíz del proyecto en VS Code.
2.  Haz clic derecho sobre `src/index.html`.
3.  Selecciona **"Open with Live Server"**.

---

## 🧠 Desglose de Módulos JavaScript

* **`main.js`**: El "director de orquesta".
* **`state.js`**: El "cerebro".
* **`settings.js`**: La "memoria a corto plazo".
* **`cache.js`**: El "almacén".
* **`library.js`**: El "bibliotecario".
* **`sidebar.js`**: El "navegador".
* **`mainView.js`**: El "controlador aéreo". Se encarga de manejar los eventos de la vista principal y de llamar al módulo de vista correcto (`homeView` o `playlistView`) para que renderice el contenido.
* **`views/homeView.js`**: El "arquitecto de la portada". Dibuja la vista de inicio con mosaicos y la pantalla de bienvenida.
* **`views/playlistView.js`**: El "maestro de listas". Dibuja las listas de canciones detalladas con el sistema de renderizado inteligente.
* **`player.js`**: El "motor" de audio.
* **`queue.js`**: El "organizador de la fiesta".
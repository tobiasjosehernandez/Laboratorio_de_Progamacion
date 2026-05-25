// ============================================================
//  CLASE 04 · PROYECTO GUIADO — LISTA DE TAREAS (To-Do App)
//  Laboratorio de Programación — 2° año
//  Tecnicatura en Desarrollo de Software
// ============================================================
//
//  Esta clase es de consolidación. No se introduce nada nuevo:
//  se integra TODO lo aprendido en las clases 01, 02 y 03
//  construyendo una mini aplicación completa desde cero.
//
//  La app se construye SOBRE el index.html de la tienda,
//  pero como módulo independiente que convive con ella.
//  El profesor la construye en vivo con los alumnos.
//
//  Funcionalidades de la app:
//    ✓ Agregar tareas con Enter o botón
//    ✓ Marcar tareas como completadas
//    ✓ Eliminar tareas individuales
//    ✓ Filtrar: todas / pendientes / completadas
//    ✓ Contador de tareas pendientes
//    ✓ Limpiar todas las completadas
//    ✓ Persistencia con localStorage
//    ✓ Drag & drop básico para reordenar (opcional/desafío)
//
//  Conceptos integrados:
//    · DOM: createElement, append, remove, querySelector
//    · Eventos: input, click, keydown, delegación
//    · localStorage: guardar, leer, actualizar, eliminar
//    · Arrays: map, filter, find, findIndex, sort
//    · Funciones: separación de responsabilidades
//    · Clases ES6: modelo de datos
//
//  HTML activo: index.html
//  Cambiar en index.html: <script src="clase04-proyecto.js"></script>
// ============================================================


// ============================================================
//  PASO 1 — PREPARAR EL CONTENEDOR EN EL HTML
// ============================================================
//
//  La app de tareas se inserta dinámicamente en la página.
//  No necesitamos modificar el HTML — la creamos desde JS.
//  Este es el patrón que van a ver en React y en frameworks modernos.

function crearAppTareas() {
  const app = document.createElement("section");
  app.id = "app-tareas";
  app.classList.add("contacto"); // reutilizamos los estilos de sección
  app.style.background = "#f8fafc";
  app.style.borderTop  = "1px solid #e2e8f0";

  app.innerHTML = `
    <h2 class="seccion__titulo">📋 Mis tareas</h2>
    <p class="seccion__subtitulo" id="tareas-contador">0 tareas pendientes</p>

    <div style="max-width:640px; margin:0 auto;">

      <!-- Input para agregar tareas -->
      <div class="formulario__grupo" style="flex-direction:row; gap:0.5rem; margin-bottom:1.5rem;">
        <input
          type="text"
          class="formulario__input"
          id="inputTarea"
          placeholder="Escribí una tarea y presioná Enter..."
          style="flex:1"
          maxlength="100"
        />
        <button class="btn btn--primario" id="btnAgregarTarea">Agregar</button>
      </div>

      <!-- Filtros -->
      <div class="filtros__categorias" style="margin-bottom:1rem;" id="filtrosTareas">
        <button class="filtros__btn activo" data-filtro="todas">Todas</button>
        <button class="filtros__btn" data-filtro="pendientes">Pendientes</button>
        <button class="filtros__btn" data-filtro="completadas">Completadas</button>
      </div>

      <!-- Lista de tareas -->
      <ul id="listaTareas" style="list-style:none; padding:0; display:flex; flex-direction:column; gap:0.5rem;"></ul>

      <!-- Mensaje vacío -->
      <p id="mensajeSinTareas" class="carrito__vacio" style="display:none;">
        No hay tareas para mostrar.
      </p>

      <!-- Acciones globales -->
      <div style="display:flex; justify-content:flex-end; margin-top:1rem;">
        <button class="btn btn--secundario" id="btnLimpiarCompletadas">
          🗑️ Limpiar completadas
        </button>
      </div>

    </div>
  `;

  // Insertar antes del footer
  const footer = document.querySelector(".footer");
  document.body.insertBefore(app, footer);
}

crearAppTareas();


// ============================================================
//  PASO 2 — MODELO DE DATOS
// ============================================================

// Clase para representar una tarea
class Tarea {
  constructor(texto) {
    this.id          = Date.now().toString(); // ID único basado en timestamp
    this.texto       = texto.trim();
    this.completada  = false;
    this.fechaCreacion = new Date().toLocaleDateString("es-AR");
  }
}

// Estado de la aplicación
let tareas = cargarTareas();
let filtroActivo = "todas";

function cargarTareas() {
  try {
    const data = localStorage.getItem("tareas-app");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function guardarTareas() {
  localStorage.setItem("tareas-app", JSON.stringify(tareas));
}


// ============================================================
//  PASO 3 — OPERACIONES CRUD
// ============================================================

// CREATE — agregar una tarea
function agregarTarea(texto) {
  if (!texto || texto.trim().length < 2) {
    mostrarError("Escribí al menos 2 caracteres.");
    return;
  }

  if (texto.trim().length > 100) {
    mostrarError("Máximo 100 caracteres.");
    return;
  }

  const nueva = new Tarea(texto);
  tareas.unshift(nueva); // agregar al inicio del array

  guardarTareas();
  renderizar();

  console.log("✓ Tarea agregada:", nueva);
}

// UPDATE — marcar/desmarcar como completada
function toggleCompletada(id) {
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) return;

  tarea.completada = !tarea.completada;

  guardarTareas();
  renderizar();

  console.log(`${tarea.completada ? "✓" : "○"} Tarea "${tarea.texto}": ${tarea.completada ? "completada" : "pendiente"}`);
}

// DELETE — eliminar una tarea
function eliminarTarea(id) {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) return;

  const tarea = tareas[indice];
  tareas.splice(indice, 1);

  guardarTareas();
  renderizar();

  console.log("✗ Tarea eliminada:", tarea.texto);
}

// DELETE MULTIPLE — limpiar completadas
function limpiarCompletadas() {
  const cantidad = tareas.filter(t => t.completada).length;
  if (cantidad === 0) {
    mostrarError("No hay tareas completadas para eliminar.");
    return;
  }

  tareas = tareas.filter(t => !t.completada);
  guardarTareas();
  renderizar();

  console.log(`✗ ${cantidad} tarea(s) completada(s) eliminada(s)`);
}


// ============================================================
//  PASO 4 — FILTRADO
// ============================================================

function obtenerTareasFiltradas() {
  switch (filtroActivo) {
    case "pendientes":
      return tareas.filter(t => !t.completada);
    case "completadas":
      return tareas.filter(t => t.completada);
    default:
      return tareas;
  }
}


// ============================================================
//  PASO 5 — RENDERIZADO
// ============================================================

// La función principal que actualiza TODA la UI
// Principio: datos → UI (flujo unidireccional)

function renderizar() {
  const lista            = document.querySelector("#listaTareas");
  const mensajeSinTareas = document.querySelector("#mensajeSinTareas");
  const contador         = document.querySelector("#tareas-contador");

  // Limpiar la lista
  lista.innerHTML = "";

  // Obtener las tareas según el filtro
  const tareasFiltradas = obtenerTareasFiltradas();

  // Mostrar u ocultar el mensaje de vacío
  if (tareasFiltradas.length === 0) {
    mensajeSinTareas.style.display = "block";
  } else {
    mensajeSinTareas.style.display = "none";

    // Crear un elemento por cada tarea
    tareasFiltradas.forEach(tarea => {
      const item = crearElementoTarea(tarea);
      lista.append(item);
    });
  }

  // Actualizar el contador
  const pendientes = tareas.filter(t => !t.completada).length;
  contador.textContent =
    pendientes === 0
      ? "✅ Todas las tareas completadas"
      : `${pendientes} tarea${pendientes !== 1 ? "s" : ""} pendiente${pendientes !== 1 ? "s" : ""}`;
}

// Crea el elemento HTML de una tarea
function crearElementoTarea(tarea) {
  const li = document.createElement("li");
  li.dataset.id = tarea.id;
  li.style.cssText = `
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    transition: opacity 0.2s;
    ${tarea.completada ? "opacity: 0.6;" : ""}
  `;

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type    = "checkbox";
  checkbox.checked = tarea.completada;
  checkbox.dataset.accion = "toggle";
  checkbox.dataset.id     = tarea.id;
  checkbox.style.cssText = "width:18px; height:18px; cursor:pointer; accent-color:#f59e0b;";

  // Texto
  const span = document.createElement("span");
  span.textContent = tarea.texto;
  span.style.cssText = `
    flex: 1;
    font-size: 0.95rem;
    ${tarea.completada ? "text-decoration: line-through; color: #94a3b8;" : "color: #1e293b;"}
  `;

  // Fecha
  const fecha = document.createElement("small");
  fecha.textContent = tarea.fechaCreacion;
  fecha.style.cssText = "color: #94a3b8; font-size: 0.75rem; white-space: nowrap;";

  // Botón eliminar
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent      = "✕";
  btnEliminar.dataset.accion   = "eliminar";
  btnEliminar.dataset.id       = tarea.id;
  btnEliminar.style.cssText = `
    background: none;
    border: none;
    cursor: pointer;
    color: #ef4444;
    font-size: 1rem;
    padding: 0.25rem 0.4rem;
    border-radius: 0.25rem;
    transition: background 0.2s;
  `;
  btnEliminar.addEventListener("mouseenter", () => { btnEliminar.style.background = "#fef2f2"; });
  btnEliminar.addEventListener("mouseleave", () => { btnEliminar.style.background = "none"; });

  li.append(checkbox, span, fecha, btnEliminar);
  return li;
}


// ============================================================
//  PASO 6 — EVENTOS
// ============================================================

// Agregar tarea — botón
document.querySelector("#btnAgregarTarea").addEventListener("click", () => {
  const input = document.querySelector("#inputTarea");
  agregarTarea(input.value);
  input.value = "";
  input.focus();
});

// Agregar tarea — Enter en el input
document.querySelector("#inputTarea").addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const input = e.target;
  agregarTarea(input.value);
  input.value = "";
});

// Delegación en la lista: toggle y eliminar
document.querySelector("#listaTareas").addEventListener("click", (e) => {
  const accion = e.target.dataset.accion;
  const id     = e.target.dataset.id;
  if (!accion || !id) return;

  if (accion === "toggle")   toggleCompletada(id);
  if (accion === "eliminar") eliminarTarea(id);
});

// Filtros — delegación
document.querySelector("#filtrosTareas").addEventListener("click", (e) => {
  if (!e.target.classList.contains("filtros__btn")) return;

  document.querySelectorAll("#filtrosTareas .filtros__btn").forEach(btn => {
    btn.classList.remove("activo");
  });
  e.target.classList.add("activo");

  filtroActivo = e.target.dataset.filtro;
  console.log("Filtro activo:", filtroActivo);
  renderizar();
});

// Limpiar completadas
document.querySelector("#btnLimpiarCompletadas").addEventListener("click", limpiarCompletadas);


// ============================================================
//  PASO 7 — UTILIDADES
// ============================================================

function mostrarError(mensaje) {
  const input = document.querySelector("#inputTarea");
  input.style.borderColor = "#ef4444";
  input.placeholder = mensaje;

  setTimeout(() => {
    input.style.borderColor = "";
    input.placeholder = "Escribí una tarea y presioná Enter...";
  }, 2000);
}


// ============================================================
//  PASO 8 — INICIALIZACIÓN
// ============================================================

// Renderizar con las tareas que había guardadas
renderizar();

// Agregar algunas tareas de ejemplo si el storage está vacío
if (tareas.length === 0) {
  agregarTarea("Estudiar manipulación del DOM");
  agregarTarea("Practicar eventos y delegación");
  agregarTarea("Implementar el carrito con localStorage");
  agregarTarea("Preparar el TP integrador");
}

console.log("\n=== App de tareas inicializada ===");
console.log("Tareas en localStorage:", tareas.length);


// ============================================================
//  RESUMEN INTEGRADOR — QUÉ SE USO EN ESTA CLASE
// ============================================================
//
//  DOM
//    · createElement, innerHTML, append, insertBefore
//    · querySelector, querySelectorAll
//    · style, dataset, classList
//
//  EVENTOS
//    · addEventListener: click, keydown, mouseenter/leave
//    · Delegación de eventos con dataset.accion
//    · e.target, e.key, e.preventDefault
//
//  localStorage
//    · getItem, setItem
//    · JSON.parse, JSON.stringify
//    · Patrón try/catch para lecturas seguras
//
//  ARRAYS
//    · find, findIndex, filter, map, forEach, unshift, splice
//
//  CLASES
//    · class Tarea con constructor
//    · Date.now() para IDs únicos
//
//  FUNCIONES
//    · Separación de responsabilidades: datos, renderizado, eventos
//    · Flujo unidireccional: acción → estado → render
//
// ============================================================


// ============================================================
//  EJERCICIOS Y EXTENSIONES
// ============================================================
//
//  1. Agregar prioridad a las tareas (alta / media / baja).
//     Mostrar un indicador de color según la prioridad.
//     Ordenar la lista: primero las de alta prioridad.
//
//  2. Agregar edición inline: al hacer doble click en el texto
//     de una tarea, convertirlo en un input editable.
//     Al perder el foco o presionar Enter, guardar el cambio.
//
//  3. Agregar fecha límite (deadline) a cada tarea.
//     Resaltar en rojo las que ya vencieron.
//
//  4. Agregar un buscador de tareas que filtre en tiempo real
//     (igual al de la tienda).
//
//  5. DESAFÍO INTEGRADOR (TP):
//     Usando todo lo aprendido en este bloque (DOM, eventos,
//     localStorage), construir el carrito de compras de TechStore
//     con las siguientes funcionalidades:
//
//     · Agregar productos al carrito desde las cards
//     · Ver el carrito en la sección correspondiente
//     · Modificar cantidad (+ / -)
//     · Eliminar productos
//     · Calcular subtotal, IVA y total
//     · Persistir el carrito en localStorage
//     · Vaciar el carrito
//     · (Plus) Filtrar productos por categoría y por búsqueda
//     · (Plus) Que el botón "Agregar" muestre "Agregado ✓" si ya está en el carrito
//
// ============================================================

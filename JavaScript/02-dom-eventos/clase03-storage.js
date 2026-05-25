// ============================================================
//  CLASE 03 · LOCALSTORAGE + MANIPULACIÓN DINÁMICA
//  Laboratorio de Programación — 2° año
//  Tecnicatura en Desarrollo de Software
// ============================================================
//
//  Temas:
//    · ¿Qué es localStorage y para qué sirve?
//    · API: setItem, getItem, removeItem, clear
//    · Guardar y recuperar objetos con JSON.stringify / JSON.parse
//    · Persistencia entre recargas de página
//    · Construir el carrito con localStorage
//    · Renderizado dinámico: crear HTML desde datos en JS
//
//  HTML activo: index.html
//  Cambiar en index.html: <script src="clase03-storage.js"></script>
// ============================================================


// ============================================================
//  1. ¿QUÉ ES localStorage?
// ============================================================

// localStorage es un mecanismo del navegador para guardar datos
// como pares clave-valor de forma PERSISTENTE (sobreviven al cierre
// de la pestaña y al reinicio del navegador).
//
// Características:
//   · Solo guarda strings
//   · Capacidad ~5MB por dominio
//   · No se envía al servidor (a diferencia de las cookies)
//   · Es síncrono (bloquea el hilo principal — no hay callbacks)
//   · Específico del dominio y del navegador

console.log("=== localStorage API ===\n");


// ============================================================
//  2. OPERACIONES BÁSICAS
// ============================================================

// setItem(clave, valor) — guardar
localStorage.setItem("usuario",  "Rodrigo");
localStorage.setItem("tema",     "oscuro");
localStorage.setItem("version",  "1.0");

// getItem(clave) — leer (devuelve null si no existe)
const usuario = localStorage.getItem("usuario");
const tema    = localStorage.getItem("tema");
const noExiste = localStorage.getItem("clave-que-no-existe");

console.log("usuario:", usuario);       // "Rodrigo"
console.log("tema:", tema);             // "oscuro"
console.log("no existe:", noExiste);    // null

// removeItem(clave) — eliminar una clave
localStorage.removeItem("version");
console.log("version (eliminada):", localStorage.getItem("version")); // null

// length y key(i) — iterar sobre todas las claves
console.log("\nClaves almacenadas:", localStorage.length);
for (let i = 0; i < localStorage.length; i++) {
  const clave = localStorage.key(i);
  console.log(`  ${clave}: ${localStorage.getItem(clave)}`);
}

// clear() — eliminar TODO (usar con cuidado)
// localStorage.clear();


// ============================================================
//  3. GUARDAR OBJETOS: JSON.stringify y JSON.parse
// ============================================================

// localStorage solo acepta strings. Para guardar objetos o arrays,
// los convertimos a string con JSON.stringify y los recuperamos
// con JSON.parse.

console.log("\n=== JSON y localStorage ===\n");

const configuracion = {
  tema: "oscuro",
  idioma: "es",
  notificaciones: true,
  fontSize: 16
};

// Guardar objeto
localStorage.setItem("config", JSON.stringify(configuracion));

// Recuperar objeto
const configGuardada = localStorage.getItem("config");
console.log("String en localStorage:", configGuardada);

const configParseada = JSON.parse(configGuardada);
console.log("Objeto recuperado:", configParseada);
console.log("Tema:", configParseada.tema);        // "oscuro"
console.log("Tipo:", typeof configParseada);       // "object"

// Patrón seguro: manejar el caso de que no exista la clave
function leerDeStorage(clave, valorPorDefecto = null) {
  try {
    const item = localStorage.getItem(clave);
    return item ? JSON.parse(item) : valorPorDefecto;
  } catch (error) {
    console.error(`Error al leer '${clave}' de localStorage:`, error);
    return valorPorDefecto;
  }
}

function guardarEnStorage(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.error(`Error al guardar '${clave}' en localStorage:`, error);
    return false;
  }
}

// Usar las funciones utilitarias
const configActual = leerDeStorage("config", { tema: "claro", idioma: "es" });
console.log("\nConfig con función segura:", configActual);

const claveInexistente = leerDeStorage("datos-inexistentes", []);
console.log("Clave inexistente:", claveInexistente); // []


// ============================================================
//  4. CARRITO CON LOCALSTORAGE
// ============================================================

console.log("\n=== CARRITO CON localStorage ===\n");

// Estructura del carrito:
// [
//   { id: "1", nombre: "Notebook Pro 15\"", precio: 450000, cantidad: 2, emoji: "💻" },
//   { id: "3", nombre: "Mouse Inalámbrico", precio: 18000,  cantidad: 1, emoji: "🖱️"  }
// ]

// ── Estado del carrito ────────────────────────────────────────

let carrito = leerDeStorage("carrito", []);

// ── Funciones del carrito ─────────────────────────────────────

function agregarAlCarrito(id, nombre, precio, emoji) {
  const itemExistente = carrito.find(item => item.id === id);

  if (itemExistente) {
    itemExistente.cantidad++;
    console.log(`↑ Cantidad de "${nombre}" aumentada a ${itemExistente.cantidad}`);
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1, emoji });
    console.log(`✓ "${nombre}" agregado al carrito`);
  }

  guardarEnStorage("carrito", carrito);
  renderizarCarrito();
  actualizarContador();
}

function eliminarDelCarrito(id) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;

  console.log(`✗ "${item.nombre}" eliminado del carrito`);
  carrito = carrito.filter(i => i.id !== id);
  guardarEnStorage("carrito", carrito);
  renderizarCarrito();
  actualizarContador();
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    eliminarDelCarrito(id);
    return;
  }

  guardarEnStorage("carrito", carrito);
  renderizarCarrito();
  actualizarContador();
}

function vaciarCarrito() {
  carrito = [];
  guardarEnStorage("carrito", carrito);
  renderizarCarrito();
  actualizarContador();
  console.log("Carrito vaciado");
}

// ── Cálculos ──────────────────────────────────────────────────

function calcularSubtotal() {
  return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

function calcularTotal() {
  const subtotal = calcularSubtotal();
  const iva      = subtotal * 0.21;
  return { subtotal, iva, total: subtotal + iva };
}

function contarItems() {
  return carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

// ── Renderizado ───────────────────────────────────────────────

function renderizarCarrito() {
  const listaCarrito  = document.querySelector("#listaCarrito");
  const carritoVacio  = document.querySelector("#carritoVacio");
  const resumenCarrito = document.querySelector("#resumenCarrito");

  // Limpiar la lista (excepto el mensaje de vacío)
  const itemsExistentes = listaCarrito.querySelectorAll(".carrito__item");
  itemsExistentes.forEach(item => item.remove());

  if (carrito.length === 0) {
    carritoVacio.classList.remove("oculto");
    resumenCarrito.style.opacity = "0.4";
    actualizarResumen(0, 0, 0);
    return;
  }

  carritoVacio.classList.add("oculto");
  resumenCarrito.style.opacity = "1";

  // Crear un elemento por cada item del carrito
  carrito.forEach(item => {
    const itemEl = crearItemCarrito(item);
    listaCarrito.append(itemEl);
  });

  // Actualizar resumen
  const { subtotal, iva, total } = calcularTotal();
  actualizarResumen(subtotal, iva, total);
}

function crearItemCarrito(item) {
  const el = document.createElement("div");
  el.classList.add("carrito__item");
  el.dataset.id = item.id;

  el.innerHTML = `
    <span class="carrito__item-emoji">${item.emoji}</span>
    <div class="carrito__item-info">
      <p class="carrito__item-nombre">${item.nombre}</p>
      <p class="carrito__item-precio">$${item.precio.toLocaleString("es-AR")} c/u</p>
    </div>
    <div class="carrito__item-controles">
      <button class="carrito__item-btn" data-accion="restar" data-id="${item.id}">−</button>
      <span class="carrito__item-cantidad">${item.cantidad}</span>
      <button class="carrito__item-btn" data-accion="sumar" data-id="${item.id}">+</button>
    </div>
    <button class="carrito__item-eliminar" data-id="${item.id}" title="Eliminar">🗑️</button>
  `;

  return el;
}

function actualizarResumen(subtotal, iva, total) {
  document.querySelector("#subtotal").textContent = `$${subtotal.toLocaleString("es-AR")}`;
  document.querySelector("#iva").textContent      = `$${Math.round(iva).toLocaleString("es-AR")}`;
  document.querySelector("#total").textContent    = `$${Math.round(total).toLocaleString("es-AR")}`;
}

function actualizarContador() {
  document.querySelector("#contadorCarrito").textContent = contarItems();
}

// ── Eventos del carrito (delegación) ─────────────────────────

const listaCarrito = document.querySelector("#listaCarrito");

listaCarrito.addEventListener("click", (e) => {
  // Botones de sumar / restar
  if (e.target.classList.contains("carrito__item-btn")) {
    const id     = e.target.dataset.id;
    const accion = e.target.dataset.accion;
    cambiarCantidad(id, accion === "sumar" ? 1 : -1);
    return;
  }

  // Botón de eliminar
  if (e.target.classList.contains("carrito__item-eliminar")) {
    eliminarDelCarrito(e.target.dataset.id);
    return;
  }
});

// Vaciar carrito
document.querySelector("#btnVaciar").addEventListener("click", () => {
  if (carrito.length === 0) return;

  // Confirmar antes de vaciar
  const confirmar = window.confirm("¿Seguro que querés vaciar el carrito?");
  if (confirmar) vaciarCarrito();
});

// Finalizar compra
document.querySelector("#btnComprar").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const { total } = calcularTotal();
  const items = carrito.map(i => `• ${i.nombre} x${i.cantidad}`).join("\n");

  alert(`¡Compra realizada!\n\n${items}\n\nTotal: $${Math.round(total).toLocaleString("es-AR")}\n\n¡Gracias por tu compra! 🎉`);
  vaciarCarrito();
});

// ── Eventos de las cards (delegación en grilla) ───────────────

// Mapa de emojis para los productos del HTML
const emojisProductos = {
  "1": "💻",
  "2": "⌨️",
  "3": "🖱️",
  "4": "🖥️",
  "5": "🎧",
  "6": "🔊"
};

const grilla = document.querySelector("#grillaProdutos");

grilla.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn--agregar")) return;

  const boton  = e.target;
  const card   = boton.closest(".card");
  const id     = card.dataset.id;
  const nombre = card.querySelector(".card__nombre").textContent;
  const precio = Number(card.querySelector(".card__precio").dataset.precio);
  const emoji  = emojisProductos[id] || "📦";

  agregarAlCarrito(id, nombre, precio, emoji);

  // Feedback visual
  boton.textContent = "✓ Agregado";
  boton.classList.add("agregado");

  setTimeout(() => {
    boton.textContent = "Agregar";
    boton.classList.remove("agregado");
  }, 1500);
});


// ============================================================
//  5. OTROS USOS DE localStorage
// ============================================================

// Guardar preferencias del usuario
function toggleTema() {
  const temaActual = leerDeStorage("tema-ui", "claro");
  const nuevoTema  = temaActual === "claro" ? "oscuro" : "claro";
  guardarEnStorage("tema-ui", nuevoTema);
  console.log("Tema cambiado a:", nuevoTema);
  // Acá se aplicaría la clase al body: document.body.classList.toggle("tema-oscuro")
}

// Guardar el último término de búsqueda
const inputBusqueda = document.querySelector("#inputBusqueda");
const ultimaBusqueda = leerDeStorage("ultima-busqueda", "");

if (ultimaBusqueda) {
  inputBusqueda.value = ultimaBusqueda;
  console.log("\nÚltima búsqueda recuperada:", ultimaBusqueda);
}

inputBusqueda.addEventListener("input", (e) => {
  guardarEnStorage("ultima-busqueda", e.target.value);
});


// ============================================================
//  6. sessionStorage — la alternativa temporal
// ============================================================

// sessionStorage tiene la misma API que localStorage,
// pero los datos se eliminan cuando se cierra la pestaña.

sessionStorage.setItem("paso-actual", "3");
console.log("\nsessionStorage paso-actual:", sessionStorage.getItem("paso-actual"));

// Cuándo usar cada uno:
//   localStorage   → datos que deben persistir entre sesiones (carrito, preferencias, token)
//   sessionStorage → datos temporales de la sesión (paso de un formulario, estado de navegación)


// ============================================================
//  INICIALIZACIÓN
// ============================================================

// Al cargar la página, renderizar el carrito con lo que había guardado
renderizarCarrito();
actualizarContador();

console.log("\n=== Carrito cargado desde localStorage ===");
console.log("Items:", carrito.length > 0 ? carrito : "carrito vacío");


// ============================================================
//  RESUMEN DE LOCALSTORAGE
// ============================================================
//
//  localStorage.setItem("clave", "valor")
//  localStorage.getItem("clave")            → string | null
//  localStorage.removeItem("clave")
//  localStorage.clear()
//  localStorage.length
//  localStorage.key(i)
//
//  OBJETOS:
//    guardar:    JSON.stringify(objeto)
//    recuperar:  JSON.parse(localStorage.getItem("clave"))
//
//  LIMITACIONES:
//    · Solo strings
//    · ~5MB por dominio
//    · Síncrono
//    · No disponible en modo privado/incógnito en algunos navegadores
//
// ============================================================


// ============================================================
//  EJERCICIOS
// ============================================================
//
//  1. Agregar al carrito la funcionalidad de mostrar el subtotal
//     de cada item (precio × cantidad) dentro del elemento del carrito.
//
//  2. Guardar en localStorage las preferencias del usuario:
//     · Categoría activa en los filtros
//     · Al recargar la página, que la categoría se restaure
//       y se aplique el filtro automáticamente.
//
//  3. Agregar un historial de búsquedas:
//     · Guardar los últimos 5 términos buscados en un array en localStorage
//     · Mostrarlos debajo del input de búsqueda al hacer foco
//
//  4. Implementar un contador de visitas:
//     · Cada vez que se carga la página, incrementar un contador en localStorage
//     · Mostrarlo en el footer: "Has visitado esta tienda X veces"
//
//  5. DESAFÍO: Agregar validación de stock al carrito.
//     Cada producto tiene un stock máximo (guardarlo en un objeto).
//     Si el usuario intenta agregar más unidades que el stock disponible,
//     mostrar un mensaje de error y no permitir el incremento.
//
// ============================================================

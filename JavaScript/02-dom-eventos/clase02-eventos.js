// ============================================================
//  CLASE 02 · EVENTOS
//  Laboratorio de Programación — 2° año
//  Tecnicatura en Desarrollo de Software
// ============================================================
//
//  Temas:
//    · ¿Qué es un evento?
//    · addEventListener y removeEventListener
//    · El objeto Event (e): target, type, preventDefault
//    · Eventos de mouse: click, dblclick, mouseenter, mouseleave
//    · Eventos de teclado: keydown, keyup, input
//    · Eventos de formulario: submit, change, focus, blur
//    · Delegación de eventos (event delegation)
//    · Aplicado a la tienda: filtros, búsqueda, interacción con cards
//
//  HTML activo: index.html
//  Cambiar en index.html: <script src="clase02-eventos.js"></script>
// ============================================================


// ============================================================
//  1. addEventListener — LA FORMA CORRECTA DE ESCUCHAR EVENTOS
// ============================================================

// Sintaxis: elemento.addEventListener("evento", función)

// La función recibe automáticamente el objeto Event (e)
// que contiene información sobre lo que pasó.

const btnVerProductos = document.querySelector("#btnVerProductos");

btnVerProductos.addEventListener("click", function(e) {
  console.log("--- CLICK en 'Ver productos' ---");
  console.log("Tipo de evento:", e.type);          // "click"
  console.log("Elemento clickeado:", e.target);    // el botón
  console.log("Target tag:", e.target.tagName);    // "BUTTON"
  console.log("Target texto:", e.target.textContent.trim());

  // Scroll suave a la sección de productos
  document.querySelector("#productos").scrollIntoView({ behavior: "smooth" });
});

// Con arrow function (más común en código moderno)
const btnCarrito = document.querySelector("#btnCarrito");

btnCarrito.addEventListener("click", (e) => {
  console.log("\n--- CLICK en botón carrito ---");
  document.querySelector("#carrito").scrollIntoView({ behavior: "smooth" });
});


// ============================================================
//  2. EVENTOS DE MOUSE
// ============================================================

const primeraCard = document.querySelector(".card");

// mouseenter / mouseleave — entrar y salir con el mouse
primeraCard.addEventListener("mouseenter", () => {
  console.log("Mouse entró a la card");
  primeraCard.style.outline = "2px solid #f59e0b";
});

primeraCard.addEventListener("mouseleave", () => {
  console.log("Mouse salió de la card");
  primeraCard.style.outline = "";
});

// dblclick — doble click
primeraCard.addEventListener("dblclick", () => {
  const nombre = primeraCard.querySelector(".card__nombre").textContent;
  console.log(`Doble click en: ${nombre}`);
});

// contextmenu — click derecho (prevenir menú del navegador)
primeraCard.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // evita el menú contextual del navegador
  console.log("Click derecho bloqueado en la card");
});


// ============================================================
//  3. EVENTOS DE TECLADO
// ============================================================

const inputBusqueda = document.querySelector("#inputBusqueda");

// keydown — tecla presionada (antes de que aparezca en el input)
inputBusqueda.addEventListener("keydown", (e) => {
  console.log("keydown:", e.key, "| Código:", e.code);

  // Detectar teclas especiales
  if (e.key === "Escape") {
    inputBusqueda.value = "";
    console.log("Input limpiado con Escape");
  }

  if (e.key === "Enter") {
    console.log("Búsqueda confirmada:", inputBusqueda.value);
  }
});

// input — se dispara CADA VEZ que cambia el valor
// Es el evento más útil para búsqueda en tiempo real
inputBusqueda.addEventListener("input", (e) => {
  const termino = e.target.value.toLowerCase().trim();
  console.log("Buscando:", termino);
  filtrarProductosPorTexto(termino);
});

// Función de filtrado por texto
function filtrarProductosPorTexto(termino) {
  const cards = document.querySelectorAll(".card");
  let visibles = 0;

  cards.forEach(card => {
    const nombre      = card.querySelector(".card__nombre").textContent.toLowerCase();
    const descripcion = card.querySelector(".card__descripcion").textContent.toLowerCase();
    const coincide    = nombre.includes(termino) || descripcion.includes(termino);

    card.style.display = coincide ? "" : "none";
    if (coincide) visibles++;
  });

  // Mostrar u ocultar el mensaje de sin resultados
  const sinResultados = document.querySelector("#sinResultados");
  const contadorProductos = document.querySelector("#contadorProductos");

  if (visibles === 0) {
    sinResultados.classList.remove("oculto");
    contadorProductos.textContent = "Sin resultados";
  } else {
    sinResultados.classList.add("oculto");
    contadorProductos.textContent = `Mostrando ${visibles} producto${visibles !== 1 ? "s" : ""}`;
  }
}


// ============================================================
//  4. EVENTOS DE FORMULARIO
// ============================================================

// focus — cuando el elemento recibe el foco
// blur  — cuando el elemento pierde el foco

const inputNombre = document.querySelector("#inputNombre");
const inputEmail  = document.querySelector("#inputEmail");
const inputMensaje = document.querySelector("#inputMensaje");

inputNombre.addEventListener("focus", () => {
  console.log("Input nombre: en foco");
  inputNombre.style.backgroundColor = "#fffbeb";
});

inputNombre.addEventListener("blur", () => {
  console.log("Input nombre: perdió foco");
  inputNombre.style.backgroundColor = "";
  validarCampo(inputNombre, "nombre");
});

inputEmail.addEventListener("blur", () => {
  validarCampo(inputEmail, "email");
});

// Contador de caracteres en el textarea
const contadorMensaje = document.querySelector("#contadorMensaje");
const MAX_CHARS = 300;

inputMensaje.addEventListener("input", () => {
  const largo = inputMensaje.value.length;
  contadorMensaje.textContent = `${largo} / ${MAX_CHARS}`;

  if (largo > MAX_CHARS) {
    inputMensaje.value = inputMensaje.value.slice(0, MAX_CHARS);
    contadorMensaje.style.color = "#ef4444";
  } else if (largo > MAX_CHARS * 0.8) {
    contadorMensaje.style.color = "#f59e0b";
  } else {
    contadorMensaje.style.color = "";
  }
});

// change — para selects y checkboxes (cuando cambia la selección)
const inputAsunto = document.querySelector("#inputAsunto");

inputAsunto.addEventListener("change", (e) => {
  console.log("Asunto seleccionado:", e.target.value);
});

// submit — cuando se envía el formulario
const formContacto = document.querySelector("#formContacto");

formContacto.addEventListener("submit", (e) => {
  e.preventDefault(); // ← MUY IMPORTANTE: evita que la página se recargue

  console.log("Formulario enviado");

  const nombre  = inputNombre.value.trim();
  const email   = inputEmail.value.trim();
  const asunto  = inputAsunto.value;
  const mensaje = inputMensaje.value.trim();

  // Validación de todos los campos
  let formularioValido = true;

  if (!validarCampo(inputNombre, "nombre"))  formularioValido = false;
  if (!validarCampo(inputEmail, "email"))    formularioValido = false;
  if (!validarCampo(inputAsunto, "asunto"))  formularioValido = false;
  if (!validarCampo(inputMensaje, "mensaje")) formularioValido = false;

  if (!formularioValido) {
    console.log("Formulario inválido. Corregir errores.");
    return;
  }

  console.log("Datos del formulario:", { nombre, email, asunto, mensaje });

  // Simular envío exitoso
  formContacto.reset();
  contadorMensaje.textContent = "0 / 300";

  const mensajeExito = document.querySelector("#mensajeExito");
  mensajeExito.classList.remove("oculto");

  setTimeout(() => {
    mensajeExito.classList.add("oculto");
  }, 4000);
});

// Función de validación de campos
function validarCampo(input, tipo) {
  const valor = input.value.trim();
  const errorEl = document.querySelector(`#error${capitalizar(tipo)}`);

  let mensaje = "";

  switch (tipo) {
    case "nombre":
      if (!valor)            mensaje = "El nombre es obligatorio.";
      else if (valor.length < 3) mensaje = "Mínimo 3 caracteres.";
      break;

    case "email":
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!valor)                   mensaje = "El email es obligatorio.";
      else if (!regexEmail.test(valor)) mensaje = "Formato de email inválido.";
      break;

    case "asunto":
      if (!valor) mensaje = "Seleccioná un asunto.";
      break;

    case "mensaje":
      if (!valor)              mensaje = "El mensaje es obligatorio.";
      else if (valor.length < 10) mensaje = "Mínimo 10 caracteres.";
      break;
  }

  if (mensaje) {
    errorEl.textContent = mensaje;
    input.classList.add("error");
    input.classList.remove("valido");
    return false;
  } else {
    errorEl.textContent = "";
    input.classList.remove("error");
    input.classList.add("valido");
    return true;
  }
}

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


// ============================================================
//  5. DELEGACIÓN DE EVENTOS (Event Delegation)
// ============================================================

// En lugar de agregar un listener a CADA botón, agregamos UNO SOLO
// al contenedor padre y usamos e.target para identificar cuál fue clickeado.
//
// Ventajas:
//   · Funciona con elementos creados dinámicamente
//   · Mejor rendimiento con muchos elementos
//   · Menos código

const grilla = document.querySelector("#grillaProdutos");
let cantidadEnCarrito = 0;

grilla.addEventListener("click", (e) => {
  // Verificar si el click fue en un botón "Agregar"
  if (!e.target.classList.contains("btn--agregar")) return;

  const boton    = e.target;
  const card     = boton.closest(".card");         // sube hasta el .card más cercano
  const id       = card.dataset.id;
  const nombre   = card.querySelector(".card__nombre").textContent;
  const precioEl = card.querySelector(".card__precio");
  const precio   = Number(precioEl.dataset.precio);

  console.log(`\n--- Agregar al carrito ---`);
  console.log(`ID: ${id} | Producto: ${nombre} | Precio: $${precio.toLocaleString("es-AR")}`);

  // Feedback visual en el botón
  boton.textContent = "Agregado ✓";
  boton.classList.add("agregado");
  boton.disabled = true;

  // Actualizar el contador del header
  cantidadEnCarrito++;
  document.querySelector("#contadorCarrito").textContent = cantidadEnCarrito;

  // Restaurar el botón después de 2 segundos
  setTimeout(() => {
    boton.textContent = "Agregar";
    boton.classList.remove("agregado");
    boton.disabled = false;
  }, 2000);
});


// ============================================================
//  6. FILTROS POR CATEGORÍA (delegación aplicada a los filtros)
// ============================================================

const contenedorFiltros = document.querySelector(".filtros__categorias");

contenedorFiltros.addEventListener("click", (e) => {
  if (!e.target.classList.contains("filtros__btn")) return;

  // Quitar clase activo de todos los botones
  document.querySelectorAll(".filtros__btn").forEach(btn => {
    btn.classList.remove("activo");
  });

  // Activar el clickeado
  e.target.classList.add("activo");

  const categoria = e.target.dataset.categoria;
  console.log("Filtro activo:", categoria);

  filtrarPorCategoria(categoria);
});

function filtrarPorCategoria(categoria) {
  const cards = document.querySelectorAll(".card");
  let visibles = 0;

  cards.forEach(card => {
    const categoriaCard = card.dataset.categoria;
    const coincide = categoria === "todos" || categoriaCard === categoria;

    card.style.display = coincide ? "" : "none";
    if (coincide) visibles++;
  });

  document.querySelector("#contadorProductos").textContent =
    `Mostrando ${visibles} producto${visibles !== 1 ? "s" : ""}`;
}


// ============================================================
//  7. removeEventListener
// ============================================================

// Para poder remover un listener, la función debe estar guardada en una variable.

function manejarDobleClick() {
  console.log("Doble click en el hero (se registra una sola vez)");
}

const hero = document.querySelector(".hero");
hero.addEventListener("dblclick", manejarDobleClick);

// Remover después de 5 segundos
setTimeout(() => {
  hero.removeEventListener("dblclick", manejarDobleClick);
  console.log("Listener de doble click removido del hero");
}, 5000);


// ============================================================
//  RESUMEN DE EVENTOS VISTOS
// ============================================================
//
//  MOUSE
//    click, dblclick, contextmenu
//    mouseenter, mouseleave, mousemove
//
//  TECLADO
//    keydown, keyup, keypress (obsoleto)
//    e.key, e.code, e.ctrlKey, e.shiftKey
//
//  FORMULARIO
//    submit  → e.preventDefault() siempre
//    input   → cada cambio de valor
//    change  → al perder foco con cambio (selects, checkboxes)
//    focus, blur
//
//  OBJETO Event (e)
//    e.type        → tipo de evento
//    e.target      → elemento que disparó el evento
//    e.currentTarget → elemento donde está el listener
//    e.preventDefault() → cancela el comportamiento por defecto
//    e.stopPropagation() → detiene la propagación (bubbling)
//
//  DELEGACIÓN
//    padre.addEventListener("click", e => {
//      if (e.target.matches(".selector")) { ... }
//    })
//    e.target.closest(".selector") → sube en el DOM buscando el ancestro
//
// ============================================================


// ============================================================
//  EJERCICIOS
// ============================================================
//
//  1. Agregar un evento keydown al documento completo (document).
//     Si se presiona "/" enfocar el input de búsqueda automáticamente.
//     Si se presiona Escape, limpiar el input y quitar el foco.
//
//  2. Agregar mouseenter y mouseleave a TODAS las cards usando
//     un solo listener en la grilla (delegación).
//     Al entrar: resaltar el borde. Al salir: quitar el resalto.
//
//  3. Hacer que el formulario valide en tiempo real (al evento input
//     de cada campo), no solo al hacer submit.
//
//  4. Agregar un botón "Me gusta ❤️" a cada card.
//     Al hacer click, debe alternar entre ❤️ y 🤍 usando toggle.
//     Usar delegación sobre la grilla.
//
//  5. DESAFÍO: Combinar los dos filtros (búsqueda por texto + categoría).
//     Que ambos funcionen al mismo tiempo: mostrar solo las cards que
//     coincidan con el texto Y con la categoría seleccionada.
//
// ============================================================

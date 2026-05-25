// ============================================================
//  CLASE 01 · EL DOM: SELECCIÓN Y MANIPULACIÓN
//  Laboratorio de Programación — 2° año
//  Tecnicatura en Desarrollo de Software
// ============================================================
//
//  El DOM (Document Object Model) es la representación en memoria
//  del HTML de la página. JS puede leerlo y modificarlo en tiempo real.
//
//  Temas:
//    · ¿Qué es el DOM y cómo funciona?
//    · Selección de elementos: getElementById, querySelector, querySelectorAll
//    · Leer y modificar contenido: textContent, innerHTML
//    · Leer y modificar atributos: getAttribute, setAttribute, dataset
//    · Manipular clases: classList (add, remove, toggle, contains)
//    · Manipular estilos: style
//    · Crear y eliminar elementos: createElement, append, remove
//
//  HTML activo: index.html
//  Para activar este archivo: asegurarse que index.html tenga
//  <script src="clase01-dom.js"></script> al final del body
// ============================================================


// ============================================================
//  1. SELECCIÓN DE ELEMENTOS
// ============================================================

// ------------------------------------------------------------
//  getElementById — selecciona por ID (uno solo, siempre)
// ------------------------------------------------------------

const heroTitulo    = document.getElementById("heroTitulo");
const heroSubtitulo = document.getElementById("heroSubtitulo");
const contadorCarrito = document.getElementById("contadorCarrito");

console.log("getElementById:");
console.log(heroTitulo);           // el elemento <h1>
console.log(typeof heroTitulo);    // "object"

// ------------------------------------------------------------
//  querySelector — selecciona el PRIMERO que coincide con el selector CSS
// ------------------------------------------------------------

const primerCard    = document.querySelector(".card");
const btnVerProd    = document.querySelector("#btnVerProductos");
const primerPrecio  = document.querySelector(".card__precio");

console.log("\nquerySelector:");
console.log(primerCard);
console.log(primerPrecio.textContent);

// ------------------------------------------------------------
//  querySelectorAll — selecciona TODOS los que coinciden → NodeList
// ------------------------------------------------------------

const todasLasCards  = document.querySelectorAll(".card");
const todosLosBotones = document.querySelectorAll(".btn--agregar");
const todosLosPrecios = document.querySelectorAll(".card__precio");

console.log("\nquerySelectorAll:");
console.log(`Cards encontradas: ${todasLasCards.length}`);
console.log(`Botones encontrados: ${todosLosBotones.length}`);

// NodeList no es un array pero se puede iterar con forEach
todasLasCards.forEach((card, indice) => {
  console.log(`Card ${indice + 1}:`, card.querySelector(".card__nombre").textContent);
});


// ============================================================
//  2. LEER Y MODIFICAR CONTENIDO
// ============================================================

// ------------------------------------------------------------
//  textContent — texto plano (sin HTML)
// ------------------------------------------------------------

console.log("\n--- textContent ---");
console.log("Título actual:", heroTitulo.textContent);

// Modificar
heroTitulo.textContent = "Bienvenido a TechStore 🚀";
console.log("Título nuevo:", heroTitulo.textContent);

// ------------------------------------------------------------
//  innerHTML — texto con HTML (parsea las etiquetas)
// ------------------------------------------------------------

heroSubtitulo.innerHTML = "Los <strong>mejores productos</strong> al mejor precio.";

// ⚠️  innerHTML puede ser un riesgo de seguridad (XSS) si
//     insertamos datos que vienen del usuario sin sanitizar.
//     Para texto plano, siempre preferir textContent.

// ------------------------------------------------------------
//  Leer valores de inputs
// ------------------------------------------------------------

const inputBusqueda = document.querySelector("#inputBusqueda");
console.log("\nValor del input de búsqueda:", inputBusqueda.value); // vacío al inicio

// Modificar el placeholder dinámicamente
inputBusqueda.placeholder = "Buscar por nombre, categoría...";


// ============================================================
//  3. ATRIBUTOS Y dataset
// ============================================================

console.log("\n--- Atributos ---");

// getAttribute / setAttribute
const primerBoton = document.querySelector(".btn--agregar");
console.log("data-id del primer botón:", primerBoton.getAttribute("data-id"));

primerBoton.setAttribute("title", "Agregar al carrito");
console.log("title agregado:", primerBoton.getAttribute("title"));

// dataset — acceso directo a los atributos data-*
// data-id     → element.dataset.id
// data-precio → element.dataset.precio

const primeraCard = document.querySelector(".card");
console.log("\ndataset de la primera card:");
console.log("id:", primeraCard.dataset.id);
console.log("categoria:", primeraCard.dataset.categoria);

// Leer el precio de cada card usando dataset
console.log("\nPrecios via dataset:");
todasLasCards.forEach(card => {
  const precioEl = card.querySelector(".card__precio");
  const precio   = Number(precioEl.dataset.precio);
  const nombre   = card.querySelector(".card__nombre").textContent;
  console.log(`${nombre}: $${precio.toLocaleString("es-AR")}`);
});


// ============================================================
//  4. CLASES: classList
// ============================================================

console.log("\n--- classList ---");

// add → agrega una clase
primeraCard.classList.add("destacada");
console.log("Clases después de add:", primeraCard.className);

// remove → elimina una clase
primeraCard.classList.remove("destacada");
console.log("Clases después de remove:", primeraCard.className);

// toggle → agrega si no está, elimina si está
primeraCard.classList.toggle("destacada");
console.log("Toggle (agrega):", primeraCard.classList.contains("destacada")); // true
primeraCard.classList.toggle("destacada");
console.log("Toggle (elimina):", primeraCard.classList.contains("destacada")); // false

// contains → verifica si tiene una clase
console.log("¿Tiene clase 'card'?", primeraCard.classList.contains("card")); // true

// Caso de uso real: marcar una card como "en carrito"
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
  const boton = card.querySelector(".btn--agregar");

  // Simulación: la primera card está en el carrito
  if (card.dataset.id === "1") {
    boton.textContent = "Agregado ✓";
    boton.classList.add("agregado");
  }
});


// ============================================================
//  5. ESTILOS INLINE: style
// ============================================================

// Se puede modificar cualquier propiedad CSS desde JS.
// Solo para estilos dinámicos — lo estático va en el CSS.

const hero = document.querySelector(".hero");
console.log("\n--- style ---");
console.log("Background actual:", hero.style.backgroundColor); // vacío (viene del CSS)

// Modificar estilos
contadorCarrito.style.fontWeight = "bold";
contadorCarrito.style.color      = "#0f172a";

// Leer el estilo computado (el que realmente se aplica, incluyendo CSS)
const estiloComputado = window.getComputedStyle(hero);
console.log("Background computado:", estiloComputado.backgroundColor);
console.log("Color computado del h1:", window.getComputedStyle(heroTitulo).color);


// ============================================================
//  6. CREAR Y ELIMINAR ELEMENTOS
// ============================================================

console.log("\n--- Crear elementos ---");

// createElement → crea un elemento en memoria (no está en el DOM todavía)
const nuevaCard = document.createElement("article");
nuevaCard.classList.add("card");
nuevaCard.dataset.id        = "7";
nuevaCard.dataset.categoria = "perifericos";

// innerHTML para construir el contenido interno
nuevaCard.innerHTML = `
  <div class="card__imagen">🖨️</div>
  <div class="card__cuerpo">
    <span class="card__categoria">Periféricos</span>
    <h3 class="card__nombre">Impresora Multifunción</h3>
    <p class="card__descripcion">Wi-Fi · Escáner · Impresión duplex</p>
    <div class="card__footer">
      <span class="card__precio" data-precio="75000">$75.000</span>
      <button class="btn btn--agregar" data-id="7">Agregar</button>
    </div>
  </div>
`;

// append → inserta al final del contenedor
const grilla = document.querySelector("#grillaProdutos");
grilla.append(nuevaCard);
console.log("Card nueva agregada. Total:", document.querySelectorAll(".card").length);

// Actualizar el contador de productos
const contadorProductos = document.querySelector("#contadorProductos");
const totalCards = document.querySelectorAll(".card").length;
contadorProductos.textContent = `Mostrando ${totalCards} productos`;

// remove → elimina un elemento del DOM
// Para ver el efecto, descomentar:
// nuevaCard.remove();
// console.log("Card eliminada. Total:", document.querySelectorAll(".card").length);

// insertBefore — insertar antes de un elemento específico
const primerCardDelDOM = grilla.querySelector(".card");
const cardDestacada = document.createElement("article");
cardDestacada.classList.add("card");
cardDestacada.innerHTML = `
  <div class="card__badge">⭐ Nuevo</div>
  <div class="card__imagen">📱</div>
  <div class="card__cuerpo">
    <span class="card__categoria">Computación</span>
    <h3 class="card__nombre">Tablet 10"</h3>
    <p class="card__descripcion">Android 13 · 64GB · 4G LTE</p>
    <div class="card__footer">
      <span class="card__precio" data-precio="120000">$120.000</span>
      <button class="btn btn--agregar" data-id="8">Agregar</button>
    </div>
  </div>
`;
grilla.insertBefore(cardDestacada, primerCardDelDOM);


// ============================================================
//  7. RECORRER EL DOM: parentElement, children, siblings
// ============================================================

console.log("\n--- Navegación del DOM ---");

const unaCard = document.querySelector("[data-id='3']"); // card del mouse

console.log("El elemento:", unaCard.tagName);
console.log("Su padre:", unaCard.parentElement.id);          // grillaProdutos
console.log("Sus hijos:", unaCard.children.length);          // 2 (imagen + cuerpo)
console.log("Hermano anterior:", unaCard.previousElementSibling?.dataset.id);
console.log("Hermano siguiente:", unaCard.nextElementSibling?.dataset.id);

// querySelector dentro de un elemento (no busca en todo el documento)
const nombreDelMouse = unaCard.querySelector(".card__nombre").textContent;
console.log("Nombre del producto en card 3:", nombreDelMouse);


// ============================================================
//  RESUMEN DE MÉTODOS VISTOS
// ============================================================
//
//  SELECCIÓN
//    document.getElementById("id")
//    document.querySelector("selector")       → primero
//    document.querySelectorAll("selector")    → todos (NodeList)
//
//  CONTENIDO
//    elemento.textContent    → texto plano
//    elemento.innerHTML      → HTML (con precaución)
//    input.value             → valor de un input
//
//  ATRIBUTOS
//    elemento.getAttribute("attr")
//    elemento.setAttribute("attr", "valor")
//    elemento.dataset.nombreAtributo          → data-nombre-atributo
//
//  CLASES
//    elemento.classList.add("clase")
//    elemento.classList.remove("clase")
//    elemento.classList.toggle("clase")
//    elemento.classList.contains("clase")
//
//  ESTILOS
//    elemento.style.propiedad = "valor"
//    window.getComputedStyle(elemento)
//
//  CREAR / ELIMINAR
//    document.createElement("tag")
//    padre.append(hijo)
//    padre.insertBefore(nuevo, referencia)
//    elemento.remove()
//
// ============================================================


// ============================================================
//  EJERCICIOS
// ============================================================
//
//  1. Seleccionar todos los elementos .card__nombre y mostrar sus
//     textos en consola usando querySelectorAll + forEach.
//
//  2. Cambiar el textContent del título del hero con el nombre
//     de tu tienda inventada.
//
//  3. Seleccionar la card con data-id="4" (Monitor).
//     Usando classList, agregarle un estilo especial con toggle.
//     Verificar con contains que la clase fue agregada.
//
//  4. Crear dinámicamente un nuevo elemento <article class="card">
//     con un producto inventado y agregarlo al final de la grilla.
//     Actualizar el contador de productos.
//
//  5. DESAFÍO: Recorrer todas las cards y calcular el precio promedio
//     usando dataset.precio. Mostrar el resultado en el subtítulo
//     de la sección productos.
//
// ============================================================

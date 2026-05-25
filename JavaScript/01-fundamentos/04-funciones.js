// ============================================================
//  04 · FUNCIONES
//  Laboratorio de Programación — 2° año
//  Tecnicatura en Desarrollo de Software
// ============================================================
//
//  Temas:
//    · Funciones declaradas
//    · Funciones expresadas
//    · Arrow functions
//    · Parámetros: default, rest
//    · Scope: global, local, bloque
//    · Closures (intro)
//    · Funciones de orden superior (intro)
//    · Recursión (intro)
//
//  Cómo ejecutar: Ctrl+Alt+N con la extensión Code Runner
// ============================================================


// ------------------------------------------------------------
//  1. FUNCIONES DECLARADAS (Function Declaration)
// ------------------------------------------------------------

console.log("--- FUNCIONES DECLARADAS ---\n");

// Se pueden llamar ANTES de donde están definidas (hoisting).
// El motor de JS "sube" las declaraciones al inicio del archivo.

console.log(sumar(3, 4)); // funciona antes de la declaración

function sumar(a, b) {
  return a + b;
}

function saludar(nombre) {
  return `Hola, ${nombre}!`;
}

function calcularPromedio(n1, n2, n3) {
  const suma = n1 + n2 + n3;
  return suma / 3;
}

console.log(saludar("Rodrigo"));
console.log("Promedio:", calcularPromedio(70, 85, 92));

// Una función sin return devuelve undefined
function sinRetorno() {
  const mensaje = "Esta función no devuelve nada.";
  // no hay return
}
console.log("Sin retorno:", sinRetorno()); // undefined


// ------------------------------------------------------------
//  2. FUNCIONES EXPRESADAS (Function Expression)
// ------------------------------------------------------------

console.log("\n--- FUNCIONES EXPRESADAS ---\n");

// La función se asigna a una variable.
// NO tienen hoisting: no se pueden llamar antes de definirse.

const restar = function(a, b) {
  return a - b;
};

const calcularDescuento = function(precio, porcentaje) {
  const descuento = precio * (porcentaje / 100);
  return precio - descuento;
};

console.log("Resta:", restar(10, 3));
console.log("Precio con descuento:", calcularDescuento(1500, 20));

// Las funciones son valores en JS: se pueden guardar en variables,
// pasar como argumentos, devolver desde otras funciones.


// ------------------------------------------------------------
//  3. ARROW FUNCTIONS (Funciones flecha)
// ------------------------------------------------------------

console.log("\n--- ARROW FUNCTIONS ---\n");

// Sintaxis más concisa introducida en ES6.
// No tienen su propio 'this' (importante en POO y eventos).

// Forma completa
const multiplicar = (a, b) => {
  return a * b;
};

// Return implícito (cuando el cuerpo es una sola expresión)
const dividir = (a, b) => a / b;

// Un solo parámetro: paréntesis opcionales
const cuadrado = n => n * n;

// Sin parámetros: paréntesis obligatorios
const obtenerFecha = () => new Date().toLocaleDateString("es-AR");

console.log("Multiplicar:", multiplicar(6, 7));
console.log("Dividir:", dividir(20, 4));
console.log("Cuadrado de 9:", cuadrado(9));
console.log("Fecha actual:", obtenerFecha());

// Comparación de las tres formas haciendo lo mismo:
function elevarAlCubo_declarada(n)  { return n ** 3; }
const elevarAlCubo_expresada = function(n) { return n ** 3; };
const elevarAlCubo_arrow     = n => n ** 3;

console.log("\nLas tres formas, mismo resultado:");
console.log(elevarAlCubo_declarada(3));
console.log(elevarAlCubo_expresada(3));
console.log(elevarAlCubo_arrow(3));


// ------------------------------------------------------------
//  4. PARÁMETROS: DEFAULT Y REST
// ------------------------------------------------------------

console.log("\n--- PARÁMETROS DEFAULT ---\n");

// Si no se pasa un argumento, usa el valor por defecto.
function crearSaludo(nombre, saludo = "Hola") {
  return `${saludo}, ${nombre}!`;
}

console.log(crearSaludo("Lucía"));              // Hola, Lucía!
console.log(crearSaludo("Carlos", "Buenos días")); // Buenos días, Carlos!

function calcularPrecio(precio, descuento = 0, iva = 0.21) {
  const conDescuento = precio * (1 - descuento);
  return conDescuento * (1 + iva);
}

console.log("Precio final:", calcularPrecio(1000).toFixed(2));         // con IVA
console.log("Precio final:", calcularPrecio(1000, 0.10).toFixed(2));   // con descuento y IVA

console.log("\n--- PARÁMETROS REST ---\n");

// ...rest captura todos los argumentos restantes en un array.
// Siempre debe ser el último parámetro.

function sumarTodos(...numeros) {
  return numeros.reduce((acumulador, n) => acumulador + n, 0);
}

console.log("Suma:", sumarTodos(1, 2, 3));         // 6
console.log("Suma:", sumarTodos(10, 20, 30, 40));  // 100
console.log("Suma:", sumarTodos(5));               // 5

function registrarLog(nivel, ...mensajes) {
  console.log(`[${nivel.toUpperCase()}]`, mensajes.join(" | "));
}

registrarLog("info", "Usuario conectado", "IP: 192.168.1.1");
registrarLog("error", "Timeout", "Reconexión fallida");


// ------------------------------------------------------------
//  5. SCOPE (ALCANCE)
// ------------------------------------------------------------

console.log("\n--- SCOPE ---\n");

// GLOBAL: accesible desde cualquier parte
const appVersion = "1.0.0";

function mostrarVersion() {
  console.log("Versión:", appVersion); // accede a la variable global
}
mostrarVersion();

// LOCAL (de función): solo existe dentro de la función
function calcular() {
  const resultado = 42; // variable local
  console.log("Dentro de la función:", resultado);
}
calcular();
// console.log(resultado); // Error: resultado is not defined

// DE BLOQUE: let y const solo existen dentro del {}
{
  let bloque = "solo existo aquí";
  const bloqueConst = "yo también";
  console.log("Dentro del bloque:", bloque);
}
// console.log(bloque); // Error: bloque is not defined

// var ignora el scope de bloque (una razón más para no usarlo)
{
  var varGlobal = "var se escapa del bloque";
}
console.log("Fuera del bloque:", varGlobal); // funciona (y es un problema)

// SHADOWING: variable local con el mismo nombre que una global
const color = "rojo"; // global

function pintarPared() {
  const color = "azul"; // local — "sombrea" la global
  console.log("Color de la pared:", color); // azul
}

pintarPared();
console.log("Color global:", color); // rojo — la global no se modificó


// ------------------------------------------------------------
//  6. CLOSURES (INTRO)
// ------------------------------------------------------------

console.log("\n--- CLOSURES ---\n");

// Un closure es una función que recuerda el scope en el que fue creada,
// incluso después de que ese scope ya no esté activo.

function crearContador() {
  let conteo = 0; // esta variable "vive" gracias al closure

  return function() {
    conteo++;
    return conteo;
  };
}

const contador1 = crearContador();
const contador2 = crearContador(); // instancia independiente

console.log(contador1()); // 1
console.log(contador1()); // 2
console.log(contador1()); // 3
console.log(contador2()); // 1 ← instancia propia, empieza de cero

// Caso de uso real: función que genera saludos con prefijo fijo
function crearSaludador(prefijo) {
  return nombre => `${prefijo}, ${nombre}!`;
}

const saludarFormal = crearSaludador("Buenos días");
const saludarInformal = crearSaludador("Hola");

console.log(saludarFormal("Señora García"));
console.log(saludarInformal("Martín"));


// ------------------------------------------------------------
//  7. FUNCIONES DE ORDEN SUPERIOR (INTRO)
// ------------------------------------------------------------

console.log("\n--- FUNCIONES DE ORDEN SUPERIOR ---\n");

// Una función de orden superior recibe funciones como argumento
// o devuelve una función como resultado.
// Son la base de map, filter, reduce (los vemos en arrays).

function aplicarOperacion(a, b, operacion) {
  return operacion(a, b);
}

const suma  = (x, y) => x + y;
const resta = (x, y) => x - y;
const mayor = (x, y) => x > y ? x : y;

console.log("Suma:  ", aplicarOperacion(10, 5, suma));
console.log("Resta: ", aplicarOperacion(10, 5, resta));
console.log("Mayor: ", aplicarOperacion(10, 5, mayor));

// Ejecutar una función N veces
function repetir(n, accion) {
  for (let i = 1; i <= n; i++) {
    accion(i);
  }
}

repetir(3, i => console.log(`Repetición ${i}`));


// ------------------------------------------------------------
//  8. RECURSIÓN (INTRO)
// ------------------------------------------------------------

console.log("\n--- RECURSIÓN ---\n");

// Una función recursiva es aquella que se llama a sí misma.
// Necesita una condición de parada para no ser infinita.

// Factorial: 5! = 5 × 4 × 3 × 2 × 1 = 120
function factorial(n) {
  if (n <= 1) return 1;          // caso base (condición de parada)
  return n * factorial(n - 1);   // llamada recursiva
}

console.log("5! =", factorial(5));   // 120
console.log("10! =", factorial(10)); // 3628800

// Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13...
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("\nSerie Fibonacci (primeros 8 términos):");
for (let i = 0; i < 8; i++) {
  process.stdout.write(fibonacci(i) + " ");
}
console.log();


// ============================================================
//  EJERCICIOS
// ============================================================
//
//  1. Escribir las siguientes funciones en sus tres formas
//     (declarada, expresada, arrow):
//     · calcularIMC(peso, altura) → peso / (altura * altura)
//     · esPalindromo(texto) → true si se lee igual al revés
//
//  2. Crear una función calcularTotal(subtotal, descuento = 0, iva = 0.21)
//     que devuelva el precio final formateado con dos decimales.
//
//  3. Crear una función ...rest que reciba un nombre y una cantidad
//     indefinida de materias aprobadas. Devolver cuántas aprobó y cuáles.
//
//  4. Escribir una función crearMultiplicador(factor) que devuelva
//     una función que multiplique cualquier número por ese factor.
//     Ejemplo: const triple = crearMultiplicador(3); triple(7) → 21
//
//  5. DESAFÍO: Escribir una función recursiva que calcule la potencia
//     de un número sin usar el operador **. potencia(2, 8) → 256
//
// ============================================================

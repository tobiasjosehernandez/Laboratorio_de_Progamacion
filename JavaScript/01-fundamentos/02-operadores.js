// ============================================================
//  02 · OPERADORES
//  Laboratorio de Programación — 2° año
//  Tecnicatura en Desarrollo de Software
// ============================================================
//
//  Temas:
//    · Operadores aritméticos
//    · Operadores de asignación
//    · Operadores de comparación: == vs ===
//    · Operadores lógicos: &&, ||, !
//    · Operador ternario
//    · Operadores de cortocircuito (??, ||)
//    · Operador de encadenamiento opcional (?.)
//
//  Cómo ejecutar: Ctrl+Alt+N con la extensión Code Runner
// ============================================================


// ------------------------------------------------------------
//  1. OPERADORES ARITMÉTICOS
// ------------------------------------------------------------

const a = 17;
const b = 5;

console.log("--- ARITMÉTICOS ---");
console.log(`${a} + ${b} =`, a + b);    // 22  → suma
console.log(`${a} - ${b} =`, a - b);    // 12  → resta
console.log(`${a} * ${b} =`, a * b);    // 85  → multiplicación
console.log(`${a} / ${b} =`, a / b);    // 3.4 → división (siempre decimal si no es exacta)
console.log(`${a} % ${b} =`, a % b);    // 2   → módulo (resto de la división entera)
console.log(`${a} ** ${b} =`, a ** b);  // 1419857 → potencia

// El módulo (%) es más útil de lo que parece:
//   · Saber si un número es par o impar
//   · Ciclos que se reinician cada N pasos
//   · Distribuir elementos en columnas

const numero = 24;
console.log(`\n¿${numero} es par?`, numero % 2 === 0 ? "Sí" : "No");

// Incremento y decremento
let contador = 10;
console.log("\n--- INCREMENTO / DECREMENTO ---");
console.log("Valor inicial:", contador);
contador++;
console.log("Después de ++:", contador);    // 11
contador--;
console.log("Después de --:", contador);    // 10
contador += 5;
console.log("Después de += 5:", contador);  // 15
contador *= 2;
console.log("Después de *= 2:", contador);  // 30


// ------------------------------------------------------------
//  2. OPERADORES DE ASIGNACIÓN
// ------------------------------------------------------------

console.log("\n--- ASIGNACIÓN ---");

let x = 100;
console.log("x =", x);

x += 20;   console.log("x += 20 →", x);   // 120
x -= 15;   console.log("x -= 15 →", x);   // 105
x *= 2;    console.log("x *= 2  →", x);   // 210
x /= 3;    console.log("x /= 3  →", x);   // 70
x %= 8;    console.log("x %= 8  →", x);   // 6
x **= 2;   console.log("x **= 2 →", x);   // 36


// ------------------------------------------------------------
//  3. OPERADORES DE COMPARACIÓN
// ------------------------------------------------------------

console.log("\n--- COMPARACIÓN ---");

// == comparación débil: convierte tipos antes de comparar
console.log('5 == "5"  :', 5 == "5");     // true  ← peligroso
console.log('0 == false:', 0 == false);   // true  ← peligroso
console.log('null == undefined:', null == undefined); // true ← trampa

// === comparación estricta: compara tipo Y valor
console.log('\n5 === "5"  :', 5 === "5");    // false ← correcto
console.log('5 === 5    :', 5 === 5);        // true
console.log('0 === false:', 0 === false);    // false

// Regla absoluta: usar siempre === y !==
// El == solo existe en JS por compatibilidad histórica.

console.log("\n> < >= <=");
console.log("10 > 5  :", 10 > 5);     // true
console.log("10 < 5  :", 10 < 5);     // false
console.log("10 >= 10:", 10 >= 10);   // true
console.log("10 <= 9 :", 10 <= 9);    // false

// Comparación de strings (orden lexicográfico)
console.log('\n"banana" > "apple":', "banana" > "apple");   // true
console.log('"a" < "b"         :', "a" < "b");              // true


// ------------------------------------------------------------
//  4. OPERADORES LÓGICOS
// ------------------------------------------------------------

console.log("\n--- LÓGICOS ---");

const edadUsuario   = 20;
const tieneCuenta   = true;
const estaVerificado = false;

// AND (&&) — verdadero solo si AMBAS condiciones son verdaderas
const puedeOperar = edadUsuario >= 18 && tieneCuenta;
console.log("¿Puede operar?", puedeOperar);   // true

// OR (||) — verdadero si AL MENOS UNA condición es verdadera
const puedeVer = tieneCuenta || estaVerificado;
console.log("¿Puede ver?", puedeVer);          // true

// NOT (!) — invierte el valor booleano
console.log("¿No verificado?", !estaVerificado);  // true
console.log("¿No tiene cuenta?", !tieneCuenta);   // false

// Combinación de operadores lógicos
const accesoTotal = edadUsuario >= 18 && tieneCuenta && estaVerificado;
console.log("¿Acceso total?", accesoTotal);    // false (estaVerificado es false)


// ------------------------------------------------------------
//  5. VALORES FALSY Y TRUTHY
// ------------------------------------------------------------

// En JS, todo valor puede evaluarse como verdadero o falso en un contexto booleano.

// FALSY (se comportan como false):
//   false, 0, -0, 0n, "", '', ``, null, undefined, NaN

// TRUTHY (todo lo demás, incluyendo):
//   true, 1, "hola", [], {}, function(){}

console.log("\n--- FALSY ---");
console.log(Boolean(false));      // false
console.log(Boolean(0));          // false
console.log(Boolean(""));         // false
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
console.log(Boolean(NaN));        // false

console.log("\n--- TRUTHY ---");
console.log(Boolean(1));          // true
console.log(Boolean("0"));        // true  ← string "0" es truthy
console.log(Boolean([]));         // true  ← array vacío es truthy
console.log(Boolean({}));         // true  ← objeto vacío es truthy


// ------------------------------------------------------------
//  6. OPERADOR TERNARIO
// ------------------------------------------------------------

// Sintaxis: condición ? valorSiTrue : valorSiFalse
// Ideal para asignaciones simples. No abusar en lógica compleja.

console.log("\n--- TERNARIO ---");

const puntaje = 75;
const resultado = puntaje >= 60 ? "Aprobado" : "Desaprobado";
console.log(`Puntaje ${puntaje}: ${resultado}`);

// Ternario anidado (usar con criterio — puede volverse ilegible)
const nota = puntaje >= 90 ? "Sobresaliente"
           : puntaje >= 75 ? "Muy bueno"
           : puntaje >= 60 ? "Aprobado"
           : "Desaprobado";
console.log(`Nota: ${nota}`);

// Equivalente con if/else (más claro para lógica compleja)
let notaConIf;
if (puntaje >= 90)      notaConIf = "Sobresaliente";
else if (puntaje >= 75) notaConIf = "Muy bueno";
else if (puntaje >= 60) notaConIf = "Aprobado";
else                    notaConIf = "Desaprobado";
console.log(`Nota (if/else): ${notaConIf}`);


// ------------------------------------------------------------
//  7. CORTOCIRCUITO: || y &&
// ------------------------------------------------------------

// Los operadores lógicos no siempre devuelven true/false.
// Devuelven UNO DE LOS OPERANDOS según la evaluación.

console.log("\n--- CORTOCIRCUITO ---");

// || devuelve el primer valor TRUTHY que encuentra
const nombreIngresado = "";
const nombreMostrado = nombreIngresado || "Anónimo";
console.log("Nombre:", nombreMostrado);   // "Anónimo"

const puerto = 0 || 3000;
console.log("Puerto:", puerto);           // 3000  ← 0 es falsy, toma 3000

// && devuelve el primer valor FALSY, o el último si todos son truthy
const usuarioLogueado = true;
const saludo = usuarioLogueado && "Bienvenido";
console.log("Saludo:", saludo);           // "Bienvenido"

const sinLogin = false;
const saludoSinLogin = sinLogin && "Bienvenido";
console.log("Sin login:", saludoSinLogin); // false


// ------------------------------------------------------------
//  8. NULLISH COALESCING (??)
// ------------------------------------------------------------

// ?? devuelve el lado derecho SOLO si el izquierdo es null o undefined.
// Diferencia clave con ||: no trata 0 o "" como falsy.

console.log("\n--- NULLISH COALESCING (??) ---");

const config = {
  timeout: 0,
  nombre: ""
};

// Con ||: 0 y "" son falsy, toma el valor por defecto (incorrecto)
console.log("timeout con || :", config.timeout || 5000);   // 5000 ← incorrecto
console.log('nombre  con || :', config.nombre  || "default"); // "default" ← incorrecto

// Con ??: solo activa si es null o undefined (correcto)
console.log("timeout con ?? :", config.timeout ?? 5000);   // 0     ← correcto
console.log('nombre  con ?? :', config.nombre  ?? "default"); // ""   ← correcto

const valorNulo = null;
console.log("null    con ?? :", valorNulo ?? "valor por defecto"); // "valor por defecto"


// ------------------------------------------------------------
//  9. ENCADENAMIENTO OPCIONAL (?.)
// ------------------------------------------------------------

// Accede a propiedades de un objeto sin romperse si algún nivel es null o undefined.

console.log("\n--- ENCADENAMIENTO OPCIONAL (?.) ---");

const usuario = {
  nombre: "Lucía",
  direccion: {
    ciudad: "Tucumán"
  }
};

const usuarioSinDireccion = {
  nombre: "Carlos"
};

// Sin ?. → error si la propiedad no existe
// console.log(usuarioSinDireccion.direccion.ciudad); // TypeError

// Con ?. → devuelve undefined en vez de romper
console.log(usuario.direccion?.ciudad);              // "Tucumán"
console.log(usuarioSinDireccion.direccion?.ciudad);  // undefined

// Muy útil cuando trabajamos con datos de APIs (puede faltar información)


// ============================================================
//  EJERCICIOS
// ============================================================
//
//  1. Declarar dos números. Mostrar todos los operadores aritméticos aplicados.
//     Para el módulo, indicar si el primero es par o impar usando ternario.
//
//  2. Comparar los mismos dos números con == y con ===.
//     Luego hacerlo con un número y un string del mismo valor.
//     Ejemplo: let a = 5; let b = "5";
//     ¿En cuál caso difieren == y ===?
//
//  3. Crear tres variables booleanas que representen condiciones de acceso
//     a un sistema (ej: estaLogueado, tienePermiso, estaActivo).
//     Usar &&, || y ! para mostrar distintos niveles de acceso.
//
//  4. Usar el operador ?? para manejar valores de configuración que pueden
//     ser 0, false, "" o null. Mostrar la diferencia con ||.
//
//  5. DESAFÍO: sin usar if, determinar si un año es bisiesto usando solo
//     operadores. Un año es bisiesto si:
//     · es divisible por 4, Y
//     · no es divisible por 100, O
//     · sí es divisible por 400.
//
// ============================================================

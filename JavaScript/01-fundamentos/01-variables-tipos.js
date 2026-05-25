// ============================================================
//  01 · VARIABLES Y TIPOS DE DATOS
//  Laboratorio de Programación — 2° año
//  Tecnicatura en Desarrollo de Software
// ============================================================
//
//  Temas:
//    · Declaración de variables: var, let, const
//    · Tipos primitivos: string, number, boolean, null, undefined
//    · Tipo de referencia: object (intro)
//    · Operador typeof
//    · Conversión de tipos: implícita y explícita
//    · Template literals
//
//  Cómo ejecutar: Ctrl+Alt+N con la extensión Code Runner
// ============================================================


// ------------------------------------------------------------
//  1. DECLARACIÓN DE VARIABLES
// ------------------------------------------------------------

// var — forma antigua. Tiene alcance de función y permite
// redeclarar la misma variable sin error. Evitarla en código nuevo.

var ciudad = "Tucumán";
var ciudad = "Buenos Aires"; // no da error → problema silencioso
console.log("var (redeclarada):", ciudad);

// ------------------------------------------------------------

// let — forma moderna. Alcance de bloque {}.
// Se puede reasignar pero no redeclarar.

let temperatura = 28;
temperatura = 31;          // reasignación → ok
// let temperatura = 35;   // redeclaración → Error (descomentar para ver)
console.log("let (reasignada):", temperatura);

// ------------------------------------------------------------

// const — para valores que no cambian.
// No se puede reasignar ni redeclarar.
// Es la opción preferida por defecto.

const PAIS = "Argentina";
// PAIS = "Chile";          // Error → descomentar para ver
console.log("const:", PAIS);

// Regla práctica:
//   · Usá const siempre que puedas.
//   · Si necesitás reasignar, usá let.
//   · Nunca uses var en código nuevo.


// ------------------------------------------------------------
//  2. TIPOS PRIMITIVOS
// ------------------------------------------------------------

// STRING — cadenas de texto
const nombre     = "Rodrigo";
const apellido   = 'Lobo';
const profesion  = `Docente`;          // template literal (comilla invertida)

console.log("\n--- STRING ---");
console.log(nombre, apellido, profesion);
console.log("Longitud:", nombre.length);
console.log("Mayúsculas:", nombre.toUpperCase());
console.log("Incluye 'rod':", nombre.toLowerCase().includes("rod"));

// ------------------------------------------------------------

// NUMBER — enteros y decimales en un solo tipo
const edad      = 30;
const precio    = 1500.75;
const infinito  = Infinity;
const noEsNum   = NaN;              // Not a Number — resultado de operación inválida

console.log("\n--- NUMBER ---");
console.log("Edad:", edad);
console.log("Precio:", precio);
console.log("Infinity:", infinito);
console.log("NaN:", noEsNum);
console.log("¿Es NaN?:", isNaN(noEsNum));   // usar isNaN() para verificar
console.log("¿Es finito?:", isFinite(precio));

// ------------------------------------------------------------

// BOOLEAN — solo dos valores posibles: true o false
const esMayorDeEdad = true;
const tieneDescuento = false;

console.log("\n--- BOOLEAN ---");
console.log("Mayor de edad:", esMayorDeEdad);
console.log("Tiene descuento:", tieneDescuento);

// ------------------------------------------------------------

// NULL — ausencia de valor intencional
// El desarrollador asigna null explícitamente.
let usuarioActivo = null;

console.log("\n--- NULL ---");
console.log("Usuario activo:", usuarioActivo);

// ------------------------------------------------------------

// UNDEFINED — variable declarada pero sin valor asignado
let direccion;

console.log("\n--- UNDEFINED ---");
console.log("Dirección:", direccion);

// Diferencia clave:
//   null      → "sé que no hay valor, lo indiqué yo"
//   undefined → "nunca se le asignó nada"


// ------------------------------------------------------------
//  3. OPERADOR typeof
// ------------------------------------------------------------

console.log("\n--- typeof ---");
console.log(typeof nombre);          // "string"
console.log(typeof edad);            // "number"
console.log(typeof esMayorDeEdad);   // "boolean"
console.log(typeof usuarioActivo);   // "object" ← bug histórico de JS, no es un error tuyo
console.log(typeof direccion);       // "undefined"
console.log(typeof undefined);       // "undefined"

// ⚠️  typeof null === "object" es un error del diseño original
//     de JavaScript (1995) que nunca se corrigió para no romper
//     código existente. Tenelo presente.


// ------------------------------------------------------------
//  4. TEMPLATE LITERALS
// ------------------------------------------------------------

const producto = "Notebook";
const stock    = 5;
const iva      = 0.21;
const precioFinal = precio * (1 + iva);

console.log("\n--- TEMPLATE LITERALS ---");

// Forma antigua (concatenación con +)
console.log("Producto: " + producto + " | Stock: " + stock);

// Forma moderna (template literal con ${expresión})
console.log(`Producto: ${producto} | Stock: ${stock}`);
console.log(`Precio con IVA: $${precioFinal.toFixed(2)}`);

// Los template literals también permiten múltiples líneas
const ficha = `
  Producto : ${producto}
  Stock    : ${stock} unidades
  Precio   : $${precioFinal.toFixed(2)}
`;
console.log(ficha);


// ------------------------------------------------------------
//  5. CONVERSIÓN DE TIPOS
// ------------------------------------------------------------

console.log("--- CONVERSIÓN IMPLÍCITA (coerción) ---");

// JS convierte tipos automáticamente. El resultado puede sorprender.
console.log("5" + 3);        // "53"  → + con string concatena
console.log("5" - 3);        // 2     → - convierte a number
console.log("5" * "2");      // 10    → * convierte ambos
console.log(true + 1);       // 2     → true es 1
console.log(false + 1);      // 1     → false es 0
console.log(null + 1);       // 1     → null es 0
console.log(undefined + 1);  // NaN   → undefined no tiene valor numérico

// La coerción implícita genera bugs difíciles de encontrar.
// Siempre que necesites convertir, hacélo de forma explícita.

console.log("\n--- CONVERSIÓN EXPLÍCITA ---");

// a Number
console.log(Number("42"));        // 42
console.log(Number("3.14"));      // 3.14
console.log(Number(""));          // 0
console.log(Number("hola"));      // NaN
console.log(Number(true));        // 1
console.log(Number(false));       // 0
console.log(Number(null));        // 0

// a String
console.log(String(100));         // "100"
console.log(String(true));        // "true"
console.log(String(null));        // "null"
console.log((3.14159).toFixed(2));// "3.14"  → útil para precios

// a Boolean
// Valores FALSY (se evalúan como false): false, 0, "", null, undefined, NaN
// Todo lo demás es TRUTHY (se evalúa como true)
console.log(Boolean(0));          // false
console.log(Boolean(""));         // false
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
console.log(Boolean(NaN));        // false
console.log(Boolean(1));          // true
console.log(Boolean("hola"));     // true
console.log(Boolean([]));         // true  ← array vacío es truthy
console.log(Boolean({}));         // true  ← objeto vacío es truthy


// ------------------------------------------------------------
//  6. INTRO A OBJETOS (tipo de referencia)
// ------------------------------------------------------------

// Un objeto agrupa propiedades relacionadas bajo un mismo nombre.
// Lo vamos a ver en profundidad más adelante.
// Por ahora, solo para que lo veas en contexto.

const alumno = {
  nombre: "Lucía",
  edad: 22,
  activa: true
};

console.log("\n--- OBJETO (intro) ---");
console.log(alumno);
console.log("Nombre:", alumno.nombre);
console.log("Tipo:", typeof alumno);   // "object"


// ============================================================
//  EJERCICIOS
// ============================================================
//
//  1. Declarar con const: tu nombre, tu edad y si vivís en Tucumán (boolean).
//     Mostrar cada valor con console.log y su tipo con typeof.
//
//  2. Crear una presentación con template literal:
//     "Me llamo [nombre], tengo [edad] años y vivo en Tucumán: [boolean]"
//
//  3. Intentar reasignar la const del nombre. ¿Qué error aparece?
//     Comentar esa línea para que el archivo pueda seguir corriendo.
//
//  4. Declarar una variable con let sin asignarle valor.
//     ¿Qué devuelve typeof? ¿Y console.log?
//
//  5. Convertir explícitamente:
//     · el string "1984" a número y sumarle 1
//     · el número 0 a boolean
//     · el string vacío "" a boolean
//     Mostrar cada resultado.
//
//  6. DESAFÍO: ¿Por qué typeof null === "object"?
//     Buscá la explicación histórica y escribila como comentario.
//
// ============================================================

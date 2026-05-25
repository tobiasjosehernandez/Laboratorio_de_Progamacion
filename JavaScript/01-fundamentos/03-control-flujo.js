// ============================================================
//  03 · ESTRUCTURAS DE CONTROL
//  Laboratorio de Programación — 2° año
//  Tecnicatura en Desarrollo de Software
// ============================================================
//
//  Temas:
//    · if / else if / else
//    · switch
//    · for
//    · while
//    · do...while
//    · for...of (arrays)
//    · for...in (objetos)
//    · break y continue
//
//  Cómo ejecutar: Ctrl+Alt+N con la extensión Code Runner
// ============================================================


// ------------------------------------------------------------
//  1. IF / ELSE IF / ELSE
// ------------------------------------------------------------

console.log("--- IF / ELSE IF / ELSE ---\n");

const temperatura = 22;

if (temperatura < 0) {
  console.log("Hace mucho frío. Abrigate bien.");
} else if (temperatura < 10) {
  console.log("Hace frío. Llevá abrigo.");
} else if (temperatura < 20) {
  console.log("Temperatura fresca. Un buzo alcanza.");
} else if (temperatura <= 30) {
  console.log("Temperatura agradable.");
} else {
  console.log("Hace calor. Hidratate.");
}

// Las condiciones se evalúan de arriba hacia abajo.
// En cuanto una es verdadera, el resto no se evalúa.

// Bloques de una sola línea — se puede omitir las llaves,
// pero es recomendable siempre usarlas para evitar errores.
const esMayorDeEdad = true;
if (esMayorDeEdad) console.log("\nAcceso permitido.");

// Condiciones compuestas
const usuario = "admin";
const contrasena = "1234";

if (usuario === "admin" && contrasena === "1234") {
  console.log("\nIngreso exitoso como administrador.");
} else if (usuario === "admin") {
  console.log("\nContraseña incorrecta.");
} else {
  console.log("\nUsuario no encontrado.");
}


// ------------------------------------------------------------
//  2. SWITCH
// ------------------------------------------------------------

console.log("\n--- SWITCH ---\n");

// Ideal cuando comparamos UNA variable contra múltiples valores fijos.
// Más legible que un if/else if largo para ese caso.

const diaSemana = 3; // 1=Lunes ... 7=Domingo

switch (diaSemana) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");
    break;
  case 4:
    console.log("Jueves");
    break;
  case 5:
    console.log("Viernes");
    break;
  case 6:
  case 7:
    // Dos cases sin break entre ellos comparten el mismo bloque
    console.log("Fin de semana");
    break;
  default:
    console.log("Día inválido");
}

// ⚠️  Sin break, la ejecución "cae" al siguiente case (fallthrough).
//     Generalmente es un bug, no un feature. Siempre poner break.

// Switch con strings
const estado = "pendiente";

switch (estado) {
  case "pendiente":
    console.log("\nEl pedido está pendiente de confirmación.");
    break;
  case "confirmado":
    console.log("\nEl pedido fue confirmado.");
    break;
  case "enviado":
    console.log("\nEl pedido está en camino.");
    break;
  case "entregado":
    console.log("\nEl pedido fue entregado.");
    break;
  default:
    console.log("\nEstado desconocido.");
}


// ------------------------------------------------------------
//  3. FOR
// ------------------------------------------------------------

console.log("\n--- FOR ---\n");

// Estructura: for (inicialización; condición; actualización)
// Ideal cuando sabemos cuántas veces queremos iterar.

for (let i = 1; i <= 5; i++) {
  console.log(`Iteración ${i}`);
}

// Recorrer un array con for clásico
const frutas = ["manzana", "banana", "naranja", "uva", "pera"];

console.log("\nFrutas:");
for (let i = 0; i < frutas.length; i++) {
  console.log(`  [${i}] ${frutas[i]}`);
}

// Tabla de multiplicar del 7
console.log("\nTabla del 7:");
for (let i = 1; i <= 10; i++) {
  console.log(`  7 x ${i} = ${7 * i}`);
}

// For con paso diferente a 1
console.log("\nNúmeros pares del 0 al 20:");
for (let i = 0; i <= 20; i += 2) {
  process.stdout.write(i + " "); // escribe sin salto de línea
}
console.log();

// For en reversa
console.log("\nCuenta regresiva:");
for (let i = 5; i >= 1; i--) {
  process.stdout.write(i + " ");
}
console.log("¡Despegue!");


// ------------------------------------------------------------
//  4. WHILE
// ------------------------------------------------------------

console.log("\n--- WHILE ---\n");

// Ideal cuando no sabemos exactamente cuántas iteraciones necesitamos.
// La condición se evalúa ANTES de ejecutar el bloque.

let intentos = 0;
const maxIntentos = 3;

while (intentos < maxIntentos) {
  intentos++;
  console.log(`Intento ${intentos} de ${maxIntentos}`);
}
console.log("Fin de intentos.");

// Acumulador con while
let suma = 0;
let n = 1;

while (n <= 100) {
  suma += n;
  n++;
}
console.log(`\nSuma de 1 a 100: ${suma}`); // 5050

// ⚠️  Loop infinito: olvidar actualizar la condición.
//     El siguiente código NUNCA termina (no descomentar):
// while (true) { console.log("infinito"); }


// ------------------------------------------------------------
//  5. DO...WHILE
// ------------------------------------------------------------

console.log("\n--- DO...WHILE ---\n");

// El bloque se ejecuta AL MENOS UNA VEZ antes de evaluar la condición.
// Útil para validaciones donde necesitás ejecutar algo antes de preguntar.

let valor = 0;

do {
  console.log(`Valor actual: ${valor}`);
  valor++;
} while (valor < 3);

// Diferencia clave con while:
//   while    → puede no ejecutarse nunca (si la condición es false desde el inicio)
//   do/while → se ejecuta siempre al menos una vez

let condicionFalsa = false;

console.log("\nwhile con condición false desde el inicio:");
while (condicionFalsa) {
  console.log("Esto nunca se imprime.");
}

console.log("do/while con condición false desde el inicio:");
do {
  console.log("Esto se imprime UNA vez aunque la condición sea false.");
} while (condicionFalsa);


// ------------------------------------------------------------
//  6. FOR...OF (para arrays e iterables)
// ------------------------------------------------------------

console.log("\n--- FOR...OF ---\n");

// Más limpio que el for clásico cuando no necesitamos el índice.

const colores = ["rojo", "verde", "azul", "amarillo"];

for (const color of colores) {
  console.log(`Color: ${color}`);
}

// Con strings también funciona (itera letra por letra)
const palabra = "Tucumán";
console.log("\nLetras de:", palabra);
for (const letra of palabra) {
  process.stdout.write(letra + " ");
}
console.log();

// Si necesitamos índice + valor, usar entries()
console.log("\nCon índice:");
for (const [indice, color] of colores.entries()) {
  console.log(`  [${indice}] ${color}`);
}


// ------------------------------------------------------------
//  7. FOR...IN (para objetos)
// ------------------------------------------------------------

console.log("\n--- FOR...IN ---\n");

// Itera sobre las CLAVES (keys) de un objeto.

const producto = {
  nombre: "Teclado mecánico",
  marca: "Redragon",
  precio: 35000,
  stock: 12,
  disponible: true
};

for (const clave in producto) {
  console.log(`${clave}: ${producto[clave]}`);
}

// ⚠️  No usar for...in para arrays. Usar for...of o forEach.
//     for...in itera claves como strings ("0", "1"...) y puede incluir
//     propiedades heredadas del prototipo.


// ------------------------------------------------------------
//  8. BREAK Y CONTINUE
// ------------------------------------------------------------

console.log("\n--- BREAK ---\n");

// break detiene el loop por completo
const numeros = [3, 7, 2, 9, 4, 1, 8, 5];

console.log("Buscar el primer número mayor que 5:");
for (const num of numeros) {
  if (num > 5) {
    console.log(`Encontrado: ${num}`);
    break; // salimos del loop al encontrarlo
  }
  console.log(`  ${num} no cumple la condición`);
}

console.log("\n--- CONTINUE ---\n");

// continue salta la iteración actual y pasa a la siguiente
console.log("Números del 1 al 10, saltando los múltiplos de 3:");
for (let i = 1; i <= 10; i++) {
  if (i % 3 === 0) continue;
  process.stdout.write(i + " ");
}
console.log();


// ------------------------------------------------------------
//  9. EJEMPLO INTEGRADOR
// ------------------------------------------------------------

console.log("\n--- EJEMPLO INTEGRADOR ---\n");

// Calcular estadísticas básicas de un conjunto de notas

const notas = [78, 45, 92, 61, 88, 34, 75, 90, 55, 82];
let aprobados = 0;
let desaprobados = 0;
let sumaNotas = 0;
let notaMaxima = notas[0];
let notaMinima = notas[0];

for (const nota of notas) {
  sumaNotas += nota;

  if (nota >= 60) {
    aprobados++;
  } else {
    desaprobados++;
  }

  if (nota > notaMaxima) notaMaxima = nota;
  if (nota < notaMinima) notaMinima = nota;
}

const promedio = sumaNotas / notas.length;

console.log(`Total de alumnos : ${notas.length}`);
console.log(`Aprobados        : ${aprobados}`);
console.log(`Desaprobados     : ${desaprobados}`);
console.log(`Promedio         : ${promedio.toFixed(2)}`);
console.log(`Nota más alta    : ${notaMaxima}`);
console.log(`Nota más baja    : ${notaMinima}`);


// ============================================================
//  EJERCICIOS
// ============================================================
//
//  1. Escribir un programa que muestre los números del 1 al 50.
//     · Si el número es múltiplo de 3, mostrar "Fizz"
//     · Si es múltiplo de 5, mostrar "Buzz"
//     · Si es múltiplo de ambos, mostrar "FizzBuzz"
//     · Si no, mostrar el número
//     (Este es el clásico FizzBuzz, presente en casi toda entrevista técnica)
//
//  2. Usando un while, simular el proceso de sacar dinero de un cajero.
//     Saldo inicial: $10.000. El usuario retira $2.500 por operación.
//     Mostrar el saldo después de cada retiro. Detener cuando no alcance.
//
//  3. Recorrer el siguiente objeto con for...in y mostrar solo las propiedades
//     cuyo valor sea de tipo number:
//     const auto = { marca: "Toyota", año: 2020, km: 45000, color: "gris", puertas: 4 }
//
//  4. Dado un array de precios, usar for...of para calcular:
//     · El total
//     · El precio promedio
//     · Cuántos superan el promedio
//
//  5. DESAFÍO: Escribir un programa que encuentre todos los números primos
//     entre 1 y 100 usando bucles anidados. Mostrarlos en una sola línea.
//
// ============================================================

// ============================================================
//  05 · ARRAYS
//  Laboratorio de Programación — 2° año
//  Tecnicatura en Desarrollo de Software
// ============================================================
//
//  Temas:
//    · Creación y acceso
//    · Métodos de mutación: push, pop, shift, unshift, splice
//    · Métodos de iteración: forEach, map, filter, find, findIndex
//    · Métodos de reducción: reduce
//    · Métodos de búsqueda: includes, indexOf, some, every
//    · Métodos de transformación: sort, reverse, flat, join, slice
//    · Spread operator con arrays
//    · Desestructuración de arrays
//
//  Cómo ejecutar: Ctrl+Alt+N con la extensión Code Runner
// ============================================================


// ------------------------------------------------------------
//  1. CREACIÓN Y ACCESO
// ------------------------------------------------------------

console.log("--- CREACIÓN Y ACCESO ---\n");

// Los arrays son listas ordenadas. El índice empieza en 0.
const frutas = ["manzana", "banana", "naranja", "uva", "pera"];

console.log("Array completo:", frutas);
console.log("Longitud:", frutas.length);
console.log("Primer elemento:", frutas[0]);
console.log("Último elemento:", frutas[frutas.length - 1]);
console.log("Último (at):", frutas.at(-1)); // forma moderna, índice negativo

// Arrays mixtos (JS permite mezclar tipos, aunque no es recomendable en producción)
const mixto = [42, "hola", true, null, { id: 1 }, [1, 2]];
console.log("\nArray mixto:", mixto);
console.log("Tipo del cuarto elemento:", typeof mixto[3]); // object (null)

// Array vacío
const vacio = [];
console.log("Array vacío:", vacio, "| Longitud:", vacio.length);


// ------------------------------------------------------------
//  2. MÉTODOS DE MUTACIÓN
//     Modifican el array original. Tener en cuenta el efecto.
// ------------------------------------------------------------

console.log("\n--- MÉTODOS DE MUTACIÓN ---\n");

const tareas = ["Diseñar BD", "Crear rutas", "Implementar vistas"];
console.log("Original:", [...tareas]); // copia para mostrar antes

// push → agrega al final, devuelve la nueva longitud
const nuevaLongitud = tareas.push("Hacer pruebas");
console.log("push:", tareas, "| Nueva longitud:", nuevaLongitud);

// pop → elimina el último, devuelve el elemento eliminado
const eliminado = tareas.pop();
console.log("pop:", tareas, "| Eliminado:", eliminado);

// unshift → agrega al inicio, devuelve la nueva longitud
tareas.unshift("Relevamiento");
console.log("unshift:", tareas);

// shift → elimina el primero, devuelve el elemento eliminado
const primero = tareas.shift();
console.log("shift:", tareas, "| Eliminado:", primero);

// splice(inicio, cantidad, ...elementos) → elimina y/o inserta
// Solo eliminar:
const eliminados = tareas.splice(1, 1);
console.log("splice (eliminar):", tareas, "| Eliminados:", eliminados);

// Insertar sin eliminar:
tareas.splice(1, 0, "Validar formularios", "Conectar API");
console.log("splice (insertar):", tareas);

// Reemplazar:
tareas.splice(2, 1, "Conectar base de datos");
console.log("splice (reemplazar):", tareas);


// ------------------------------------------------------------
//  3. forEach — ITERAR SIN DEVOLVER NADA
// ------------------------------------------------------------

console.log("\n--- forEach ---\n");

// forEach ejecuta una función por cada elemento.
// No devuelve nada (undefined). Solo se usa por sus efectos.

const productos = [
  { nombre: "Notebook", precio: 450000 },
  { nombre: "Monitor",  precio: 180000 },
  { nombre: "Teclado",  precio:  35000 },
  { nombre: "Mouse",    precio:  18000 }
];

productos.forEach((producto, indice) => {
  console.log(`${indice + 1}. ${producto.nombre} — $${producto.precio.toLocaleString("es-AR")}`);
});


// ------------------------------------------------------------
//  4. map — TRANSFORMAR Y DEVOLVER NUEVO ARRAY
// ------------------------------------------------------------

console.log("\n--- map ---\n");

// map crea un NUEVO array aplicando una transformación a cada elemento.
// El array original NO se modifica.

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const cuadrados = numeros.map(n => n ** 2);
console.log("Originales:", numeros);
console.log("Cuadrados: ", cuadrados);

// Con objetos: transformar la estructura
const precios = productos.map(p => ({
  nombre: p.nombre,
  precioConIVA: Math.round(p.precio * 1.21)
}));

console.log("\nPrecios con IVA:");
precios.forEach(p => console.log(`  ${p.nombre}: $${p.precioConIVA.toLocaleString("es-AR")}`));

// Extraer solo un campo
const nombres = productos.map(p => p.nombre);
console.log("\nSolo nombres:", nombres);


// ------------------------------------------------------------
//  5. filter — FILTRAR ELEMENTOS
// ------------------------------------------------------------

console.log("\n--- filter ---\n");

// filter devuelve un NUEVO array con los elementos que cumplen la condición.

const pares = numeros.filter(n => n % 2 === 0);
const impares = numeros.filter(n => n % 2 !== 0);
const mayoresDe5 = numeros.filter(n => n > 5);

console.log("Números:", numeros);
console.log("Pares:", pares);
console.log("Impares:", impares);
console.log("Mayores de 5:", mayoresDe5);

// Con objetos
const productosCaros = productos.filter(p => p.precio >= 100000);
console.log("\nProductos >= $100.000:");
productosCaros.forEach(p => console.log(`  ${p.nombre}`));

// Encadenamiento: filtrar y luego transformar
const nombresBajos = productos
  .filter(p => p.precio < 100000)
  .map(p => p.nombre);
console.log("\nProductos baratos (solo nombres):", nombresBajos);


// ------------------------------------------------------------
//  6. find Y findIndex — BUSCAR UN ELEMENTO
// ------------------------------------------------------------

console.log("\n--- find / findIndex ---\n");

// find → devuelve el PRIMER elemento que cumple la condición (o undefined)
const encontrado = productos.find(p => p.nombre === "Monitor");
console.log("find (Monitor):", encontrado);

const noEncontrado = productos.find(p => p.nombre === "Impresora");
console.log("find (Impresora):", noEncontrado); // undefined

// findIndex → devuelve el ÍNDICE del primer elemento que cumple (o -1)
const indice = productos.findIndex(p => p.precio < 20000);
console.log("findIndex (precio < 20000):", indice, "→", productos[indice].nombre);


// ------------------------------------------------------------
//  7. reduce — REDUCIR A UN SOLO VALOR
// ------------------------------------------------------------

console.log("\n--- reduce ---\n");

// reduce(callback, valorInicial)
// callback recibe: (acumulador, elemento, índice, array)
// Es el método más poderoso y versátil de los arrays.

// Suma de todos los números
const sumaTotal = numeros.reduce((acc, n) => acc + n, 0);
console.log("Suma del 1 al 10:", sumaTotal); // 55

// Total de precios de productos
const totalProductos = productos.reduce((acc, p) => acc + p.precio, 0);
console.log("Total productos: $" + totalProductos.toLocaleString("es-AR"));

// Precio máximo
const masCaroReduce = productos.reduce((max, p) => p.precio > max.precio ? p : max);
console.log("Más caro:", masCaroReduce.nombre);

// Agrupar por rango de precio
const agrupados = productos.reduce((grupos, p) => {
  const clave = p.precio >= 100000 ? "alto" : "bajo";
  grupos[clave].push(p.nombre);
  return grupos;
}, { alto: [], bajo: [] });

console.log("Agrupados por precio:", agrupados);


// ------------------------------------------------------------
//  8. BÚSQUEDA: includes, indexOf, some, every
// ------------------------------------------------------------

console.log("\n--- BÚSQUEDA ---\n");

const lenguajes = ["JavaScript", "Python", "PHP", "TypeScript", "Java"];

// includes → ¿existe el elemento?
console.log("includes 'PHP':", lenguajes.includes("PHP"));       // true
console.log("includes 'Ruby':", lenguajes.includes("Ruby"));     // false

// indexOf → índice del elemento (-1 si no existe)
console.log("indexOf 'Python':", lenguajes.indexOf("Python"));   // 1
console.log("indexOf 'Go':", lenguajes.indexOf("Go"));           // -1

// some → ¿AL MENOS UN elemento cumple la condición?
const hayLenguajesLargos = lenguajes.some(l => l.length > 8);
console.log("some (length > 8):", hayLenguajesLargos);           // true (JavaScript, TypeScript)

// every → ¿TODOS los elementos cumplen la condición?
const todosLargos = lenguajes.every(l => l.length > 3);
console.log("every (length > 3):", todosLargos);                 // true


// ------------------------------------------------------------
//  9. TRANSFORMACIÓN: sort, reverse, slice, join, flat
// ------------------------------------------------------------

console.log("\n--- TRANSFORMACIÓN ---\n");

// sort — ordena el array ORIGINAL (muta)
// ⚠️  Por defecto convierte a strings para comparar → problemas con números
const desordenados = [10, 1, 21, 2, 100, 3];
console.log("Sin comparador:", [...desordenados].sort());             // [1, 10, 100, 2, 21, 3] ← mal
console.log("Con comparador:", [...desordenados].sort((a, b) => a - b)); // [1, 2, 3, 10, 21, 100] ← bien

// sort con strings
const ciudades = ["Tucumán", "Córdoba", "Buenos Aires", "Mendoza"];
console.log("Ciudades ordenadas:", [...ciudades].sort());

// sort por propiedad de objeto
const porPrecio = [...productos].sort((a, b) => a.precio - b.precio);
console.log("\nProductos por precio (asc):");
porPrecio.forEach(p => console.log(`  ${p.nombre}: $${p.precio.toLocaleString("es-AR")}`));

// reverse — invierte el orden ORIGINAL (muta)
const invertido = [1, 2, 3, 4, 5].reverse();
console.log("\nReverse:", invertido);

// slice(inicio, fin) — copia una porción SIN mutar
const frutas2 = ["manzana", "banana", "naranja", "uva", "pera"];
console.log("\nslice(1, 3):", frutas2.slice(1, 3)); // ["banana", "naranja"]
console.log("slice(-2):", frutas2.slice(-2));         // ["uva", "pera"]
console.log("Original intacto:", frutas2);

// join — convierte array a string con separador
console.log("\njoin:", frutas2.join(", "));
console.log("join con ' | ':", frutas2.join(" | "));

// flat — aplana arrays anidados
const anidado = [1, [2, 3], [4, [5, 6]]];
console.log("\nflat(1):", anidado.flat());     // un nivel
console.log("flat(2):", anidado.flat(2));      // dos niveles
console.log("flat(Infinity):", anidado.flat(Infinity)); // todos los niveles


// ------------------------------------------------------------
//  10. SPREAD Y DESESTRUCTURACIÓN
// ------------------------------------------------------------

console.log("\n--- SPREAD CON ARRAYS ---\n");

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combinar arrays sin mutar
const combinado = [...arr1, ...arr2];
console.log("Combinado:", combinado);

// Copiar un array (shallow copy)
const copia = [...frutas2];
copia.push("mango");
console.log("Copia modificada:", copia);
console.log("Original intacto:", frutas2);

// Pasar array como argumentos
const max = Math.max(...numeros);
const min = Math.min(...numeros);
console.log("Máximo:", max, "| Mínimo:", min);

console.log("\n--- DESESTRUCTURACIÓN ---\n");

const colores = ["rojo", "verde", "azul", "amarillo", "violeta"];

const [primario, secundario, ...resto] = colores;
console.log("Primario:", primario);
console.log("Secundario:", secundario);
console.log("Resto:", resto);

// Intercambio de variables sin variable temporal
let x = 10;
let y = 20;
console.log("\nAntes:", x, y);
[x, y] = [y, x];
console.log("Después:", x, y);

// Ignorar elementos
const [,, tercero] = colores;
console.log("Solo el tercero:", tercero); // "azul"


// ============================================================
//  EJERCICIOS
// ============================================================
//
//  1. Dado el array de alumnos con nombre y nota:
//     const alumnos = [
//       { nombre: "Ana",    nota: 85 },
//       { nombre: "Bruno",  nota: 42 },
//       { nombre: "Carla",  nota: 91 },
//       { nombre: "Diego",  nota: 58 },
//       { nombre: "Elena",  nota: 76 }
//     ]
//     Usando los métodos vistos:
//     · Obtener solo los aprobados (nota >= 60)
//     · Obtener los nombres de los aprobados
//     · Calcular el promedio general
//     · Encontrar el alumno con la nota más alta
//
//  2. Dado un array de números desordenados, ordenarlos de mayor a menor
//     y mostrar solo los tres primeros (usando sort + slice).
//
//  3. Crear una función que reciba un array de strings y devuelva
//     un nuevo array con cada string en mayúsculas y sin espacios al inicio/fin.
//     Pista: trim() + toUpperCase()
//
//  4. Usar reduce para contar cuántas veces aparece cada fruta en:
//     const lista = ["manzana", "banana", "manzana", "naranja", "banana", "manzana"]
//     Resultado esperado: { manzana: 3, banana: 2, naranja: 1 }
//
//  5. DESAFÍO: implementar la función aplanarYOrdenar(arr) que recibe
//     un array con cualquier nivel de anidamiento, lo aplana y ordena de menor a mayor.
//     aplanarYOrdenar([3, [1, [4, 1]], [5, [9, 2]]]) → [1, 1, 2, 3, 4, 5, 9]
//
// ============================================================

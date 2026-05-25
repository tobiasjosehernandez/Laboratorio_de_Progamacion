// ============================================================
//  06 · OBJETOS
//  Laboratorio de Programación — 2° año
//  Tecnicatura en Desarrollo de Software
// ============================================================
//
//  Temas:
//    · Creación de objetos literales
//    · Acceso a propiedades: punto y corchetes
//    · Métodos en objetos
//    · this (contexto en métodos)
//    · Desestructuración de objetos
//    · Spread operator con objetos
//    · Object.keys, Object.values, Object.entries
//    · Objetos anidados
//    · Arrays de objetos (patrón más común en aplicaciones reales)
//    · Intro a clases (ES6)
//
//  Cómo ejecutar: Ctrl+Alt+N con la extensión Code Runner
// ============================================================


// ------------------------------------------------------------
//  1. OBJETOS LITERALES
// ------------------------------------------------------------

console.log("--- OBJETO LITERAL ---\n");

// Un objeto agrupa datos relacionados (propiedades) y comportamiento (métodos)
// bajo un único nombre. Es la estructura de datos más usada en JS.

const producto = {
  id: 1,
  nombre: "Notebook",
  marca: "Lenovo",
  precio: 450000,
  stock: 8,
  disponible: true,
  categorias: ["tecnología", "computación"], // propiedad que es array
};

console.log(producto);
console.log("Tipo:", typeof producto); // "object"

// Acceso con punto (cuando la clave es un identificador válido)
console.log("\nNombre:", producto.nombre);
console.log("Precio: $" + producto.precio.toLocaleString("es-AR"));

// Acceso con corchetes (cuando la clave es dinámica o tiene caracteres especiales)
const campo = "marca";
console.log("Campo dinámico:", producto[campo]); // equivale a producto.marca
console.log("Categorías:", producto["categorias"]);

// Agregar propiedades dinámicamente
producto.descripcion = "Procesador Intel i7, 16GB RAM, SSD 512GB";
console.log("\nDescripción agregada:", producto.descripcion);

// Modificar propiedades
producto.precio = 420000;
console.log("Precio actualizado: $" + producto.precio.toLocaleString("es-AR"));

// Eliminar propiedades
delete producto.disponible;
console.log("Disponible (eliminado):", producto.disponible); // undefined

// Verificar si una propiedad existe
console.log("¿Tiene 'stock'?", "stock" in producto);        // true
console.log("¿Tiene 'disponible'?", "disponible" in producto); // false


// ------------------------------------------------------------
//  2. MÉTODOS Y this
// ------------------------------------------------------------

console.log("\n--- MÉTODOS Y this ---\n");

// Los métodos son funciones definidas como propiedades de un objeto.
// 'this' dentro de un método hace referencia al objeto que lo contiene.

const cuenta = {
  titular: "Ana García",
  saldo: 50000,
  moneda: "ARS",

  depositar(monto) {
    this.saldo += monto;
    console.log(`Depósito de $${monto.toLocaleString("es-AR")} realizado.`);
    console.log(`Nuevo saldo: $${this.saldo.toLocaleString("es-AR")}`);
  },

  extraer(monto) {
    if (monto > this.saldo) {
      console.log("Saldo insuficiente.");
      return false;
    }
    this.saldo -= monto;
    console.log(`Extracción de $${monto.toLocaleString("es-AR")} realizada.`);
    console.log(`Nuevo saldo: $${this.saldo.toLocaleString("es-AR")}`);
    return true;
  },

  obtenerResumen() {
    return `Cuenta de ${this.titular} — Saldo: $${this.saldo.toLocaleString("es-AR")} ${this.moneda}`;
  }
};

console.log(cuenta.obtenerResumen());
cuenta.depositar(15000);
cuenta.extraer(80000); // saldo insuficiente
cuenta.extraer(20000);
console.log(cuenta.obtenerResumen());

// ⚠️  Las arrow functions NO tienen su propio 'this'.
//     Para métodos de objetos, usar function() {} o la sintaxis corta nombre() {}


// ------------------------------------------------------------
//  3. DESESTRUCTURACIÓN DE OBJETOS
// ------------------------------------------------------------

console.log("\n--- DESESTRUCTURACIÓN ---\n");

const usuario = {
  id: 42,
  nombre: "Lucía",
  apellido: "Fernández",
  edad: 23,
  email: "lucia@mail.com",
  rol: "admin"
};

// Extraer propiedades en variables
const { nombre, apellido, rol } = usuario;
console.log(`${nombre} ${apellido} — Rol: ${rol}`);

// Renombrar durante la desestructuración
const { nombre: nombreUsuario, email: correo } = usuario;
console.log(`Usuario: ${nombreUsuario} | Correo: ${correo}`);

// Valores por defecto en la desestructuración
const { telefono = "no registrado", edad } = usuario;
console.log(`Tel: ${telefono} | Edad: ${edad}`);

// Desestructuración en parámetros de función
function mostrarUsuario({ nombre, apellido, rol, edad }) {
  console.log(`\n${nombre} ${apellido} | ${rol} | ${edad} años`);
}
mostrarUsuario(usuario);

// Desestructuración con resto
const { id, nombre: n, ...datosExtra } = usuario;
console.log("\nID:", id);
console.log("Datos extra:", datosExtra);


// ------------------------------------------------------------
//  4. SPREAD CON OBJETOS
// ------------------------------------------------------------

console.log("\n--- SPREAD CON OBJETOS ---\n");

const datosBase = {
  activo: true,
  fechaCreacion: "2025-03-01",
  version: "1.0"
};

// Combinar objetos (el último gana en caso de colisión de claves)
const configuracion = {
  ...datosBase,
  nombre: "Mi App",
  version: "2.0" // sobreescribe la versión de datosBase
};
console.log("Configuración:", configuracion);

// Copia superficial (shallow copy)
const original = { a: 1, b: 2, c: { d: 3 } };
const copia = { ...original };
copia.a = 99;       // no afecta al original
copia.c.d = 999;    // SÍ afecta: c es una referencia compartida

console.log("\nOriginal después de modificar la copia:");
console.log("a:", original.a); // 1 — no se afectó
console.log("c.d:", original.c.d); // 999 — sí se afectó (referencia)

// Actualizar una propiedad de forma inmutable (patrón común en React)
const productoActual = { id: 1, nombre: "Teclado", precio: 35000, stock: 10 };
const productoActualizado = { ...productoActual, precio: 38000, stock: 8 };
console.log("\nOriginal:", productoActual);
console.log("Actualizado:", productoActualizado);


// ------------------------------------------------------------
//  5. MÉTODOS DE Object
// ------------------------------------------------------------

console.log("\n--- Object.keys / values / entries ---\n");

const configuracionApp = {
  host: "localhost",
  puerto: 3000,
  bd: "mysql",
  debug: true
};

// Object.keys → array con las claves
console.log("Claves:", Object.keys(configuracionApp));

// Object.values → array con los valores
console.log("Valores:", Object.values(configuracionApp));

// Object.entries → array de pares [clave, valor]
console.log("Entries:");
Object.entries(configuracionApp).forEach(([clave, valor]) => {
  console.log(`  ${clave}: ${valor}`);
});

// Contar propiedades
console.log("Total de propiedades:", Object.keys(configuracionApp).length);

// Object.assign → copia propiedades de un objeto a otro
const destino = { idioma: "es" };
const fuente = { tema: "oscuro", fontSize: 14 };
Object.assign(destino, fuente);
console.log("\nObject.assign:", destino);

// Object.freeze → congela el objeto (no se puede modificar)
const CONSTANTES = Object.freeze({
  PI: 3.14159,
  EULER: 2.71828,
  MAX_REINTENTOS: 3
});
CONSTANTES.PI = 999; // silencioso en modo normal, error en strict mode
console.log("PI después del intento de modificación:", CONSTANTES.PI); // 3.14159


// ------------------------------------------------------------
//  6. OBJETOS ANIDADOS
// ------------------------------------------------------------

console.log("\n--- OBJETOS ANIDADOS ---\n");

const empresa = {
  nombre: "TechCorp S.A.",
  cuit: "30-12345678-9",
  direccion: {
    calle: "Av. Independencia",
    numero: 1500,
    ciudad: "Tucumán",
    provincia: "Tucumán",
    cp: "T4000"
  },
  contacto: {
    email: "info@techcorp.com",
    telefono: "+54 381 000-0000",
    redes: {
      linkedin: "techcorp",
      instagram: "@techcorp_ar"
    }
  }
};

// Acceso encadenado
console.log("Ciudad:", empresa.direccion.ciudad);
console.log("LinkedIn:", empresa.contacto.redes.linkedin);

// Desestructuración anidada
const { nombre: nombreEmpresa, direccion: { ciudad, cp } } = empresa;
console.log(`${nombreEmpresa} — ${ciudad} (CP: ${cp})`);

// Encadenamiento opcional para datos que podrían no existir
console.log("Twitter:", empresa.contacto.redes?.twitter ?? "no registrado");


// ------------------------------------------------------------
//  7. ARRAYS DE OBJETOS (patrón más común en apps reales)
// ------------------------------------------------------------

console.log("\n--- ARRAYS DE OBJETOS ---\n");

// En aplicaciones reales, casi siempre trabajamos con
// arrays de objetos que representan registros de una BD o respuesta de API.

const alumnos = [
  { id: 1, nombre: "Ana",    apellido: "Paz",      nota: 85, aprobado: true  },
  { id: 2, nombre: "Bruno",  apellido: "Sosa",     nota: 42, aprobado: false },
  { id: 3, nombre: "Carla",  apellido: "Torres",   nota: 91, aprobado: true  },
  { id: 4, nombre: "Diego",  apellido: "Ruiz",     nota: 58, aprobado: false },
  { id: 5, nombre: "Elena",  apellido: "Méndez",   nota: 76, aprobado: true  }
];

// Mostrar todos
console.log("Listado:");
alumnos.forEach(a => console.log(`  ${a.id}. ${a.nombre} ${a.apellido} — Nota: ${a.nota}`));

// Filtrar aprobados
const aprobados = alumnos.filter(a => a.aprobado);
console.log(`\nAprobados (${aprobados.length}):`);
aprobados.forEach(a => console.log(`  ${a.nombre} ${a.apellido} — ${a.nota}`));

// Calcular promedio
const promedio = alumnos.reduce((acc, a) => acc + a.nota, 0) / alumnos.length;
console.log(`\nPromedio general: ${promedio.toFixed(2)}`);

// Encontrar el mejor alumno
const mejor = alumnos.reduce((max, a) => a.nota > max.nota ? a : max);
console.log(`Mejor nota: ${mejor.nombre} ${mejor.apellido} — ${mejor.nota}`);

// Ordenar por nota descendente
const porNota = [...alumnos].sort((a, b) => b.nota - a.nota);
console.log("\nRanking por nota:");
porNota.forEach((a, i) => console.log(`  ${i + 1}. ${a.nombre} — ${a.nota}`));

// Buscar por ID (simulando un findById de DB)
const buscarPorId = (id) => alumnos.find(a => a.id === id);
console.log("\nBuscar ID 3:", buscarPorId(3));
console.log("Buscar ID 9:", buscarPorId(9)); // undefined


// ------------------------------------------------------------
//  8. INTRO A CLASES (ES6)
// ------------------------------------------------------------

console.log("\n--- CLASES (intro) ---\n");

// Las clases son una forma más estructurada y legible de crear objetos
// con el mismo molde. Internamente JS usa prototipos, pero las clases
// ofrecen una sintaxis más cercana a otros lenguajes como Java o C#.

class Producto {
  constructor(id, nombre, precio, stock) {
    this.id      = id;
    this.nombre  = nombre;
    this.precio  = precio;
    this.stock   = stock;
  }

  // Método de instancia
  aplicarDescuento(porcentaje) {
    this.precio = this.precio * (1 - porcentaje / 100);
    return this;  // devuelve la instancia para encadenar métodos
  }

  tieneStock() {
    return this.stock > 0;
  }

  // Getter — permite acceder como propiedad, no como método
  get precioConIVA() {
    return Math.round(this.precio * 1.21);
  }

  toString() {
    return `[${this.id}] ${this.nombre} — $${this.precio.toLocaleString("es-AR")}`;
  }
}

// Crear instancias
const p1 = new Producto(1, "Teclado",  35000, 10);
const p2 = new Producto(2, "Monitor", 180000,  3);
const p3 = new Producto(3, "Mouse",    18000,  0);

console.log(p1.toString());
console.log("Precio con IVA:", p1.precioConIVA);
console.log("¿Tiene stock?", p3.tieneStock());

// Encadenamiento de métodos
p2.aplicarDescuento(10);
console.log("Monitor con 10% descuento:", p2.toString());


// ============================================================
//  EJERCICIOS
// ============================================================
//
//  1. Crear un objeto 'libro' con: título, autor, año, páginas, disponible.
//     Agregar un método resumen() que devuelva una descripción completa.
//     Agregar un método prestar() que cambie disponible a false y avise.
//
//  2. Dado el array de alumnos de arriba, construir una función
//     generarReporte(alumnos) que devuelva un OBJETO con:
//     · total, aprobados, desaprobados, promedio, mejor, peor
//
//  3. Crear la clase Alumno con: nombre, apellido, notas (array).
//     Métodos: agregarNota(n), calcularPromedio(), estaAprobado() (prom >= 60).
//     Getter: nombreCompleto.
//     Crear 3 instancias y mostrar el reporte de cada una.
//
//  4. Usar Object.entries para convertir este objeto en un array de strings
//     con formato "clave = valor", y luego unirlos con salto de línea.
//     const config = { host: "localhost", port: 3000, db: "ventas" }
//
//  5. DESAFÍO: Implementar una función agruparPor(array, clave) que agrupe
//     un array de objetos según el valor de una clave.
//     agruparPor(alumnos, "aprobado") →
//       { true: [...], false: [...] }
//
// ============================================================

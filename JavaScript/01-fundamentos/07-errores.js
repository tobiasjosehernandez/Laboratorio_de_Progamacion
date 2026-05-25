// ============================================================
//  07 · MANEJO DE ERRORES
//  Laboratorio de Programación — 2° año
//  Tecnicatura en Desarrollo de Software
// ============================================================
//
//  Temas:
//    · Tipos de errores en JS
//    · try / catch / finally
//    · El objeto Error
//    · Lanzar errores con throw
//    · Errores personalizados (clases que extienden Error)
//    · Buenas prácticas en manejo de errores
//    · Errores comunes que todo desarrollador debe conocer
//
//  Cómo ejecutar: Ctrl+Alt+N con la extensión Code Runner
//
//  Nota: este archivo es el puente entre JS puro y el trabajo
//  con APIs y Node.js, donde el manejo de errores es crítico.
// ============================================================


// ------------------------------------------------------------
//  1. TIPOS DE ERROR EN JAVASCRIPT
// ------------------------------------------------------------

console.log("--- TIPOS DE ERROR ---\n");

// JS tiene varios tipos de error nativos. Conocerlos ayuda a
// identificar rápidamente qué salió mal.

// ReferenceError → variable no declarada
try {
  console.log(variableInexistente);
} catch (error) {
  console.log("ReferenceError:", error.message);
}

// TypeError → operación sobre el tipo equivocado
try {
  null.propiedad;
} catch (error) {
  console.log("TypeError:", error.message);
}

// SyntaxError → código mal escrito (normalmente no se puede capturar en runtime)
// JSON.parse sí puede lanzar SyntaxError:
try {
  JSON.parse("{ mal json }");
} catch (error) {
  console.log("SyntaxError (JSON):", error.message);
}

// RangeError → valor fuera del rango permitido
try {
  new Array(-1);
} catch (error) {
  console.log("RangeError:", error.message);
}

// URIError → malformación en URI
try {
  decodeURIComponent("%");
} catch (error) {
  console.log("URIError:", error.message);
}


// ------------------------------------------------------------
//  2. try / catch / finally
// ------------------------------------------------------------

console.log("\n--- try / catch / finally ---\n");

// try     → bloque donde puede ocurrir un error
// catch   → se ejecuta si ocurre un error en try
// finally → se ejecuta SIEMPRE, haya o no error

function dividir(a, b) {
  try {
    if (typeof a !== "number" || typeof b !== "number") {
      throw new TypeError("Los argumentos deben ser números.");
    }
    if (b === 0) {
      throw new RangeError("No se puede dividir por cero.");
    }
    const resultado = a / b;
    console.log(`${a} / ${b} = ${resultado}`);
    return resultado;
  } catch (error) {
    console.log(`Error (${error.name}): ${error.message}`);
    return null;
  } finally {
    console.log("--- operación finalizada ---");
  }
}

dividir(10, 2);
dividir(10, 0);
dividir(10, "hola");

// finally es útil para liberar recursos, cerrar conexiones,
// ocultar loaders, etc. Se ejecuta sin importar qué pase en try/catch.


// ------------------------------------------------------------
//  3. EL OBJETO Error
// ------------------------------------------------------------

console.log("\n--- EL OBJETO Error ---\n");

// Cuando se captura un error, el objeto tiene propiedades importantes:

try {
  undefined.metodo();
} catch (error) {
  console.log("name   :", error.name);     // tipo de error
  console.log("message:", error.message);  // descripción
  console.log("stack  :", error.stack);    // trazado de la pila (útil para debug)
}

// También se puede crear un Error manualmente
const miError = new Error("Algo salió mal");
console.log("\nError creado manualmente:");
console.log("name:", miError.name);
console.log("message:", miError.message);


// ------------------------------------------------------------
//  4. throw — LANZAR ERRORES INTENCIONALMENTE
// ------------------------------------------------------------

console.log("\n--- throw ---\n");

// throw detiene la ejecución y pasa el control al catch más cercano.
// Se puede lanzar cualquier valor, pero la convención es usar Error o sus subclases.

function validarEdad(edad) {
  if (typeof edad !== "number") throw new TypeError("La edad debe ser un número.");
  if (edad < 0 || edad > 120)  throw new RangeError(`Edad inválida: ${edad}`);
  if (!Number.isInteger(edad)) throw new Error("La edad debe ser un número entero.");
  return true;
}

const edades = [25, -5, 200, "treinta", 30.5];

edades.forEach(edad => {
  try {
    validarEdad(edad);
    console.log(`Edad ${edad}: válida ✓`);
  } catch (error) {
    console.log(`Edad ${edad}: ${error.name} — ${error.message}`);
  }
});


// ------------------------------------------------------------
//  5. ERRORES PERSONALIZADOS
// ------------------------------------------------------------

console.log("\n--- ERRORES PERSONALIZADOS ---\n");

// Extender la clase Error permite crear tipos de error con nombre propio.
// Muy útil en aplicaciones donde necesitamos distinguir entre
// errores de validación, errores de base de datos, errores de autenticación, etc.

class ErrorValidacion extends Error {
  constructor(mensaje, campo) {
    super(mensaje);
    this.name = "ErrorValidacion";
    this.campo = campo;
  }
}

class ErrorAutenticacion extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = "ErrorAutenticacion";
    this.codigo = 401;
  }
}

class ErrorNoEncontrado extends Error {
  constructor(recurso, id) {
    super(`${recurso} con id ${id} no encontrado.`);
    this.name = "ErrorNoEncontrado";
    this.codigo = 404;
  }
}

// Simulación de una función de login
function login(usuario, contrasena) {
  if (!usuario || !contrasena) {
    throw new ErrorValidacion("Todos los campos son obligatorios.", "usuario/contrasena");
  }
  if (usuario !== "admin") {
    throw new ErrorNoEncontrado("Usuario", usuario);
  }
  if (contrasena !== "1234") {
    throw new ErrorAutenticacion("Contraseña incorrecta.");
  }
  return { id: 1, usuario, rol: "admin" };
}

const intentosLogin = [
  { usuario: "",      contrasena: ""     },
  { usuario: "pepe",  contrasena: "abc"  },
  { usuario: "admin", contrasena: "mal"  },
  { usuario: "admin", contrasena: "1234" }
];

intentosLogin.forEach(({ usuario, contrasena }) => {
  try {
    const sesion = login(usuario, contrasena);
    console.log(`Login exitoso: ${sesion.usuario} (${sesion.rol})`);
  } catch (error) {
    if (error instanceof ErrorValidacion) {
      console.log(`[Validación] Campo '${error.campo}': ${error.message}`);
    } else if (error instanceof ErrorAutenticacion) {
      console.log(`[Auth ${error.codigo}] ${error.message}`);
    } else if (error instanceof ErrorNoEncontrado) {
      console.log(`[${error.codigo}] ${error.message}`);
    } else {
      console.log(`[Error desconocido] ${error.message}`);
    }
  }
});


// ------------------------------------------------------------
//  6. PATRONES COMUNES DE MANEJO DE ERRORES
// ------------------------------------------------------------

console.log("\n--- PATRONES COMUNES ---\n");

// Patrón 1: función que devuelve null en vez de romper
function parsearJSON(texto) {
  try {
    return JSON.parse(texto);
  } catch {
    return null;
  }
}

const datos1 = parsearJSON('{"nombre": "Ana", "edad": 22}');
const datos2 = parsearJSON("esto no es json");

console.log("JSON válido:", datos1);
console.log("JSON inválido:", datos2);   // null, no un error

// Patrón 2: función que devuelve objeto {datos, error}
function operacionSegura(fn) {
  try {
    const resultado = fn();
    return { datos: resultado, error: null };
  } catch (error) {
    return { datos: null, error: error.message };
  }
}

const { datos, error } = operacionSegura(() => {
  return JSON.parse('{ "ok": true }');
});

if (error) {
  console.log("Falló:", error);
} else {
  console.log("Éxito:", datos);
}

// Patrón 3: validación centralizada
function validarProducto(producto) {
  const errores = [];

  if (!producto.nombre || producto.nombre.trim() === "") {
    errores.push("El nombre es obligatorio.");
  }
  if (typeof producto.precio !== "number" || producto.precio <= 0) {
    errores.push("El precio debe ser un número mayor a cero.");
  }
  if (typeof producto.stock !== "number" || producto.stock < 0) {
    errores.push("El stock no puede ser negativo.");
  }

  if (errores.length > 0) {
    throw new ErrorValidacion(errores.join(" | "), "producto");
  }

  return true;
}

const productosMalos = [
  { nombre: "",       precio: -100, stock: 5   },
  { nombre: "Mesa",   precio: 0,    stock: -1  },
  { nombre: "Silla",  precio: 5000, stock: 10  }
];

productosMalos.forEach((p, i) => {
  try {
    validarProducto(p);
    console.log(`Producto ${i + 1}: válido ✓`);
  } catch (error) {
    console.log(`Producto ${i + 1}: ${error.message}`);
  }
});


// ------------------------------------------------------------
//  7. ERRORES COMUNES QUE TODO DEV DEBE CONOCER
// ------------------------------------------------------------

console.log("\n--- ERRORES COMUNES ---\n");

// Cannot read properties of undefined (el más frecuente)
const datos = { usuario: { nombre: "Ana" } };

// Forma insegura:
// console.log(datos.cliente.nombre); // TypeError

// Forma segura con encadenamiento opcional:
console.log("Nombre cliente:", datos.cliente?.nombre ?? "no disponible");

// Comparar con == en vez de ===
console.log('0 == "0"  :', 0 == "0");    // true  (¡trampa!)
console.log('0 === "0" :', 0 === "0");   // false (correcto)
console.log("null == undefined:", null == undefined);   // true  (¡trampa!)
console.log("null === undefined:", null === undefined); // false (correcto)

// Mutar parámetros de función (efecto secundario no intencionado)
function agregarAdmin(lista) {
  lista.push("admin");  // ⚠️  modifica el array original
  return lista;
}

const usuarios = ["ana", "bruno"];
agregarAdmin(usuarios);
console.log("\nusuarios (mutado sin querer):", usuarios); // incluye "admin"

// Forma correcta: trabajar con copia
function agregarAdminSeguro(lista) {
  return [...lista, "admin"];
}
const usuarios2 = ["ana", "bruno"];
const conAdmin = agregarAdminSeguro(usuarios2);
console.log("original intacto:", usuarios2);
console.log("nueva lista:", conAdmin);


// ============================================================
//  EJERCICIOS
// ============================================================
//
//  1. Crear una función calcularRaiz(n) que:
//     · Lance un TypeError si n no es número
//     · Lance un RangeError si n es negativo
//     · Devuelva la raíz cuadrada en caso exitoso
//     Probarla con: 25, -9, "hola", 0, 144
//
//  2. Crear la clase ErrorStock que extienda Error.
//     Usarla en una función vender(producto, cantidad) que:
//     · Lance ErrorStock si no hay suficiente stock
//     · Lance ErrorValidacion si la cantidad es <= 0
//     · Descuente el stock y devuelva la operación si es válida
//
//  3. Crear la función parsearConfiguracion(texto) que:
//     · Intente parsear el texto como JSON
//     · Valide que tenga las claves: host, puerto, bd
//     · Lance errores descriptivos en cada caso de fallo
//     · Devuelva el objeto si todo está bien
//
//  4. Implementar el patrón {datos, error} en una función
//     buscarUsuario(id, listaUsuarios) que busque por id.
//     Si no lo encuentra, devolver { datos: null, error: "no encontrado" }.
//
//  5. DESAFÍO: Crear un "validador genérico" que reciba un objeto
//     y un esquema de validación, y devuelva todos los errores encontrados.
//     Ejemplo:
//     const esquema = { nombre: "string", edad: "number", activo: "boolean" }
//     validar({ nombre: "Ana", edad: "veinte", activo: true }, esquema)
//     → ["edad debe ser number, recibido string"]
//
// ============================================================

import { readFile } from "fs/promises";
 
const raw = await readFile("./data/personajes.json", "utf-8");
const personajes = JSON.parse(raw);
 
/* ============================================================
🔹 FILTER — Filtrado
============================================================ */
 
// 1. Mayores de 30 años
console.log("1. Mayores de 30 años:");
const mayoresDe30 = personajes.filter(p => p.edad > 30);
console.log(mayoresDe30.map(p => p.nombre));
 
// 2. Solo tipo "principal"
console.log("\n2. Personajes principales:");
const principales = personajes.filter(p => p.tipo === "principal");
console.log(principales.map(p => p.nombre));
 
// 3. Ocupación "Estudiante"
console.log("\n3. Estudiantes:");
const estudiantes = personajes.filter(p => p.ocupacion === "Estudiante");
console.log(estudiantes.map(p => p.nombre));
 
// 4. Entre 18 y 60 años (inclusive)
console.log("\n4. Entre 18 y 60 años:");
const rangoEdad = personajes.filter(p => p.edad >= 18 && p.edad <= 60);
console.log(rangoEdad.map(p => `${p.nombre} (${p.edad})`));
 
// 5. Solo villanos
console.log("\n5. Villanos:");
const villanos = personajes.filter(p => p.tipo === "villano");
console.log(villanos.map(p => p.nombre));
 
// 6. Nombre empieza con "M"
console.log("\n6. Nombres que empiezan con 'M':");
const conM = personajes.filter(p => p.nombre.startsWith("M"));
console.log(conM.map(p => p.nombre));
 
// 7. Todos excepto "secundario"
console.log("\n7. Todos excepto secundarios:");
const sinSecundarios = personajes.filter(p => p.tipo !== "secundario");
console.log(sinSecundarios.map(p => `${p.nombre} (${p.tipo})`));
 
// 8. Mayores de 50 años Y ocupación no es "Jubilado"
console.log("\n8. Mayores de 50 y no jubilados:");
const mayoresNoJubilados = personajes.filter(
p => p.edad > 50 && p.ocupacion !== "Jubilado"
);
console.log(mayoresNoJubilados.map(p => `${p.nombre} - ${p.ocupacion}`));
 
/* ============================================================
🔹 MAP — Transformación
============================================================ */
 
// 1. Solo nombres
console.log("\n--- MAP ---");
console.log("\n1. Solo nombres:");
const soloNombres = personajes.map(p => p.nombre);
console.log(soloNombres);
 
// 2. Frases de presentación
console.log("\n2. Presentaciones:");
const presentaciones = personajes.map(
p => `${p.nombre} tiene ${p.edad} años.`
);
console.log(presentaciones);
 
// 3. Nombres en mayúsculas
console.log("\n3. Nombres en mayúsculas:");
const nombresEnMayus = personajes.map(p => p.nombre.toUpperCase());
console.log(nombresEnMayus);
 
// 4. Agregar propiedad "esMayor"
console.log("\n4. Con propiedad esMayor:");
const conEsMayor = personajes.map(p => ({
...p,
esMayor: p.edad >= 18,
}));
console.log(conEsMayor.map(p => `${p.nombre} → esMayor: ${p.esMayor}`));
 
/* ============================================================
🔹 PUSH — Agregar
============================================================ */
 
// Copia fresca para no alterar el original
let lista = [...personajes];
 
// 1. Agregar a "Disco Stu"
console.log("\n--- PUSH ---");
const discoStu = {
id: 21,
nombre: "Disco Stu",
edad: 42,
ocupacion: "Músico",
tipo: "secundario",
};
lista.push(discoStu);
console.log(`\n1. Después de agregar Disco Stu → total: ${lista.length}`);
console.log(lista.at(-1)); // muestra el último elemento agregado
 
// 2. Agregar múltiples personajes
const nuevos = [
{ id: 22, nombre: "Sideshow Bob", edad: 45, ocupacion: "Actor/Criminal", tipo: "villano" },
{ id: 23, nombre: "Nelson Muntz", edad: 10, ocupacion: "Estudiante", tipo: "secundario" },
{ id: 24, nombre: "Edna Krabappel", edad: 44, ocupacion: "Maestra", tipo: "secundario" },
];
lista.push(...nuevos);
console.log(`\n2. Después de agregar 3 más → total: ${lista.length}`);
console.log(lista.slice(-3).map(p => p.nombre));
 
// 3. Agregar con validación (no duplicar por ID)
const agregarSiNoExiste = (arr, personaje) => {
const yaExiste = arr.some(p => p.id === personaje.id);
if (!yaExiste) {
arr.push(personaje);
console.log(` ✅ "${personaje.nombre}" agregado.`);
} else {
console.log(` ⚠️ ID ${personaje.id} ya existe. No se agregó.`);
}
};
 
console.log("\n3. Agregar con validación:");
agregarSiNoExiste(lista, { id: 25, nombre: "Comic Book Guy", edad: 45, ocupacion: "Vendedor", tipo: "secundario" });
agregarSiNoExiste(lista, { id: 1, nombre: "Homero Simpson", edad: 39, ocupacion: "Duplicado", tipo: "principal" }); // ya existe
 
/* ============================================================
🔹 ELIMINAR — Borrar personajes
============================================================ */
 
let listaCopia = [...personajes]; // lista limpia para los ejercicios de eliminación
 
// 1. Eliminar por ID (Sr. Burns, id = 8)
console.log("\n--- ELIMINAR ---");
listaCopia = listaCopia.filter(p => p.id !== 8);
console.log(`\n1. Eliminado Sr. Burns (id 8) → quedan: ${listaCopia.length}`);
 
// 2. Eliminar por nombre ("Troy McClure")
listaCopia = listaCopia.filter(p => p.nombre !== "Troy McClure");
console.log(`\n2. Eliminado Troy McClure → quedan: ${listaCopia.length}`);
 
// 3. Eliminar todos los de tipo "villano"
listaCopia = listaCopia.filter(p => p.tipo !== "villano");
console.log(`\n3. Eliminados todos los villanos → quedan: ${listaCopia.length}`);
 
// 4. Eliminar menores de 5 años (Maggie, edad 1)
listaCopia = listaCopia.filter(p => p.edad >= 5);
console.log(`\n4. Eliminados menores de 5 años → quedan: ${listaCopia.length}`);
 
// 5. Eliminar y guardar respaldo antes de borrar
let listaParaRespaldo = [...personajes];
const respaldo = listaParaRespaldo.filter(p => p.tipo === "familiar"); // los que se van a borrar
listaParaRespaldo = listaParaRespaldo.filter(p => p.tipo !== "familiar");
 
console.log("\n5. Respaldo de los 'familiar' antes de eliminarlos:");
console.log(" Respaldo:", respaldo.map(p => p.nombre));
console.log(` Lista sin familiares → quedan: ${listaParaRespaldo.length}`);

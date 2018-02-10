var funciones = require('./funciones');
var Materia = require('./model/materias');
var JsonDB = require('node-json-db');
var db = new JsonDB("TestDB", true, true);

db.delete("/materias");
var mat_1 = new Materia("Diseño");
mat_1.notas = [10, 5];
var mat_2 = new Materia("Análisis");
mat_2.notas = [10, 7];
var materias = [mat_1, mat_2];
db.push("/materias", materias);
var mat_2_nueva = new Materia("Análisis");
mat_2_nueva.notas = [10, 10];
var nuevas = [mat_1, mat_2_nueva];
console.log(funciones.obtener_novedades(db, nuevas).length);
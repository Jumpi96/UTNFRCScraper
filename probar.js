var funciones = require('./funciones');
var Materia = require('./model/materias');
var JsonDB = require('node-json-db');
var db = new JsonDB("TestDB", true, true);

console.log(db.getData("/materias"));
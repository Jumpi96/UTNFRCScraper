var funciones = require('./funciones');
var Novedad = require("./model/novedades");
var Materia = require("./model/materias");


var dis = new Materia({
    nombre: 'Diseño de ',
    notas: [10,10,10]
});

var vieja = new Materia({nombre: "Diseño", notas: [10,2,10]});
var nueva = new Materia({nombre: "Diseño", notas: [2,2,2]});

funciones.guardar_notas([nueva]);

  
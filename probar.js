var funciones = require('./funciones');
var Novedad = require("./model/novedades");
var Materia = require("./model/materias");

var materias = [new Materia({nombre: "Diseño de Lenguajes de Consult", notas: [10,6,9,8]})];


Materia.find({}, function(err, guardadas) {
    if (err) throw err;
    var novedades="Sin novedades";
    if (true){//(materias.length === guardadas.length){
        for(i=0;i<materias.length;i++){
            if(funciones.hay_diferencia_notas(materias[i], guardadas[i])){
                if(materias[i].nombre === guardadas[i].nombre)
                    novedad = "Hay cambios en " + materias[i].nombre + ".";
                else
                    novedad = "Hay cambios entre materias.";
            }
        }
    }
    else
        novedad = "Hay cambios entre materias."
    console.log(novedad);
});

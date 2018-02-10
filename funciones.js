var Materia = require("./model/materias.js");
var JsonDB = require('node-json-db');
//

var funciones = module.exports = {
    obtener_novedades:function(db, materias){
        var novedad = "";
        Materia.find({}, function(err, guardadas) {
            if (err) throw err;
            if (materias.length === guardadas.length){
                for(i=0;i<materias.length;i++){
                    if(!materias[i].equals(guardadas[i])){
                        if(materias[i].nombre === guardadas[i].nombre)
                            novedad = "Hay cambios en " + materias[i].nombre + ".";
                        else
                            novedad = "Hay cambios entre materias.";
                    }
                }
            }
            else
                novedad = "Hay cambios entre materias.";
            if (novedad !== "") {
                funciones.guardar_notas(db, resultado);
                funciones.avisar_novedades(novedades);  
            }
        });  
    },

    get_nombre_materia:function(cadena){
        return cadena.substr(23, cadena.length-25);
    },

    avisar_novedades:function(novedades){
        require("openurl").open("https://www.frc.utn.edu.ar"); //TODO: notificacion en pantalla o email. 
    },    

    guardar_notas:function(db, materias){
        let sobreescribir = true;
        db.push("/materias", materias, sobreescribir);
    }
}
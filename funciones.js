var Novedad = require("./model/novedades.js");
var Materia = require("./model/materias.js");

function hay_diferencia_notas(guardada, nueva){
    if (guardada.notas.length == nueva.notas.length){
        for(i=0;i<guardada.notas.length;i++){
            if(guardada.notas[i].toString() !== nueva.notas[i]){
                return true;
            }
        }
    }
    else
    {
        return true;
    }
    return false;
}

var funciones = module.exports = {
    hay_diferencia_notas:function(guardada, nueva){
        if (guardada.notas.length == nueva.notas.length){
            for(i=0;i<guardada.notas.length;i++){
                if(guardada.notas[i].toString() !== nueva.notas[i]){
                    return true;
                }
            }
        }
        else
        {
            return true;
        }
        return false;
    },
    obtener_novedades:function(materias){
        var novedad = "";
        Materia.find({}, function(err, guardadas) {
            if (err) throw err;
            if (materias.length === guardadas.length){
                for(i=0;i<materias.length;i++){
                    if(hay_diferencia_notas(materias[i], guardadas[i])){
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
                var nueva_novedad = new Novedad({descripcion: novedad});
                nueva_novedad.save(function(err) {
                    if (err) throw err;
                    console.log('Novedad: ' + nueva_novedad.descripcion);
                });
            }
            Novedad.find({}, function(err, novedades) {
                if (err) throw err;
                if (novedades.length>0){
                  funciones.guardar_notas(resultado);
                  funciones.avisar_novedades(novedades);  
                  Novedad.remove({},function(){
                    console.log("Se borraron las novedades");
                  });
                }
              });
        });  
    },

    get_nombre_materia:function(cadena){
        return cadena.substr(23, cadena.length-25);
    },

    avisar_novedades:function(novedades){
        require("openurl").open("https://www.frc.utn.edu.ar"); //TODO: notificacion en pantalla o email. 
    },    

    guardar_notas:function(materias){
        Materia.remove({},function(){
            console.log("Se borraron las materias anteriores.");
            for(i=0;i<materias.length;i++){
                materias[i].save(function(err) {
                    if (err) throw err;
                    console.log("Materia agregada.");
                  });
             }
        });
    }
}

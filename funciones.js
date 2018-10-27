var Materia = require("./model/materias.js");
var JsonDB = require('node-json-db');
const CREDS = require('./creds');
var api_key = CREDS.api_key;
var DOMAIN = CREDS.domain;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

var funciones = module.exports = {
    obtener_novedades:function(db, materias){
        var novedad = "";
        var guardadas = db.getData("/materias");
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
        if (novedad !== ""){
            console.log(novedad);
            return [novedad];
        }
        else
            return [];
        
    },

    get_nombre_materia:function(cadena){
        return cadena.substr(23, cadena.length-25);
    },

    avisar_novedades:function(novedades){
        let novedad = novedades[0];
        var data = {
            from: 'UTN FRC Scraper <utnfrcscraper@mailgun.com>',
            to: 'juampilorenzo@gmail.com',
            subject: 'UTN FRC Scraper: Novedades - ' + hoy(),
            html: `<h1>UTN FRC Scraper</h1>
                <p>Se detectaron novedades en sus notas:</p><ul><li>${novedad}</li></ul>`
          };
          mailgun.messages().send(data, function (error, body) {
            console.log(body);
          });
    },    

    guardar_notas:function(db, materias){
        let sobreescribir = true;
        db.push("/materias", materias, sobreescribir);
    }
}

function hoy(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
}
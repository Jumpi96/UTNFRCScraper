var Materia = require("./model/materias.js");
var JsonDB = require('node-json-db');
var nodemailer = require('nodemailer');
const CREDS = require('./creds');

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
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'utnfrcscraper@gmail.com',
                pass: 'wwwfrcutneduar'
            }
        });
        var mailOptions = {
            from: 'utnfrcscraper@gmail.com',
            to: CREDS.correo,
            subject: 'UTN FRC Scraper: Novedades',
            html: `<h1>UTN FRC Scraper</h1>
                <p>Se detectaron novedades en sus notas:</p><ul><li>${novedad}</li></ul>`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              throw false;
            } else {
              console.log('Correo enviado.');
            }
        }); 
    },    

    guardar_notas:function(db, materias){
        let sobreescribir = true;
        db.push("/materias", materias, sobreescribir);
    }
}
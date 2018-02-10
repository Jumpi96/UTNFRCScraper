var assert = require("assert");
var Materia = require("../model/materias.js");
var funciones = require("../funciones.js")
var JsonDB = require('node-json-db');
var db = new JsonDB("TestDB", true, true);


describe('Modelo', function(){
  describe('#FindMaterias()', function(){
    it('Debe devolver al menos una materia.', function(){
      db.push("/materias[]", new Materia("Mat"), true);
      assert.equal(db.getData("/materias").length > 0, true);
    });

  describe('#guardar_notas()', function(){
    it('Debe eliminar y cargar las nuevas.', function(){
      var nueva = new Materia("Mat");
      nueva.notas = [10,2,9];
      funciones.guardar_notas(db, [nueva]);
      assert.equal(db.getData("/materias").length === 1, true);
      assert.equal(db.getData("/materias[0]/nombre") === "Mat", true);
    })
  })
  })
});

describe('Materia', function(){
  describe('#GetNombreMateria()', function(){
    it('Devolver nombre de materia recortado.', function(){
      let cadena = " 01 MI AULA VIRTUAL en Investigación Operativa  ";
      assert.equal(funciones.get_nombre_materia(cadena), "Investigación Operativa");
    });
  })
});

describe('Novedades', function(){
  describe('#obtener_novedades()', function(){
    it('No hay novedad.'), function(){
      assert.equal(true,false);
    }
    it('Hay nuevas materias.'), function(){
      assert.equal(true,false);
    }
    it('Hay notas nuevas.'), function(){
      assert.equal(true,false); 
    }
  })
  describe('#hay_diferencia_notas()', function(){
    it('No hay diferencia.', function(){
      var vieja = new Materia("Diseño");
      vieja.notas = [10,2,10];
      var nueva = new Materia("Diseño");
      nueva.notas = [10,2,10];
      
      assert.equal(!vieja.equals(nueva), false);
    })
    it('Hay diferencia entre las notas.', function(){
      var vieja = new Materia("Diseño");
      vieja.notas = [10,2,10];
      var nueva = new Materia("Diseño");
      nueva.notas =  [10,2,9];
      
      assert.equal(!vieja.equals(nueva), true);
    })
    it('Hay nuevas notas.', function(){
      var vieja = new Materia("Diseño");
      vieja.notas = [10,2,10];
      var nueva = new Materia("Diseño");
      nueva.notas =  [10,2,10,2];
      
      assert.equal(!vieja.equals(nueva), true);
    })
  })
});
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
    it('No hay novedad.', function(){
      db.delete("/materias");
      var mat_1 = new Materia("Diseño");
      mat_1.notas = [10, 5];
      var mat_2 = new Materia("Análisis");
      mat_2.notas = [10, 7];
      var materias = [mat_1, mat_2];
      db.push("/materias", materias);
      assert.equal(funciones.obtener_novedades(db, materias).length === 0, true);
    })
    it('Hay nuevas materias.', function(){
      db.delete("/materias");
      var mat_1 = new Materia("Diseño");
      mat_1.notas = [10, 5];
      var mat_2 = new Materia("Análisis");
      mat_2.notas = [10, 7];
      var materias = [mat_1, mat_2];
      db.push("/materias", materias);
      var mat_3 = new Materia("Implementación");
      mat_3.notas = [10];
      var nuevas = [mat_1, mat_2, mat_3];
      assert.equal(funciones.obtener_novedades(db, nuevas)[0] === "Hay cambios entre materias.", true);
    })
    it('Hay notas nuevas.', function(){
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
      assert.equal(funciones.obtener_novedades(db, nuevas).length === 1, true);
    })
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
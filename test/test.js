var assert = require("assert"); // node.js core module
var Materia = require("../model/materias.js");
var Novedad = require("../model/novedades.js");
var funciones = require("../funciones.js")

describe('Modelo', function(){
  describe('#FindMaterias()', function(){
    it('Debe devolver al menos una materia.', function(){
      Materia.find({}, function(err, guardadas) {
        if (err) throw err;
        assert.equal(guardadas.length>0, true);
      });
    });

  describe('#guardar_notas()', function(){
    it('Debe eliminar y cargar las nuevas.', function(){
      var nueva = new Materia({nombre: "Mat", notas: [10,2,9]});
      funciones.guardar_notas([nueva]);
      setTimeout(function () {  
        Materia.find({nombre: nueva.nombre}, function(err, guardadas) {
          if (err) throw err;
          assert.equal(guardadas.length === 1, true);
        });
        Materia.find({}, function(err, guardadas) {
          if (err) throw err;
          assert.equal(guardadas.length === 1, true);
        });  
      }, 3000);
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

describe('Correos', function(){
  describe('#avisar_novedades()', function(){
    it('Se envía mail.', function(){
      assert.equal(funciones.avisar_novedades([]), true);
    });
  })
});

describe('Novedades', function(){
  describe('#hay_diferencia_notas()', function(){
    it('No hay diferencia.', function(){
      var vieja = new Materia({nombre: "Diseño", notas: [10,2,10]});
      var nueva = new Materia({nombre: "Diseño", notas: [10,2,10]});
      
      assert.equal(funciones.hay_diferencia_notas(vieja, nueva), false);
    })
    it('Hay diferencia entre las notas.', function(){
      var vieja = new Materia({nombre: "Diseño", notas: [10,2,10]});
      var nueva = new Materia({nombre: "Diseño", notas: [10,2,9]});
      
      assert.equal(funciones.hay_diferencia_notas(vieja, nueva), true);
    })
    it('Hay nuevas notas.', function(){
      var vieja = new Materia({nombre: "Diseño", notas: [10,2,10]});
      var nueva = new Materia({nombre: "Diseño", notas: [10,2,10,2]});
      
      assert.equal(funciones.hay_diferencia_notas(vieja, nueva), true);
    })
  })
});
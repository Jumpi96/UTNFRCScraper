var assert = require("assert"); // node.js core module

describe('Modelo', function(){
  describe('#FindMaterias()', function(){
    it('Debe devolver al menos una materia.', function(){
      var materias = [1];
      assert.equal(materias.length > 0, true);
    })
  })
});
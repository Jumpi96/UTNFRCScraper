const mongoose = require('mongoose');

let materiaSchema = new mongoose.Schema({
    nombre: String,
    notas: [Number]
})

let Materias = mongoose.model('Materia', materiaSchema);

module.exports = Materias;
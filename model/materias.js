var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/UTNScraper');
var Schema = mongoose.Schema;

var materiaSchema = new Schema({
    nombre: String,
    notas: Array
})

var Materia = mongoose.model('Materia', materiaSchema);

module.exports = Materia;
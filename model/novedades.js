var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/UTNScraper');
var Schema = mongoose.Schema;

var novedadSchema = new Schema({
    descripcion: String
})

var Novedad = mongoose.model('Novedad', novedadSchema);

module.exports = Novedad;
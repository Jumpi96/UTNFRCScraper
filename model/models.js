var MongoClient = require('mongodb').MongoClient;

module.exports = {
    FindMaterias: function() {
      return MongoClient.connect('mongodb://localhost:27017/UTNScraper').then(function(db) {
        var collection = db.collection('Materias');
        return collection.find().toArray();
      }).then(function(items) {
        return items;
     });
   }
}; 
var MongoClient = require('mongodb').MongoClient;

module.exports = {
    FindMaterias: function() {
      return MongoClient.connect('mongodb://localhost:27017/UTNScraper').then(function(db) {
        var collection = db.collection('Materias');
        
        return collection.find().toArray();
      }).then(function(items) {
        //console.log(items);
        return items;
     });
   }
}; 
/*
MongoClient.connect(DB_URL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("UTNScraper");
    dbo.collection("Materias").find().toArray(function(err, result) {
      if (err) throw err;
      for (i=0; i < result.length; i++){
        mat = new Materia(result[i].nombre);
        for (j=0;j<result[i].notas.length;j++)
            mat.notas.push(result[i].notas[j]);
        guardadas.push(mat);
      }
      console.log(guardadas.length);
    });
    db.close();
    
});*/
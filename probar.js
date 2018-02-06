const db = require('./model/models');
db.FindMaterias().then(function(items) {
    console.info('The promise was fulfilled with items!', items);
  }, function(err) {
    console.error('The promise was rejected', err, err.stack);
  });

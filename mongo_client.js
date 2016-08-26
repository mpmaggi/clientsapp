(function () {
    var client = require('mongodb').MongoClient,
        mongodb;
 
    module.exports =  {
        connect: function(callback) {
          client.connect('mongodb://localhost:27017/client',
                function(err, db){
                    mongodb = db;
                    if(callback) { callback(); }
                });
        },
        db: function() {
            return mongodb;
        },
        close: function() {
            mongodb.close();
        },
        ObjectId: function (id) {
          return mongodb.ObjectId(id);
        }
    };
})();
var assert = require('assert');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/client';

/*
var findClients = function (db, callback) {
    var cursor = db.collection('clients').find();
    var arr = [];
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            //console.dir(doc);
            arr.push(doc);
        } else {
            callback();
        }
    });
    return arr;
};

*/
app.get('/clients', function (req, res) {
    console.log("GET REQUEST");

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        /*findClients(db, function () {
            db.close();
        });*/

        var propArray = [];
        db.collection('clients').find().toArray(function (err, result) {
            var i, count;
            for (i = 0, count = result.length; i < count; i++) {
                //propArray.push(new models.propertyModel(result[i]));
                propArray.push(result[i]);
            }
            db.close();
            return res.json(propArray);
        });


    });
    /*

        client1 = {
            cpf: '000000001-91',
            name: 'João',
            email: 'joao@teste.com',
            maritalstatus: 'single',
            address: 'Rua Macapá 141/201'
        }

        client2 = {
            cpf: '000000002-92',
            name: 'Mary',
            email: 'mary@teste.com',
            maritalstatus: 'married',
            address: 'Rua Mogi 875'
        }

        var clients = [client1, client2];
        res.json(clients);
        */


});

app.post('/clients', function (req, res) {


    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Não foi possível conectar ao mongoDB');
        } else {
            console.log('Conexão realizada em ', url);
        }


        var collection = db.collection('clients');
        collection.insert([req.body], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
            }
            db.close();
        });


    });


});

app.listen(3000, function () {
    console.log("Server running on port 3000");
});

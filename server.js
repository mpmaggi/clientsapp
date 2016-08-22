var express = require('express');
var app = express();
var mongoose = require('mongoose');


var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

var clientSchema = mongoose.Schema({
    cpf: String,
    name: String,
    email: String,
    // maritalstatus: String,
    zipcode: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    country: String,
    phonenumber: String
});

var ClientDB = mongoose.model('client', clientSchema);

app.get('/clients', function (req, res) {
    console.log("GET REQUEST");

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

});

app.post('/clients', function (req, res) {
    mongoose.connect('mongodb://localhost/client');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        var newClient = new ClientDB(req.body);


        mongoose.Promise = require('bluebird');
        newClient.save(function (err) {
            if (err) throw err;

            console.log('User saved successfully!');
        });


    });

});

app.listen(3000);
console.log("Server running on port 3000");

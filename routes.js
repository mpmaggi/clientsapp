module.exports = (function () {
  'use strict';
  var router = require('express').Router();

  /*
  router.get('/', function (req, res) {
    res.json({ 'foo': 'bar' });
  });
  */



  router.get('/clients', function (req, res) {

    Client.GetAll(function (err, clients) {
      res.json(clients);
    });

  });

  router.get('/clients/:cpf', function (req, res) {

    Client.GetByCpf(req.params.cpf, function (err, client) {
      res.json(client); //res.send(item)
    });

  });

  router.post('/clients', function (req, res) {

    Client.data = req.body;
    Client.Save(function (err, result) {
      res.json(result);
    });

  });

  router.delete('/clients/:id', function (req, res) {

    Client.Delete(req.params.id, function (err, result) {
      res.json(result);
    });

  });


  router.put('/clients/:id', function (req, res) {

    Client.data = {
      cpf: req.body.cpf,
      name: req.body.name,
      email: req.body.email,
      maritalstatus: req.body.maritalstatus,
      phonenumber: req.body.phonenumber,
      zipcode: req.body.zipcode,
      address1: req.body.address1,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country
    };

    Client.Update(req.params.id, function (err, result) {
      res.json(result);
    });

    /*
      var id = req.params.id;
  
      var set = {
              cpf: req.body.cpf,
        name: req.body.name,
        email: req.body.email,
        maritalstatus: req.body.maritalstatus,
        phonenumber: req.body.phonenumber,
        zipcode: req.body.zipcode,
        address1: req.body.address1,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country
          };
  
      MongoClient.connect(url, function (err, db) {
          db.collection('clients', function (err, clients) {
  
        clients.update({ _id: mongodb.ObjectId(id) },{$set: set}, function(err, result){
          if (err)
            console.warn(err.message);
          else {
            console.log("RESULTADO UPDATE: ", result);
            res.json(result);
  
          }
                                });
      
  
  
          });
      });
  
  
  
      */

  });



  return router;
})();
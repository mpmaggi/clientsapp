var Client = require('./clients.js');

module.exports = (function () {
    'use strict';
    var router = require('express').Router();

    router.get('/clients', function (req, res) {

        Client.GetAll(function (err, clients) {
            if (err) {
                return res.status(500).send(err);
            }

            if (clients && clients.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.json(clients);

            } else {
                res.status(204).send();
            }
        });

    });

    router.get('/clients/:cpf', function (req, res) {

        Client.GetByCpf(req.params.cpf, function (err, client) {
            if (err) {
                return res.status(500).send(err);
            }

            if (client) {
                res.setHeader('Content-Type', 'application/json');
                res.json(client);

            } else {
                res.status(204).send();
            }
        });

    });

    router.post('/clients', function (req, res) {
        Client.data = req.body;
        Client.GetByCpf(req.body.cpf, function (err, client) {
            if (err) {
                return res.status(500).send(err);
            }

            if (client) {
                res.status(409).send();

            } else {

                Client.Save(function (err, result) {
                    if (err) {
                        return res.status(500).send(err);
                    }

                    res.status(201).send();
                });
            }
        });
    });

    router.delete('/clients/:cpf', function (req, res) {

        Client.GetByCpf(req.params.cpf, function (err, client) {
            if (err) {
                return res.status(500).send(err);
            }

            if (client) {
                Client.Delete(req.params.cpf, function (err, result) {
                    if (err) {
                        return res.status(500).send(err);
                    }

                    res.json(result);
                });

            } else {
                res.status(404).send();
            }

        });

    });


    router.put('/clients/:cpf', function (req, res) {

        Client.GetByCpf(req.params.cpf, function (err, client) {
            if (err) {
                return res.status(500).send(err);
            }

            if (client) {

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

                Client.Update(req.params.cpf, function (err, result) {
                    if (err) {
                        return res.status(500).send(err);
                    }

                    res.json(result);
                });

            } else {
                res.status(404).send();
            }
        });
    });

    return router;
})();

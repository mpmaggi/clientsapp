var expect = require("chai").expect;
var request = require("request");

describe("Clients API", function () {
    var server = require('../server.js');
    describe('Server response', function () {
        before(function () {
            server.listen(3000);
        });

        after(function () {
            server.close();
        });

    });

    describe("GetAllClients", function () {

        it('HTTP OK - 200', function (done) {
            request.get('http://localhost:3000/clients', function (err, res, body) {
                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                done();
            });
        });

    });

    describe("InsertClient", function () {

        var clientData = {
            "maritalstatus": {
                "id": "married",
                "value": "Married"
            },
            "phonenumber": [
                {
                    "id": "phone1",
                    "name": "31 984056485"
                }],
            "cpf": "00000000191",
            "name": "TEST CASE",
            "email": "marcusmaggi@gmail.com",
            "zipcode": "30380340",
            "address1": "Av dos Engenheiros",
            "city": "Belo Horizonte",
            "state": "MG",
            "country": "Brasil"
        }

        it('HTTP Created - 201', function (done) {

            request.post({
                url: 'http://localhost:3000/clients',
                json: true,
                body: clientData
            }, function (err, res, body) {
                expect(res.statusCode).to.equal(201);
                done();
            });

        });

        it('HTTP Conflict - 409', function (done) {
            request.post({
                url: 'http://localhost:3000/clients',
                json: true,
                body: clientData
            }, function (err, res, body) {
                expect(res.statusCode).to.equal(409);
                done();
            });
        });


    });

    describe("GetClientByCPF", function () {

        it('HTTP OK - 200', function (done) {
            request.get('http://localhost:3000/clients/00000000191', function (err, res, body) {
                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                done();
            });
        });

        it('HTTP No Content - 204', function (done) {
            request.get('http://localhost:3000/clients/AAAAAAAAAAA', function (err, res, body) {
                expect(res.statusCode).to.equal(204);
                done();
            });
        });

    });

    describe("UpdateClient", function () {

        var clientData = {
            "maritalstatus": {
                "id": "married",
                "value": "Married"
            },
            "phonenumber": [
                {
                    "id": "phone1",
                    "name": "31 984056485"
                }],
            "cpf": "00000000191",
            "name": "TEST CASE - UPDATED",
            "email": "marcusmaggi@gmail.com",
            "zipcode": "30380340",
            "address1": "Av dos Engenheiros",
            "city": "Belo Horizonte",
            "state": "MG",
            "country": "Brasil"
        }

        it('HTTP OK - 200', function (done) {

            request.put({
                url: 'http://localhost:3000/clients/00000000191',
                json: true,
                body: clientData
            }, function (err, res, body) {
                expect(res.statusCode).to.equal(200);
                done();
            });

        });

        it('HTTP Not Found - 404', function (done) {

            request.put({
                url: 'http://localhost:3000/clients/AAAAAAAAAAAA',
                json: true,
                body: clientData
            }, function (err, res, body) {
                expect(res.statusCode).to.equal(404);
                done();
            });

        });

        it('HTTP Conflict - 409', function (done) {
            request.post({
                url: 'http://localhost:3000/clients',
                json: true,
                body: clientData
            }, function (err, res, body) {
                expect(res.statusCode).to.equal(409);
                done();
            });
        });


    });

    describe("RemoveClient", function () {
        it('HTTP OK - 200', function (done) {
            request.delete('http://localhost:3000/clients/00000000191', function (err, res, body) {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

        it('HTTP Not Found - 404', function (done) {
            request.delete('http://localhost:3000/clients/00000000191', function (err, res, body) {
                expect(res.statusCode).to.equal(404);
                done();
            });
        });

    });


});

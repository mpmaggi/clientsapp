var mongodb = require('./mongo_client');

var Client = function (data) {
    this.data = data;
}

Client.GetById = function (id, callback) {
    db.get('clients', {
        _id: id
    }).run(function (err, data) {
        if (err)
            return callback(err);
        else
            return callback(null, new Client(data));
    });
}

Client.GetByCpf = function (cpf, callback) {
    mongodb.connect(function () {
        mongodb.db()
            .collection('clients')
            .findOne({
                'cpf': cpf
            }, function (err, item) {
                if (err) {
                    return callback(err);
                } else {
                    callback(null, item);
                }
            });
    });
}


Client.GetAll = function (callback) {

    mongodb.connect(function () {
        mongodb.db()
            .collection('clients')
            .find()
            .toArray(function (err, coll) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, coll);
                }

            });
    });

}


Client.Save = function (callback) {
    var data = this.data;

    if (data._id == null) {

        mongodb.connect(function () {
            mongodb.db()
                .collection('clients')
                .insert(data,
                    function (err, result) {
                        if (err)
                            return callback(err);
                        else
                            return callback(null, result);
                    }

                )
        });
    }
}

Client.Delete = function (id, callback) {
    var data = this.data;

    mongodb.connect(function () {
        mongodb.db()
            .collection('clients')
            .remove({
                _id: require("mongodb").ObjectId(id)
            }, function (err, result) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, result);
                }

            });
    });

}


Client.Update = function (id, callback) {
    var data = this.data;

    mongodb.connect(function () {
        mongodb.db()
            .collection('clients')
            .update({
                    _id: require('mongodb').ObjectId(id)
                }, {
                    $set: data
                },
                function (err, result) {
                    if (err) {
                        return callback(err);
                    } else {
                        return callback(null, result);
                    }

                });
    });

}

module.exports = Client;

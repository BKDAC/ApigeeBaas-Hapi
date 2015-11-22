var request = require('request');
var async = require('async');
var Hapi = require('hapi');

var config = require('../../config');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/restaurants',
    handler: function (req, reply) {

    request(config.UG + '/restaurants?limit=100', function(error, response, body) {
        if (error) {
            reply(error);
        } else {
            reply(body);
        }
    });

    }
});

server.route({
    method: 'GET',
    path: '/restaurants/{name}',
    handler: function (req, reply) {
        //reply('Hello, ' + encodeURIComponent(request.params.name) + '!');

          async.parallel({
            restaurant: function(callback) {
                request(config.UG + "/restaurants/?ql=restID=" + req.params.name, function(error, response, body) {
                    if (error) {
                        reply(error);
                    } else {
                        var result = JSON.parse(body);
                        callback(null, result);
                    }
                });
            },
            reviews: function(callback) {
                async.waterfall([
                    function(callback) {
                        request(config.UG + "/reviews/?ql=restID=" + req.params.name, function(error, response, body) {
                            if (error) {
                                reply(error);
                            } else {
                                data = JSON.parse(body);
                                callback(null, data);
                            }
                        });
                    },
                    function(data, callback) {
                        var l = data.entities.length;
                        var aggregate = 0;
                        var i;
                        for (i = 0; i < l; i++) {
                            aggregate += data.entities[i].rating;
                        }
                        aggregate = {
                            aggregate: +(aggregate / i).toFixed(2)
                        };
                        callback(null, data, aggregate);
                    }
                ], callback);
            }
        },
        function(err, results) {
            reply(results);
        });


    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

request = require('request');
var Hapi = require('hapi');

var config = require('../../config');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/users',
    handler: function (req, reply) {
        

        request(config.UG + '/users', function(error, response, body) {
            if (error) {
            reply(error);
            } else {
            reply(body);
            }
            });

    }
});


server.start(function () {
    console.log('Server running at:', server.info.uri);
});
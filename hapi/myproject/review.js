request = require('request');
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

var config = require('../../config');

server.route({
    method: 'POST',
    path: '/reviews',
    handler: function (req, reply) {

        request.post(config.UG + '/reviews', {
            form: JSON.stringify(req.body) }, function(error, response, body) {
        if(error) {
            reply(error);
        } else {
            reply(body);
        }
        });


    }
});

server.route({
    method: 'GET',
    path: '/reviews',
    handler: function (req, reply) {
    var qs = "";
        if (req.query.restID) {
            var restID = req.query.restID;
            qs = "?ql=restID=" + restID;
        } 
        else if (req.query.rating) {
            var rating = req.query.rating;
            qs = "?ql=rating=" + rating;
        } else if (req.query.reviewer) {
            var reviewer = req.query.reviewer;
            qs = "?ql=reviewer=" + reviewer;
        }
        request(config.UG + '/reviews' + qs, function(error, response, body) {
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


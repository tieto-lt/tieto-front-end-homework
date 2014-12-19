'use strict';

var hostname = process.argv[2];
if (!hostname) {
  console.log('Usage: node endpoint-proxy.js ENDPOINT_URL');
  process.exit(1);
}


var request = require('request');
var express = require('express');


var app = express();
app.set('port', 9000);
app.get('/:urlEnding', function(req, res, next) {

  var url = hostname + req.params.urlEnding;

  var requestOptions = {
    method: 'GET',
    uri: url,
    headers: {
      'content-type': 'application/json'
    }
  };

  console.log("Requesting: " + url);
  request(requestOptions, function(error, response, body) {

    if (error) {
      console.log(error);
    }

    res.contentType('application/json');
    res.write(body);
    next();
  });

});

app.listen(app.get('port'), function() {
  console.log('App started. Usage: http://localhost:' + app.get('port') + '/urlEnding');
});
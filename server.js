var soap = require('soap');
var http = require('http');
var uuid = require('node-uuid');

var flightlyService = {
      Flightly: {
          FlightlySoap: {
              buyTicket: function(args, cb, headers, req) {
                  console.log('SOAP `buyTicket` request from ' + req.connection.remoteAddress);
                  return uuid.v4();
              },
              traveldocuments: function(args, cb, headers, req) {
                  console.log('SOAP `traveldocuments` request from ' + req.connection.remoteAddress);
                  return {
                    ArrayOfOrder: [
                      {
                        Order: {
                          date: 'JUL 10 2016',
                          accountId: '00001',
                          Destination: 'SAN',
                          seats: 1,
                          Price: 99.00,
                          confirmationId: 123456789
                        }
                      }
                    ]
                  };
              }
          }
      }
  };

  var xml = require('fs').readFileSync('flightly.wsdl', 'utf8'),
      server = http.createServer(function(request,response) {
          response.end("404: Not Found: " + request.url);
      });

  server.listen(8000);

  var soapServer = soap.listen(server, '/flightlyWS/service.asmx', flightlyService, xml);
  soapServer.log = function(type, data) {
    // type is 'received' or 'replied'
    console.log(type + " : " + data);
  };

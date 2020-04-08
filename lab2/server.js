



const fs = require("fs");
const url = require('url');
const http = require('http');
const qs = require('querystring');
const path = require('path');

var server = http.createServer(
    function (request, response) {
        console.log("Request received");
        if (request.method === 'POST') {
            console.log("POST");
            let body = '';
            request.on('data', function (data) {
                var count=body.length;
                    body += data;
                });
                
                request.on('end',function() {
                    console.log(body);
                    response.writeHead(200);
                    response.write(
                        JSON.stringify({ 
                            numberofcharacters: body.length=== 0 ?  "NO" : body.split('').length
                        })
                    );
                    response.end();
                });
        }
        if (request.method === 'GET') {
            var params = url.parse(request.url);
            console.log("Returned HTML file");
            console.log(params);
            const page = fs.readFileSync(path.resolve(__dirname, 'HelloWorld.html'));
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(page);
            response.end();
        }
    }
);

server.listen(8888);
console.log("Server started!");
varfs = require("fs");
var http = require("http");
function start() {
function onRequest(request, response) {
console.log("Request received");
var page = fs.readFileSync('HelloWorld.html');
response.writeHead(200, { 'Content-Type': 'text/html' });
response.write(page);
varparams = url.parse(request.url).search;
response.end();
 }
http.createServer(onRequest).listen(8888);
console.log("Server has started");
}
exports.start = start;
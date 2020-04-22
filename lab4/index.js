var server = require("./server4");
var router = require("./router");
var requestHandlers = require("./requestHandler");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/login"] = requestHandlers.login;
handle["notFound404"] = requestHandlers.notFound404();

server.start(router.route, handle);
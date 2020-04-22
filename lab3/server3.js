var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");

function start()
{
    function onRequest(request, response)
    {
        console.log("Request received.");

        var page = fs.readFileSync('lb3.html');
        response.writeHead(200, {'Content-type': 'text/html'});
        response.write(page);
        
        var params = url.parse(request.url).search;
        var queryParams = querystring.parse(params);
        if (params != null) {
            var item1=params.slice(1);
            var item = item1.split('&');
            console.log(item);
            var count=item[0]-item[1];
            console.log(count);
            if(isNaN(count))
            response.write("<h2>Результат:Error!</h2>");
            else
            response.write("<h2>Результат:"  +count+"</h2>");
            
        }
        response.end();
    }

http.createServer(onRequest).listen(8888);
console.log("Server has started.");
}

exports.start = start;
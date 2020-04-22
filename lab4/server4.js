var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(route, handle)
{
    function onRequest(request, response)
    {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received");
        //var page = fs.readFileSync('lb4.html');
        var retVal = route(handle, pathname);

        response.writeHead(200, {'Content-type': 'text/html'});
        response.write(retVal);

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
            response.write("<h2>Результат:"  + count + "</h2>");
            
        }
      
        response.end();
    }

http.createServer(onRequest).listen(8888);
console.log("Server has started.");
}

exports.start = start;
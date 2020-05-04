var fs = require("fs");

function start(response, postData)
{
    console.log("Request handler 'start' was called");
    var body = fs.readFileSync('input.html');
    response.writeHead(200, {'Content-type': 'text/html'});
    response.write(body);
    response.end();
}

function upload(response, postData)
{
    console.log("Request handler 'upload' was called");
    var name = postData.match(/\b(camel|bullock|wolf)\b/i);
    var idPic = postData.match(/\d/);
    if (!idPic)
    {
        idPic = Math.floor(Math.random()*9);
    }
    console.log("Name:"+name+" Id:"+idPic);
    response.setHeader("Content-Type", "image/jpeg");
    if (name == "camel,camel")
        camel(response, idPic);
    else if (name == "bullock,bullock")
        bullock(response, idPic);
    else
         wolf(response, idPic);
    response.end();
}

function camel(response, idPic)
{
    response.write(fs.readFileSync('images/'+idPic+'.jpg'));
}
function bullock(response, idPic)
{
    response.write(fs.readFileSync('images/1'+idPic+'.jpg'));
}
function wolf(response, idPic)
{
    response.write(fs.readFileSync('images/2'+idPic+'.jpg'));
}

function login(response, postData)
{
    console.log("Request handler 'login' was called");
    var page = fs.readFileSync('login.html');
    response.writeHead(200, {'Content-type': 'text/html'});
    response.write(page);
    response.end();
}

function notFound404(response)
{
    var page = fs.readFileSync('404.html');
    response.writeHead(200, {'Content-type': 'text/html'});
    response.write(page);
    response.end();
}

exports.start = start;
exports.upload = upload;
exports.login = login;
exports.notFound404 = notFound404;

var fs = require("fs");

function start()
{
    console.log("Request handler 'start' was called");
    return fs.readFileSync('lb4.html');
}

function upload()
{
    console.log("Request handler 'upload' was called");
    return fs.readFileSync('upload.html');
}

function login()
{
    console.log("Request handler 'login' was called");
    return fs.readFileSync('login.html');
}

function notFound404()
{
    return fs.readFileSync('404.html');
}

exports.start = start;
exports.upload = upload;
exports.login = login;
exports.notFound404 = notFound404;
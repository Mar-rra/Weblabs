//Подключение http-модуля,
//который поставляется вместе с Node.js и
//реализация доступа к нему через переменную http
const path = require('path');
const http = require("http");
//Подключение модуля для работы с файловой системой
const fs = require("fs");
//Создание http-сервера, использующего порт 8888

http.createServer( function(request, response) {
    console.log("Request received");
//загрузка html страницы из файловой системы
    const page = fs.readFileSync(path.resolve(__dirname, 'HelloWorld.html'));
//запись в ответ заголовка с указанием кода состояния, и типа возвращаемого контента
    response.writeHead(200, { 'Content-Type': 'text/html' });
//телоответа
    response.write(page);
//отправка ответа
    response.end();
}).listen(8888);

console.log("Server has started");

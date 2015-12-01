var connect = require("connect");
var serveStatic = require("serve-static");
var http = require("http");


var app = connect();

app.use(serveStatic(__dirname + "/../dist", { "index": ["index.html"] }));

http.createServer(app).listen(8080);

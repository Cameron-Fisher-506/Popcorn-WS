const http = require('http');
const config = require("config");


function server(app)
{
    console.log("Development Environment");
    //if(config.has("production.httpServer.port") && config.has("production.httpServer.timeout") && config.has("production.httpServer.maxConnections"))
    //{
        let port = 8080;//config.get("production.httpServer.port");
        let timeout = 500;//config.get("production.httpServer.timeout");
        let maxConnections = 1000;//config.get("production.httpServer.maxConnections");

        let httpServer = http.createServer(app).listen(port, () => {
            console.log("Running on port " + port + ".....");
        });

        httpServer.timeout = timeout;
        httpServer.maxConnections = maxConnections;
    //}
}

module.exports.server = server;
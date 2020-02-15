const PopcornService = require("../routes/PopcornService");
const bodyparser = require("body-parser");

function routes(app)
{
    app.use(bodyparser.json({limit: "100mb"}));
    app.use('/rest/popcorn', PopcornService);

}

module.exports.routes = routes;
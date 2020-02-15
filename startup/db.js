const mongoose = require("mongoose");
const config = require("config");


function connectionToMongoDB()
{
    //if(config.has("production.db"))
    //{
        let url = "mongodb://localhost:27017/popcorn";//config.get("production.db");
        mongoose.connect(url,{ useCreateIndex: true, useNewUrlParser: true})
            .then(() => console.log("Connected to mongodb...."))
            .catch((err) => console.log(err.message));
    //}
}

module.exports.connectionToMongoDB = connectionToMongoDB;
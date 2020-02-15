const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    id:{
        type: Number
    },
    title:{
        type:String
    },
    torrentURL:{
        type:String
    },
    year:{
        type:Number
    },
    rating:{
        type:Number
    },
    coverImage:{
        type:String
    }, 
    description:
    {
        type:String
    }


});

const Movie = mongoose.model("Movie", movieSchema);

module.exports.Movie = Movie;
module.exports.movieSchema = movieSchema;
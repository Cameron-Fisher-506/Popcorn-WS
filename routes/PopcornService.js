const express = require("express");
const router = express.Router();
const axios = require("axios");
const getCurrentDateTime = require("../utils/GeneralUtils").getCurrentDateTime;
const Client = require('node-torrent');
const convertBytesToMegaBytes = require('../utils/GeneralUtils').convertBytesToMegaBytes;
const convertBytesToKiloBytes = require('../utils/GeneralUtils').convertBytesToKiloBytes;
const getServerSettingValueByName = require("../utils/GeneralUtils").getServerSettingValueByName;



const Movie = require("../models/movie").Movie;

const YTS_MOVIE_LIST_URL = require("../utils/Constants").YTS_MOVIE_LIST_URL;

//GET /api/popcorn/cacheMovies
router.get("/cacheMovies/:totalPages", async (req, res) => {

    let totalPages = req.params.totalPages;
    let page = 1;
    
    do{

        try
        {
            let response = await axios.get(YTS_MOVIE_LIST_URL + "?page=" + page);
            
           
            if(response.status >= 400)
            {
                console.log("Error: " + response.status +
                        "\nPage: " + page +
                        "\ndateTime: " + getCurrentDateTime());
            }else
            {
                response.data.data.movies.forEach(async function(ytsMovie){
                    
                    let ytsMovieTitle = ytsMovie.title;
                    
                    let cachedMovie = await Movie.findOne({
                        title: ytsMovieTitle
                    });

                   
                    if(!cachedMovie)
                    {
                        
                        let movie = new Movie({
                            id: ytsMovie.id,
                            title: ytsMovie.title,
                            torrentURL: ytsMovie.torrents[0].url,
                            year: ytsMovie.year,
                            rating: ytsMovie.rating,
                            coverImage: ytsMovie.large_cover_image,
                            description: ytsMovie.description_full
                        });
        
                        let result = await movie.save();
                        if(!result)
                        {
                            console.log("\n\nError: Movie not saved" +
                            "\nTitle: " + movie.title +
                            "\nPage: " + page +
                            "\ndateTime: " + getCurrentDateTime());
                        }else{
                            console.log("\n\nMovie saved" +
                            "\nTitle: " + movie.title +
                            "\nPage: " + page +
                            "\ndateTime: " + getCurrentDateTime());
                        }

                            
                    }else{
                        console.log("\n\nError: Movie Cached" +
                            "\nTitle: " + cachedMovie.title +
                            "\nPage: " + page +
                            "\ndateTime: " + getCurrentDateTime());
                    }
                    
                
                });
            }
        }catch(error)
        {
            
            console.log("Error Code: " + error + 
            "\nError Message: " + error.message + 
            "\nPage: " + page +
            "\ndateTime: " + getCurrentDateTime());
                
        }
        page++;
    }while(page < totalPages);

});

router.get("/getAllMovies", async (req, res) =>{
    let toReturn = [];
    
    let movies = await Movie.find();
    if(!movies)
    {
        console.log("Error: Movies is undefined" + 
            "\ndateTime: " + getCurrentDateTime());

        res.status(404).send("Movies not found");
    }

    movies.forEach(function(movie){
        let jsonObject = {};
        jsonObject.id = movie.id;
        jsonObject.title = movie.title;
        jsonObject.year = movie.year;
        jsonObject.rating = movie.rating;
        jsonObject.description = movie.description;
        jsonObject.coverImage = movie.coverImage;
        jsonObject.torrentURL = movie.torrentURL;

        toReturn.push(jsonObject);
    })

    res.status(200).send(toReturn);
});

router.post("/download", async (req, res) =>{

    //console.log(getServerSettingValueByName("torrent_download_path"));
    let torrentURL = req.body.torrentURL;

    const parseTorrent = require('parse-torrent')
    const fs = require('fs')
   
    let uri = parseTorrent.toMagnetURI({
        infoHash: torrentURL
      });

      console.log(uri);
    
    /*let client = new Client({logLevel: 'DEBUG'});
    let torrent = client.addTorrent(uri);

    torrent.on('complete', function() {
        console.log('complete!');
        torrent.files.forEach(function(file) {
            var newPath = 'F:\\' + file.path;
            fs.rename(file.path, newPath);
            // while still seeding need to make sure file.path points to the right place
            file.path = newPath;
        });
    });*/

    /*var WebTorrent = require('webtorrent')
 
    var client = new WebTorrent();
    var magnetUri = uri;

    client.add(magnetUri, { path: 'f:\\' }, function (torrent) {
        torrent.on('done', function () {
          console.log('torrent download finished')
        });

        torrent.on('download', function () {
            console.log("\n\nDownloaded: " + convertBytesToMegaBytes(torrent.downloaded) + " MB");
            console.log("\nSpeed: " + convertBytesToKiloBytes(torrent.downloadSpeed) + " kB/s");
            console.log("\nProgress: " + Math.round(torrent.progress * 100) + "%");

          });

      });*/
    

    res.status(200).send("Download...");

});

module.exports = router;
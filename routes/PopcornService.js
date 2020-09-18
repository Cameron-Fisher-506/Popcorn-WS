const express = require("express");
const router = express.Router();
const axios = require("axios");
const getCurrentDateTime = require("../utils/GeneralUtils").getCurrentDateTime;
const Client = require('node-torrent');
const convertBytesToMegaBytes = require('../utils/GeneralUtils').convertBytesToMegaBytes;
const convertBytesToKiloBytes = require('../utils/GeneralUtils').convertBytesToKiloBytes;
const getServerSettingValueByName = require("../utils/GeneralUtils").getServerSettingValueByName;
const parseTorrent = require('parse-torrent');
const WebTorrent = require('webtorrent');
const Movie = require("../models/movie").Movie;

const YTS_MOVIE_LIST_URL = require("../utils/Constants").YTS_MOVIE_LIST_URL;

router.get("/ping/:ip", async (req, res) => {

    let toReturn = null;

    toReturn = req.params.ip;

    res.status(200).send(toReturn);
});

router.post("/download", async (req, res) =>{


    let toReturn = {};
    
    //console.log(getServerSettingValueByName("torrent_download_path"));
    let torrentURL = req.body.torrentURL;
    console.log(torrentURL);
    let magnetUri = parseTorrent.toMagnetURI({
        infoHash: torrentURL
      });
    
    let client = new WebTorrent();
    client.add(magnetUri, { path: 'F:\\' }, function (torrent) {
        torrent.on('done', function () {
          console.log('torrent download finished')
        });

        torrent.on('download', function () {
            console.log("\n\nDownloaded: " + convertBytesToMegaBytes(torrent.downloaded) + " MB");
            console.log("\nSpeed: " + convertBytesToKiloBytes(torrent.downloadSpeed) + " kB/s");
            console.log("\nProgress: " + Math.round(torrent.progress * 100) + "%");

          });

      });
    
    toReturn.status = 0;
    toReturn.title = "Download Started";
    toReturn.message = "The movie ready shortly.";

    res.status(200).send(toReturn);

});

module.exports = router;
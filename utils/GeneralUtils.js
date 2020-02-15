const moment = require("moment");
const ServerSetting = require("../models/serversetting").ServerSetting;

function getCurrentDateTime()
{
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

function convertBytesToMegaBytes(bytes)
{
    let toReturn = 0;

    toReturn = Math.round(bytes / Math.pow(2, 20));

    return toReturn;
}

function convertBytesToKiloBytes(bytes)
{
    let toReturn = 0;

    toReturn = bytes / 1024;

    return toReturn;
}

function getServerSettingValueByName(name)
{
    let toReturn = null;

    let serverSetting = ServerSetting.findOne({"name":name});
    if(serverSetting != "undefined")
    {
        toReturn = serverSetting.value;
    }
    

    return toReturn;
}


module.exports.getCurrentDateTime = getCurrentDateTime;
module.exports.convertBytesToKiloBytes = convertBytesToKiloBytes;
module.exports.convertBytesToMegaBytes = convertBytesToMegaBytes;

module.exports.getServerSettingValueByName = getServerSettingValueByName;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServerSettingSchema = new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    }, 
    value:{
        type:String
    }
});

const ServerSetting = mongoose.model("ServerSetting", ServerSettingSchema);

module.exports.ServerSetting = ServerSetting;
module.exports.ServerSettingSchema = ServerSettingSchema;
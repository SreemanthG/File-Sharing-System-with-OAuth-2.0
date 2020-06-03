var mongoose = require("mongoose");

var fileSchema = new mongoose.Schema({
    filename: String,
    desc: String,
    filetype:String
})

module.exports = mongoose.model("Files",fileSchema);
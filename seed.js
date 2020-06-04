var mongoose = require("mongoose")
var User = require("./models/user");
var File = require("./models/file");

module.exports = function(){
    User.remove({},function(err,data){
        console.log("deleted" + data);
    });
}

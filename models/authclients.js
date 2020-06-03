var mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,  
        required: true,
       },
    email:{
        type: String,
        trim: true,  
        required: true,
       },
    //0 - filename, 1 - filetype, 2 - desc
    accesstype:[],
    secid:{
        type: String,
        trim: true,  
        // required: true,
       },
    granted:{
        type:Boolean,
        trim: true
    }
})

// hash user password before saving into database
// userSchema.pre('save', function(next){
//     this.secid = bcrypt.hashSync(String(this._id), saltRounds);
//     next();
//     });

module.exports = mongoose.model("AuthClient",userSchema)
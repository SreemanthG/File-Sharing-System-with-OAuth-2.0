var mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var count=0;
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
    password:{
        type: String,
        trim: true,  
        required: true,
       },
    number:{
        type: Number,
        trim: true,  
        required: true,
       },
    file:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Files",
    }]
})
// hash user password before saving into database
// if(count===0){
//     userSchema.pre('save', function(next){
//         this.password = bcrypt.hashSync(this.password, saltRounds);
//         count++;

//         next();
//         });
// }


module.exports = mongoose.model("User",userSchema)
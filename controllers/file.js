const File = require("../models/file");
const User = require("../models/user");


module.exports = {
    add: function(req,res,next){
        File.create(req.body.file,function(err,fileInfo){
            if(err){
                next(err)
            } else{
                User.findById(req.id,function(err,user){
                    if(err)
                        next(err)
                    else{
                        user.file.push(fileInfo);
                        user.save();
                        res.json({status:"success",message:"File added successfully",data:fileInfo});
                    }
                })
            }
        })
    },

    view: function(req,res,next){
        User.findById(req.id).populate("file").exec(function(err,user){
            if(err)
                next(err)
            else{
                
                res.json({status:"success",message:"File sent successfully",data:user})
            }
        })
    }
}
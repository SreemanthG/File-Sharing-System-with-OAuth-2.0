const File = require("../models/file");
const User = require("../models/user");
const AuthClient = require("../models/authclients");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



module.exports = {
    register:function(req,res,next){
        AuthClient.create(req.body.authclient,function(err,authClient){
            if(err){
                next(err)
            } else{
                res.json({status:"success",secretId:authClient.secid,publicId:authClient._id,reqlinkforaccess:"http://localhost:3000/oauth/<publicid>/<secid>"});
            }
        })
    },

    authenticate: function(req,res,next){
        User.findOne({email:req.body.email},function(err,userModel){
            if (err) {
                next(err);
               } else { 
                console.log(userModel.password)
                bcrypt.compare(req.body.password, userModel.password, function(err, result) {
                    if(result){
                        AuthClient.findById(req.params.pubid,function(err,Authinfo){
                            const token = jwt.sign({id: userModel._id}, 'secretkey', { expiresIn: '1h' });
                            res.json({status:"success", message: "Grant the permission", data:{permissions: Authinfo.accesstype, token:token,accessinfo:"name,email,files"}});
                        })
                        // const token = jwt.sign({id: userModel._id}, 'secretkey', { expiresIn: '1h' });
                    }else{
                        res.json({status:"error", message: "Invalid email/password!!!", data:null});
                    }
                });
                    // if(bcrypt.compareSync(req.body.password, userModel.password)) {
                    // AuthClient.findById(req.params.pubid,function(err,Authinfo){
                    //     res.json({status:"success", message: "Grant the permission", data:{permissions: Authinfo.accesstype, company:token,accessinfo:"name,email,files"}});
                    // })
                    // // const token = jwt.sign({id: userModel._id}, 'secretkey', { expiresIn: '1h' });
                    // }else{
                    // res.json({status:"error", message: "Invalid email/password!!!", data:null});
                    // }
               }
        })
    },

    grant: function(req,res,next){
 
        AuthClient.findByIdAndUpdate(req.params.pubid,{granted:true},function(err,grantedClient){
            User.findById(req.id).populate('file').exec(function(err,grantedUser){
                var data = {};
                grantedClient.accesstype.forEach(element => {
                    if(element =="0"){
                        
                        data.name = grantedUser.username;
                    }
                    if(element == "1"){
                        data.email = grantedUser.email;
                    }
                    if(element == "2"){
                        data.files = grantedUser.file
                    }
                });
                
                const token = jwt.sign({data:{email:grantedUser.email,username:grantedUser.username,files:grantedUser.file}}, 'secretkey', { expiresIn: '1h' });
                console.log(grantedClient.accesstype);

                res.json({status:"success", message: "Token Generated", token:token});

                })
        })

    },

    verify: verifyToken
}


function verifyToken(req,res,next){
    const bearerHeader = req.headers["oauth"];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ")[1];
        req.token = bearer;
        jwt.verify(req.token,'secretkey',function(err,authData){
                    if(!err){
                        
                        res.json({status:"success", message: "Details", data:authData});
                        
                    } else{
                        res.sendStatus(403);
                    }
                })
        // next(); 
    } else{
        res.sendStatus(403)
    }
}

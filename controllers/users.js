const User = require('../models/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

module.exports = {
    create: function(req,res,next){
        console.log(req.body);
        
        User.create({email:req.body.email,username:req.body.username,password:req.body.password,number:req.body.number},function(err,userModel){
            if(err)
                next(err)
            else
            res.json({status: "success", message: "User added successfully!!!", data: null});
        })
    },

    authenticate: function(req,res,next){
        User.findOne({emial:req.body.user},function(err,userModel){
            if (err) {
                next(err);
               } else {
                   console.log(req.body.password);
                   console.log(userModel);
                   
                   
                    if(bcrypt.compareSync(req.body.password, userModel.password)) {
                    const token = jwt.sign({id: userModel._id}, 'secretkey', { expiresIn: '1h' });
                    res.json({status:"success", message: "user found!!!", data:{user: userModel, token:token}});
                    }else{
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
                    }
               }
        })
    }
}
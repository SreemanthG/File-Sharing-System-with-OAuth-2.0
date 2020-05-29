var express = require("express");
var jwt = require("jsonwebtoken");

var app = express();

app.get("/",function(req,res){
    res.json({
        message:"Welcome to the api"
    })
})

app.post("/protected",verifyToken,function(req,res){
    jwt.verify(req.token,'secretkey',function(err,authData){
        if(!err){
            res.json({
                user:authData
            })
        } else{
            // res.sendStatus(403);
        }
    })
})

app.post("/api/posts",function(req,res){

    //Mock User
    var user={
        email:"sree@123",
        username:"sreemanth",
        id:1
    }
    jwt.sign({user:user},"secretkey",function(err,token){
        res.json({token:token});
    })
})


//Verify Token

function verifyToken(req,res,next){

    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ")[1];
        req.token = bearer;
        next(); 
    } else{
        res.sendStatus(403)
    }
}


var port = process.env.port||3000
app.listen(port,function(req,res){
    console.log("Server has started")
})
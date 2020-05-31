var express = require("express");
var jwt = require("jsonwebtoken");
var mongoose =require("mongoose");
var bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
var User = require("./models/user");
var app = express();

mongoose.connect("mongodb://localhost/FileSharingOauth",{ useUnifiedTopology: true ,useNewUrlParser: true});
var userRoutes = require("./routes/user");


app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({ extended: true }))


//Routes
app.get("/",function(req,res){
    res.json({
        message:"Welcome to the api"
    })
})
app.use(userRoutes,verifyToken);

// app.post("/test",function(req,res){
//     // console.log(req.body);
// })

function verifyToken(req,res,next){

    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ")[1];
        req.token = bearer;
        jwt.verify(req.token,'secretkey',function(err,authData){
                    if(!err){
                        req.id = authData.id;
                        next();
                    } else{
                        res.sendStatus(403);
                    }
                })
        // next(); 
    } else{
        res.sendStatus(403)
    }
}

// //token
// app.post("/protected",verifyToken,function(req,res){
//     jwt.verify(req.token,'secretkey',function(err,authData){
//         if(!err){
//             res.json({
//                 user:authData
//             })
//         } else{
//             // res.sendStatus(403);
//         }
//     })
// })

// app.post("/api/posts",function(req,res){

//     //Mock User
//     var user={
//         email:"sree@123",
//         username:"sreemanth",
//         id:1
//     }
//     jwt.sign({user:user},"secretkey",function(err,token){
//         res.json({token:token});
//     })
// })


// //Verify Token

// function verifyToken(req,res,next){

//     const bearerHeader = req.headers["authorization"];
//     if(typeof bearerHeader !== 'undefined'){
//         const bearer = bearerHeader.split(" ")[1];
//         req.token = bearer;
//         next(); 
//     } else{
//         res.sendStatus(403)
//     }
// }


//Signup

// bcrypt.hash("Hello", 10, (err, hash) => {

//         // Now we can store the password hash in db.
//         console.log(hash);
// });

// app.get("signup",function(req,res){

// })

var port = process.env.port||3000
app.listen(port,function(req,res){
    console.log("Server has started")
})
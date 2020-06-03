var router = require("express").Router();
const oauthController = require('../controllers/oauth');
const AuthClient = require("../models/authclients");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post("/register",oauthController.register); //returns secid and pubid
router.post("/:pubid/:secid/login",oauthController.authenticate) //sends a req and pops up a login screen
router.post("/:pubid/:secid/grant",verifyToken,oauthController.grant); //Post req to login
router.post("/verify",oauthController.verify); ////req for grant and generate token
function verifyToken(req,res,next){
    console.log("entered");
    
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ")[1];
        req.token = bearer;
        jwt.verify(req.token,'secretkey',function(err,authData){
                    if(!err){
                        req.id = authData.id;
                        // console.log(authData);
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

module.exports = router
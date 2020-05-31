var router = require("express").Router();
const userController = require('../controllers/users');
const jwt = require('jsonwebtoken');

router.post("/register",userController.create);
router.post("/login",userController.authenticate)
router.get("/protected",verifyToken,function(req,res){
    res.json({id:req.id,status:"successfull"});
})

module.exports = router;
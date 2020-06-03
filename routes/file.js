var router = require("express").Router();
const fileController = require('../controllers/file');

router.post("/",fileController.add);
router.get("/",fileController.view);

module.exports = router;

var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/aquarioController");


router.post("/register", function (req, res) {
  aquarioController.register(req, res);
})

module.exports = router;
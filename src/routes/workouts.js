var express = require("express");
var router = express.Router();

var workoutController = require("../controllers/workoutController");

router.post("/:userId", function (req, res) {
    workoutController.register(req, res);
});

router.get("/:userId", function (req, res) {
    workoutController.list(req, res);
});

module.exports = router;

var express = require("express");
var router = express.Router();

var userController = require("../controllers/userController");

// Recebendo os dados do formulário e direcionando para register no controller.
router.post("/register", function (req, res) {
    userController.register(req, res);
})

router.post("/enter", function (req, res) {
    userController.enter(req, res);
});

module.exports = router;

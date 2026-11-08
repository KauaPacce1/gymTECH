var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

// Recebendo os dados do formulário e direcionando para register no controller.
router.post("/register", function (req, res) {
    usuarioController.register(req, res);
})

router.post("/enter", function (req, res) {
    usuarioController.enter(req, res);
});

module.exports = router;

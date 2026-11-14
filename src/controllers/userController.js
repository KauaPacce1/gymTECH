var userModel = require("../models/userModel");

function enter(req, res) {
    var email = req.body.emailServer;
    var password = req.body.passwordServer;

    if (typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ message: "Preencha o e-mail." });
    }
    if (typeof password !== "string" || password === "") {
        return res.status(400).json({ message: "Preencha a senha." });
    }
    if (email.trim().length > 100 || password.length > 45) {
        return res.status(400).json({ message: "E-mail ou senha excede o tamanho permitido." });
    }

    return userModel.enter(email.trim(), password)
        .then(function (users) {
            if (users.length === 1) {
                res.json({ id: users[0].id, name: users[0].name, email: users[0].email });
            } else if (users.length === 0) {
                res.status(403).json({ message: "E-mail e/ou senha inválidos." });
            } else {
                res.status(403).json({ message: "Mais de um usuário com o mesmo login e senha." });
            }
        })
        .catch(function (error) {
            console.error("Erro ao realizar o login:", error.code || "Erro de conexão com o banco.");
            res.status(500).json({ message: "Não foi possível realizar o login. Tente novamente." });
        });
}

function register(req, res) {
    var name = req.body.nameServer;
    var email = req.body.emailServer;
    var password = req.body.passwordServer;

    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ message: "Preencha seu nome." });
    }
    if (name.trim().length > 45) {
        return res.status(400).json({ message: "O nome deve ter no máximo 45 caracteres." });
    }
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({ message: "Digite um e-mail válido." });
    }
    if (typeof password !== "string" || password.length < 8) {
        return res.status(400).json({ message: "A senha deve ter no mínimo 8 caracteres." });
    }
    if (email.trim().length > 100) {
        return res.status(400).json({ message: "O e-mail deve ter no máximo 100 caracteres." });
    }
    if (password.length > 45) {
        return res.status(400).json({ message: "A senha deve ter no máximo 45 caracteres." });
    }

    return userModel.register(name.trim(), email.trim(), password)
        .then(function (result) {
            res.status(201).json({
                id: result.insertId,
                name: name.trim(),
                email: email.trim(),
                message: "Cadastro realizado com sucesso!"
            });
        })
        .catch(function (error) {
            console.error("Erro ao realizar o cadastro:", error.code || "Erro de conexão com o banco.");
            if (error.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ message: "Este e-mail já está cadastrado." });
            }
            res.status(500).json({ message: "Não foi possível realizar o cadastro. Tente novamente." });
        });
}

module.exports = {
    enter,
    register
};

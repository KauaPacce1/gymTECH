var database = require("../database/config");
var mysql = require("mysql2");

function enter(email, password) {
    var sql = "SELECT id, nome AS name, email FROM usuario WHERE email = ? AND senha = ?;";
    return database.executar(mysql.format(sql, [email, password]));
}

function register(name, email, password) {
    var sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?);";
    return database.executar(mysql.format(sql, [name, email, password]));
}

module.exports = {
    enter,
    register
};

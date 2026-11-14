var database = require("../database/config");
var mysql = require("mysql2");

function enter(email, password) {
    var sql = "SELECT id, name, email FROM user WHERE email = ? AND password = ?;";
    return database.executar(mysql.format(sql, [email, password]));
}

function register(name, email, password) {
    var sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?);";
    return database.executar(mysql.format(sql, [name, email, password]));
}

module.exports = {
    enter,
    register
};

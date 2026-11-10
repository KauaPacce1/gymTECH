var database = require("../database/config");
var mysql = require("mysql2");

function register(userId, name, muscleGroup, sets, date) {
    var sql = `
        INSERT INTO anotacao
            (nome, tipo, qtd_serie, data_treino, fk_usuario)
        VALUES (?, ?, ?, ?, ?);
    `;

    return database.executar(
        mysql.format(sql, [name, muscleGroup, sets, date, userId])
    );
}

function list(userId) {
    var sql = `
        SELECT
            id,
            nome AS name,
            tipo AS muscleGroup,
            qtd_serie AS sets,
            DATE_FORMAT(data_treino, '%Y-%m-%d') AS date
        FROM anotacao
        WHERE fk_usuario = ?
        ORDER BY data_treino DESC, id DESC;
    `;

    return database.executar(mysql.format(sql, [userId]));
}

module.exports = {
    register,
    list
};

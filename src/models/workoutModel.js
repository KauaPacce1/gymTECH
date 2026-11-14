var database = require("../database/config");
var mysql = require("mysql2");

function register(userId, name, muscleGroup, sets, date) {
    var sql = `
        INSERT INTO workout_note
            (name, muscle_group, sets, workout_date, fk_user)
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
            name,
            muscle_group AS muscleGroup,
            sets,
            DATE_FORMAT(workout_date, '%Y-%m-%d') AS date
        FROM workout_note
        WHERE fk_user = ?
        ORDER BY workout_date DESC, id DESC;
    `;

    return database.executar(mysql.format(sql, [userId]));
}

module.exports = {
    register,
    list
};

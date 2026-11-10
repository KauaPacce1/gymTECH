var workoutModel = require("../models/workoutModel");

function register(req, res) {
    var userId = Number(req.params.userId);
    var name = req.body.name;
    var muscleGroup = req.body.muscleGroup;
    var sets = Number(req.body.sets);
    var date = req.body.date;

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            message: "Usuário inválido."
        });
    }

    if (typeof name !== "string" ||
        name.trim() === "" ||
        name.trim().length > 45) {
        return res.status(400).json({
            message: "Preencha o nome do exercício com até 45 caracteres."
        });
    }

    var muscleGroups = ["peito", "costas", "ombros", "pernas", "biceps", "triceps"];

    if (!muscleGroups.includes(muscleGroup)) {
        return res.status(400).json({
            message: "Selecione um grupo muscular válido."
        });
    }

    if (!Number.isInteger(sets) || sets <= 0) {
        return res.status(400).json({
            message: "Informe uma quantidade inteira e positiva de séries."
        });
    }

    if (typeof date !== "string" || date === "") {
        return res.status(400).json({
            message: "Preencha a data do treino."
        });
    }

    return workoutModel.register(
        userId, name.trim(), muscleGroup, sets, date
    ).then(function (result) {
        res.status(201).json({
            id: result.insertId,
            message: "Treino registrado com sucesso!"
        });
    }).catch(function (error) {
        console.error("Erro ao registrar treino:", error.code);

        res.status(500).json({
            message: "Não foi possível registrar o treino."
        });
    });
}

function list(req, res) {
    var userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            message: "Usuário inválido."
        });
    }

    return workoutModel.list(userId)
        .then(function (workouts) {
            res.status(200).json(workouts);
        })
        .catch(function (error) {
            console.error("Erro ao buscar treinos:", error.code);

            res.status(500).json({
                message: "Não foi possível carregar os treinos."
            });
        });
}

module.exports = {
    register,
    list
};

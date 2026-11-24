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

    if (typeof name !== "string" || name.trim() === "" || name.trim().length > 45) {
        return res.status(400).json({
            message: "Preencha o nome do exercício com até 45 caracteres."
        });
    }

    var muscleGroups = ["Peito", "Costas", "Ombros", "Pernas", "Biceps", "Triceps"];

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

    if (typeof date !== "string" || date.trim() === "") {
        return res.status(400).json({
            message: "Preencha a data do treino."
        });
    }

    return workoutModel.register(userId, name.trim(), muscleGroup, sets, date)
    .then(function (result) {
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

function update(req, res) {
    var userId = Number(req.params.userId);
    var workoutId = Number(req.params.workoutId);
    var name = req.body.name;
    var muscleGroup = req.body.muscleGroup;
    var sets = Number(req.body.sets);
    var date = req.body.date;

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            message: "Usuário inválido."
        });
    }

    if (!Number.isInteger(workoutId) || workoutId <= 0) {
        return res.status(400).json({
            message: "Treino inválido."
        });
    }

    if (typeof name !== "string" || name.trim() === "" || name.trim().length > 45) {
        return res.status(400).json({
            message: "Preencha o nome do exercício com até 45 caracteres."
        });
    }

    var muscleGroups = ["Peito", "Costas", "Ombros", "Pernas", "Biceps", "Triceps"];

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

    if (typeof date !== "string" || date.trim() === "") {
        return res.status(400).json({
            message: "Preencha a data do treino."
        });
    }

    return workoutModel.update(userId, workoutId, name.trim(), muscleGroup, sets, date)
        .then(function (result) {
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Treino não encontrado para este usuário."
                });
            }

            res.status(200).json({
                message: "Treino atualizado com sucesso!"
            });
        })
        .catch(function (error) {
            console.error("Erro ao atualizar treino:", error.code);
            res.status(500).json({
                message: "Não foi possível atualizar o treino."
            });
        });
}

function remove(req, res) {
    var userId = Number(req.params.userId);
    var workoutId = Number(req.params.workoutId);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            message: "Usuário inválido."
        });
    }

    if (!Number.isInteger(workoutId) || workoutId <= 0) {
        return res.status(400).json({
            message: "Treino inválido."
        });
    }

    return workoutModel.remove(userId, workoutId)
        .then(function (result) {
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Treino não encontrado para este usuário."
                });
            }

            res.status(200).json({
                message: "Exercício removido com sucesso!"
            });
        })
        .catch(function (error) {
            console.error("Erro ao remover treino:", error.code);
            res.status(500).json({
                message: "Não foi possível remover o exercício."
            });
        });
}

module.exports = {
    register,
    list,
    update,
    remove
};

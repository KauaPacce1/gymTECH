var mysql = require("mysql2");

// CONEXÃO DO BANCO MYSQL SERVER
var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

function executar(instrucao) {

    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        return Promise.reject(new Error("Ambiente de execução não configurado."));
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.on("error", function (erro) {
            conexao.destroy();
            reject(erro);
        });
        conexao.connect(function (erro) {
            if (erro) {
                conexao.destroy();
                return reject(erro);
            }
            conexao.query(instrucao, function (erro, resultados) {
                conexao.end();
                if (erro) {
                    return reject(erro);
                }
                resolve(resultados);
            });
        });
    });
}

module.exports = {
    executar
};

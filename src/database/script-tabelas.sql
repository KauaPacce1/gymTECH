CREATE DATABASE gymTECH;

USE gymTECH;

CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
senha VARCHAR(45) NOT NULL
);

CREATE TABLE frequencia_mensal (
id INT PRIMARY KEY AUTO_INCREMENT,
data_treino DATE NOT NULL,
frequencia TINYINT NOT NULL,
fk_usuario INT,
CONSTRAINT fk_usuario_frequencia FOREIGN KEY (fk_usuario) REFERENCES usuario(id) 
);

CREATE TABLE anotacao (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
tipo VARCHAR(45) NOT NULL,
CONSTRAINT chTipo CHECK(tipo IN ('Peito', 'Costas', 'Ombros', 'Pernas', 'Biceps', 'Triceps')),
qtd_serie INT NOT NULL,
fk_usuario INT,
CONSTRAINT fk_usuario_anotacao FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);
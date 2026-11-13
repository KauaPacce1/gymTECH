CREATE DATABASE gymTECH;

USE gymTECH;

CREATE TABLE user (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(45) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(45) NOT NULL
);

CREATE TABLE monthly_frequency (
id INT PRIMARY KEY AUTO_INCREMENT,
frequency TINYINT NOT NULL,
reference_month DATE NOT NULL,
fk_user INT,
CONSTRAINT ch_frequency CHECK(frequency BETWEEN 0 AND 31),
CONSTRAINT uq_user_month UNIQUE (fk_user, reference_month),
CONSTRAINT fk_user_frequency FOREIGN KEY (fk_user) REFERENCES user(id)
);

CREATE TABLE workout_note (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(45) NOT NULL,
muscle_group VARCHAR(45) NOT NULL,
CONSTRAINT ch_muscle_group CHECK(muscle_group IN ('Peito', 'Costas', 'Ombros', 'Pernas', 'Biceps', 'Triceps')),
sets INT NOT NULL,
workout_date DATE NOT NULL,
fk_user INT,
CONSTRAINT fk_user_note FOREIGN KEY (fk_user) REFERENCES user(id)
);
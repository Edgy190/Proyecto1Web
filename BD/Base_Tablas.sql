CREATE DATABASE InclusiveWhiteboard;

USE InclusiveWhiteboard;

CREATE TABLE usuario (
    correo VARCHAR(50) PRIMARY KEY,
    pass VARCHAR(25) NOT NULL
);

CREATE TABLE estado (
    id_estado INT(8) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(25) NOT NULL
);

CREATE TABLE workflow (
	id_workflow INT(8) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    fecha DATE NOT NULL,
    CONSTRAINT fk_estado FOREIGN KEY (id_estado) REFERENCES estado(id_estado)
);

CREATE TABLE stickynote (
    id_stickynote INT(8) PRIMARY KEY AUTO_INCREMENT,
    contenido VARCHAR(250) NOT NULL
    -- color VARCHAR(25),
    -- height INT(8) NOT NULL,
    -- width INT(8) NOT NULL
);

CREATE TABLE workflow_X_stickynote (
	CONSTRAINT fk_workflow FOREIGN KEY (id_workflow) 
    REFERENCES workflow(id_workflow),
    CONSTRAINT fk_stickynote FOREIGN KEY (id_stickynote) 
    REFERENCES stickynote(id_stickynote)
);
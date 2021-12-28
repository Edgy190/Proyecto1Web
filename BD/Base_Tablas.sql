CREATE DATABASE InclusiveWhiteboard;

USE InclusiveWhiteboard;

CREATE TABLE Usuario (
    correo VARCHAR(50) PRIMARY KEY,
    pass VARCHAR(25) NOT NULL
);

CREATE TABLE Workflow (
	id_workflow INT(8) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(250) NOT NULL,
    fecha DATE NOT NULL,
    CONSTRAINT fk_estado FOREIGN KEY (id_estado) REFERENCES Estado(id_estado)
);

CREATE TABLE Estado (
    id_estado INT(8) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(25) NOT NULL
);

CREATE TABLE Stickynote (
    id_stickynote INT(8) PRIMARY KEY AUTO_INCREMENT,
    contenido VARCHAR(250) NOT NULL
    -- color VARCHAR(25),
    -- height INT(8) NOT NULL,
    -- width INT(8) NOT NULL
);

CREATE TABLE Workflow_X_Stickynote (
	CONSTRAINT fk_workflow FOREIGN KEY (id_workflow) 
    REFERENCES Workflow(id_workflow),
    CONSTRAINT fk_stickynote FOREIGN KEY (id_stickynote) 
    REFERENCES Stickynote(id_stickynote)
);
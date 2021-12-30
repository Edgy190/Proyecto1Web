CREATE TABLE workflow (
	id_workflow INT(8) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    fecha DATE NOT NULL,
    id_estado INT NOT NULL,
    CONSTRAINT fk_estado FOREIGN KEY (id_estado) REFERENCES estado(id_estado)
);

DELIMITER //
-- Procedimientos workflow
CREATE PROCEDURE insert_workflow(IN pNombre VARCHAR(50), IN pDescripcion VARCHAR(250),
IN pFecha DATE, IN pId_estado INT)
BEGIN
	INSERT INTO workflow(nombre, descripcion, fecha, id_estado)
    VALUES (pNombre, pDescripcion, pFecha, pId_estado);
    COMMIT;
END //

CREATE PROCEDURE update_workflow(IN pId_workflow INT, IN pNombre VARCHAR(50),
IN pDescripcion VARCHAR(250), IN pFecha DATE, IN pId_estado INT)
BEGIN
	UPDATE workflow
		SET nombre = pNombre,
			descripcion = pDescripcion,
            fecha = pFecha,
            id_estado = pId_estado
		WHERE id_workflow = pId_workflow;
    COMMIT;
END //
DELIMITER ;
DELIMITER //
-- Procedimientos usuario
CREATE PROCEDURE insert_usuario(IN pCorreo VARCHAR(50), IN pPass VARCHAR(25))
BEGIN
	INSERT INTO usuario(correo, pass)
    VALUES (pCorreo, SHA(pPass));
    COMMIT;
END //

CREATE PROCEDURE update_usuario(IN pCorreo VARCHAR(50), IN pPass VARCHAR(25))
BEGIN
	UPDATE usuario
		SET correo = pCorreo,
			pass = pPass
		WHERE pCorreo = correo;
    COMMIT;
END //

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

-- Procedimientos stickynote
CREATE PROCEDURE insert_stickynote(IN pContenido VARCHAR(250))
BEGIN
	INSERT INTO stickynote(contenido)
    VALUES (pContenido);
    COMMIT;
END //

CREATE PROCEDURE update_stickynote(IN pId_stickynote INT, IN pContenido VARCHAR(250))
BEGIN
	UPDATE stickynote
		SET contenido = pContenido
		WHERE pId_stickynote = id_stickynote;
    COMMIT;
END //

-- Procedimientos workflow_X_stickynote
CREATE PROCEDURE insert_workflow_X_stickynote(IN pId_workflow INT, IN pId_stickynote INT)
BEGIN
	INSERT INTO workflow_X_stickynote(id_workflow, id_stickynote)
    VALUES (pId_workflow, pId_stickynote);
    COMMIT;
END //

CREATE PROCEDURE update_workflow_X_stickynote(IN pId_workflow INT,
IN pId_stickynote INT)
BEGIN
	UPDATE workflow_X_stickynote
		SET id_workflow = pId_workflow,
			id_stickynote = pId_stickynote
		WHERE id_workflow = pId_workflow OR id_stickynote = pId_stickynote;
    COMMIT;
END //
DELIMITER ;
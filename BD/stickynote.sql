CREATE TABLE stickynote (
    id_stickynote INT(8) PRIMARY KEY AUTO_INCREMENT,
    contenido VARCHAR(250) NOT NULL
    -- color VARCHAR(25),
    -- height INT(8) NOT NULL,
    -- width INT(8) NOT NULLl
);

DELIMITER //
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

CREATE PROCEDURE delete_stickynote(IN pId_stickynote INT)
BEGIN
	DELETE FROM stickynote
    WHERE id_stickynote = pId_stickynote;
    COMMIT;
END //
DELIMITER ;
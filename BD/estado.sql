CREATE TABLE estado (
    id_estado INT(8) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(25) NOT NULL
);

DELIMITER //
-- Procedimientos estado
CREATE PROCEDURE insert_estado(IN pNombre VARCHAR(25))
BEGIN
	INSERT INTO estado(nombre)
    VALUES (pNombre);
    COMMIT;
END //

CREATE PROCEDURE update_estado(IN pNombre VARCHAR(25))
BEGIN
	UPDATE estado
		SET nombre = pNombre
		WHERE pNombre = nombre;
    COMMIT;
END //
DELIMITER ;
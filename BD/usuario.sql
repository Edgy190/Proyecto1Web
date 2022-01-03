CREATE TABLE usuario (
    correo VARCHAR(50) PRIMARY KEY,
    pass VARCHAR(25) NOT NULL
);

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

CREATE PROCEDURE delete_usuario(IN pCorreo VARCHAR(50))
BEGIN
	DELETE FROM usuario
    WHERE correo = pCorreo;
    COMMIT;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE verify_data(IN pCorreo VARCHAR(50), IN pPass VARCHAR(25), OUT oAnswer CHAR)
BEGIN
	DECLARE EXIT HANDLER FOR 1176 SELECT 'Password not found.' Message;
    DECLARE EXIT HANDLER FOR 1232 SELECT 'Incorrect argument type to variable.' Message;
	SELECT u.correo, u.pass
    FROM usuario u
    WHERE pCorreo = u.correo;
	IF (SHA(pPass) = u.pass) THEN
		SET oAnswer = 'V';
	ELSE
		SET oAnswer = 'F';
	END IF;
END //
DELIMITER ;

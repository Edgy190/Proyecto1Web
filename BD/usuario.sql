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

CREATE FUNCTION verify_data(IN pCorreo VARCHAR(50), IN pPass VARCHAR(25)) RETURNS CHAR
BEGIN
	SELECT *
    FROM usuario
    WHERE pCorreo = correo
    IF (pCorreo = correo)
    	IF (SHA(pPass) = pass)
        	RETURN '1'
        ELSE
        	RETURN '0'
            DECLARE EXIT HANDLER FOR 1176 SELECT 'Password not found.' Message;
     ELSE
     	DECLARE EXIT HANDLER FOR 1176 SELECT 'Correo not found.' Message;
END //
DELIMITER ;

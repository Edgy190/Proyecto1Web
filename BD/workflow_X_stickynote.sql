CREATE TABLE workflow_X_stickynote (
	id_workflow INT NOT NULL,
	CONSTRAINT fk_workflow FOREIGN KEY (id_workflow) 
    REFERENCES workflow(id_workflow),
    id_stickynote INT NOT NULL,
    CONSTRAINT fk_stickynote FOREIGN KEY (id_stickynote) 
    REFERENCES stickynote(id_stickynote)
);

DELIMITER //
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

CREATE PROCEDURE delete_workflow_X_stickynote(IN pId_workflow INT,
IN pId_stickynote INT)
BEGIN
	DELETE FROM workflow_X_stickynote
    WHERE id_workflow = pId_workflow OR id_stickynote = pId_stickynote;
    COMMIT;
END //
DELIMITER ;
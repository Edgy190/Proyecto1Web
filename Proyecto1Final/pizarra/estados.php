<?php

    session_start();
    include "db_connection.php";

    $nombre=$_REQUEST["nombre"];
    $workflow_id = $_REQUEST["workflow_id"];
    
    $conn = get_connection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    
    $sql = "INSERT INTO estado (nombre, workflow_id)
    VALUES ('$nombre','$workflow_id')";

    if (mysqli_query($conn, $sql)) {
        $last_id = mysqli_insert_id($conn);
        echo $last_id;
    }
    else {
        echo "Error: " . $query . mysqli_error($conn);
    }

    mysqli_close($conn);


?> 
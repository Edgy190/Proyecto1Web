<?php

    session_start();
    include "db_connection.php";

    $color=$_REQUEST["color"];
    $estado_id=$_REQUEST["estado_id"];
    
    $conn = get_connection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    
    $sql = "INSERT INTO stickynote (contenido, color, estado_id)
    VALUES ('','$color','$estado_id')";

    if (mysqli_query($conn, $sql)) {
        $last_id = mysqli_insert_id($conn);
        echo $last_id;
    }
    else {
        echo "Error: " . $query . mysqli_error($conn);
    }

    mysqli_close($conn);


?> 
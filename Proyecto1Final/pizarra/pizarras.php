<?php

    session_start();
    include "db_connection.php";

    $nombre=$_REQUEST["nombre"];
    $descripcion=$_REQUEST["descripcion"];
    $fecha = $_REQUEST["fecha"];
    $id_usuario = $_REQUEST["id_usuario"];
    
    $conn = get_connection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    
    $sql = "INSERT INTO workflow (nombre, descripcion, fecha, id_usuario)
    VALUES ('$nombre','$descripcion','$fecha','$id_usuario')";

    if (mysqli_query($conn, $sql)) {
        $last_id = mysqli_insert_id($conn);
        echo $last_id;
    }
    else {
        echo "Error: " . $query . mysqli_error($conn);
    }

    mysqli_close($conn);


?> 
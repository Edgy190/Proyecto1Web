<?php

    session_start();
    include "db_connection.php";

    $id_stickynote = $_REQUEST["id_stickynote"];
    $contenido = $_REQUEST["contenido"];
    $color=$_REQUEST["color"];
    $estado_id=$_REQUEST["estado_id"];
    
    $conn = get_connection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    
    $sql = "UPDATE stickynote SET contenido='$contenido', color  ='$color',estado_id = '$estado_id' WHERE id_stickynote='$id_stickynote'";
    mysqli_query($conn, $sql);
    mysqli_close($conn);


?> 
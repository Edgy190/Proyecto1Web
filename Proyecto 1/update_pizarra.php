<?php

    session_start();
    include "db_connection.php";

    $id_workflow = $_REQUEST["id_workflow"];
    $nombre = $_REQUEST["nombre"];
    $descripcion = $_REQUEST["descripcion"];
    $fecha=$_REQUEST["fecha"];
    $id_usuario=$_REQUEST["id_usuario"];
    
    $conn = get_connection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    
    $sql = "UPDATE workflow SET nombre='$nombre', descripcion  ='$descripcion',fecha = '$fecha' , id_usuario = '$id_usuario' WHERE id_workflow='$id_workflow' ";
    mysqli_query($conn, $sql);
    mysqli_close($conn);


?> 
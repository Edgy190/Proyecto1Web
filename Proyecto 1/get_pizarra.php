<?php
    session_start();
    include "db_connection.php";

    $idusuario = $_REQUEST["idusuario"];
    
    $conn = get_connection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    
    $sql = "SELECT * FROM workflow WHERE id_usuario = '$idusuario'";
    $result = mysqli_query($conn, $sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo $row["id_workflow"].",".$row["nombre"].",".$row["descripcion"].",".$row["fecha"]."/";
          }
    }
    else {
        echo "Error: " . $query . mysqli_error($conn);
    }

    mysqli_close($conn);


?> 
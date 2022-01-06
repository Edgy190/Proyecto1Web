<?php
    session_start();
    include "db_connection.php";

    $estado_id = $_REQUEST["estado_id"];
    
    $conn = get_connection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    
    
    $sql = "SELECT * FROM stickynote WHERE estado_id = '$estado_id'";
    $result = mysqli_query($conn, $sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo $row["id_stickynote"].",".$row["contenido"].",".$row["color"].",".$row["estado_id"]."/";
          }
    }
    else {
        echo "Error" . mysqli_error($conn);
    }

    mysqli_close($conn);


?> 
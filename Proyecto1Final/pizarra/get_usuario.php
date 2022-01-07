<?php
    session_start();
    include "db_connection.php";

    $idusuario = $_SESSION['email'];
    
    $conn = get_connection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    
    $sql = "SELECT id FROM usuario WHERE correo = '$idusuario'";
    $result = mysqli_query($conn, $sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo $row["id"];
          }
    }
    else {
        echo "Error" . mysqli_error($conn);
    }

    mysqli_close($conn);


?> 
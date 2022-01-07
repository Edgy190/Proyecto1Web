<?php
    session_start();
    include "db_connection.php";

    $workflow_id = $_REQUEST["workflow_id"];
    
    $conn = get_connection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    
    $sql = "SELECT * FROM estado WHERE workflow_id = '$workflow_id'";
    $result = mysqli_query($conn, $sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo $row["id_estado"].",".$row["nombre"]."/";
          }
    }
    else {
        echo "Error" . mysqli_error($conn);
    }

    mysqli_close($conn);


?> 
<?php
    session_start();
    include "db_connection.php";

    $id_estado = $_REQUEST["id_estado"];
    
    $conn = get_connection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    
    $sql = "DELETE FROM estado WHERE id_estado='$id_estado' ";

    if (mysqli_query($conn, $sql)) {
        echo "Record deleted successfully";
      } else {
        echo "Error deleting record: " . mysqli_error($conn);
      }
      
      mysqli_close($conn);

?>
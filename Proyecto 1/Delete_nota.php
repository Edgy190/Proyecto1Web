<?php
    session_start();
    include "db_connection.php";

    $id_stickynote = $_REQUEST["id_stickynote"];
    
    $conn = get_connection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    
    $sql = "DELETE FROM stickynote WHERE id_stickynote='$id_stickynote' ";

    if (mysqli_query($conn, $sql)) {
        echo "Record deleted successfully";
      } else {
        echo "Error deleting record: " . mysqli_error($conn);
      }
      
      mysqli_close($conn);

?>
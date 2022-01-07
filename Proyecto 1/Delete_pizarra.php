<?php
    session_start();
    include "db_connection.php";

    $id_workflow = $_REQUEST["id_workflow"];
    
    $conn = get_connection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    
    $sql = "DELETE FROM workflow WHERE id_workflow='$id_workflow' ";

    if (mysqli_query($conn, $sql)) {
        echo "Record deleted successfully";
      } else {
        echo "Error deleting record: " . mysqli_error($conn);
      }
      
      mysqli_close($conn);

?>
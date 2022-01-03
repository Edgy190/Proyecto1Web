<?php
session_start();
include "db_connection.php";

$email=$_REQUEST["email"];
$password=$_REQUEST["password"];
$conn = get_connection();

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$query = "CALL insert_usuario('$email','$password');";

if (mysqli_query($conn, $query)) {
    echo "Insertion complete";
}
else {
    echo "Error: " . $query . mysqli_error($conn);
}

mysqli_close($conn);

?>
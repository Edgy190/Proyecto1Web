<?php
error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set("display_errors", 1);

function get_connection() {
    $server_name = "localhost";
    $db_username = "root";
    $db_password = "";
    $db_name = "inclusivewhiteboard";

    $conn = mysqli_connect($server_name, $db_username, $db_password, $db_name);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
        exit;
    }

    return $conn;
}
?>
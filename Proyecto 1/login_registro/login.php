<?php
session_start();

//require "control_sesion.php"; //importa el control de sesiones el require detecta errores Fatales en la ejecución del archivo importado no así el include!
include "db_connection.php";

$email=$_REQUEST["email"];
$password=$_REQUEST["password"];

$conn = get_connection();

$query = "CALL verify_data('$email','$password',@verification);";
$compare = mysqli_query($conn, $query);
$answer = mysqli_query($conn, "SELECT @verification");

$verification = $answer->fetch_assoc();

if ($verification["@verification"] == 'V') {
    echo "Ingreso correcto";
}
else {
    echo "Ingreso incorrecto";
}

mysqli_close($conn);
?>
<?php
session_start();

//require "control_sesion.php"; //importa el control de sesiones el require detecta errores Fatales en la ejecución del archivo importado no así el include!
include "database_connection.php";

$email=$_REQUEST["email"];
$password=$_REQUEST["password"];
$conn = get_connection();

$result = ejecutar_query($conn, "select id,email from usuarios where email='$email' and password=md5('$password');");

if ($row=pg_fetch_row ($result)) {
    $_SESSION["id_usuario"]=$row[0];
    $_SESSION["email_usuario"]=$row[1];
    echo "[true,{'id_usuario':'$row[0]','email':'$row[1]'}]";
} else {
    echo "[false,{'Error':'Las credenciales del usuario no son válidas'}]";
}

pg_close($conn);
?>
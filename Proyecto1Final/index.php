<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
    <title>Login y Registro</title>
</head>
<body>
    <div class="registro">
        <form action="login.php" method="post">
            <table>
                <tr>
                    <th colspan="2" class="header">Bienvenido</th>
                </tr>
                <tr>
                    <td class="bienvenida-msg">
                        Haz login y si no tienes cuenta Registrate llenando los datos!
                    </td>
                </tr>
                <tr>
                    <td><input type=”text” id="email" name="email" placeholder="Correo"></td>
                </tr>
                <tr>
                    <td><input type="password" id="password" name="password" placeholder="Password"></td>
                </tr>
                <tr>
                    <td>
                        <button class="boton-registro" type="button" onclick="enviarDatos_deInicio('registro.php')">
                            Registrar
                        </button>
                        <button class="boton-registro" type="submit">
                            Login
                        </button>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</body>
</html>
function registrar() {
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "registro.php", false);

    xhttp.onreadystatechange = function() { //Call a function when the state changes.
        if(xhttp.readyState == 4 && xhttp.status == 200) { // complete and no errors
            alert(xhttp.responseText); // some processing here, or whatever you want to do with the response
        }
    };
    
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    xhttp.send(formData);
};
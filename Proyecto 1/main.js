


let notecount = 0;
let pizarracount = 0;


CargarDatos();




function CargarDatos() {
  var pizarrasas = [];
  var notasbases = [];
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "get_pizarra.php", false);
  var formData = new FormData();
  formData.append("idusuario", 1);

  xhttp.onload = function () {
    pizarrasas = this.response;

  };

  xhttp.send(formData);
  const piz = pizarrasas.split("/");
  piz.pop();

  //pizarras
  piz.forEach(element => {

    //creacion de la pizarra contenedora con sus titulos
    var estados = [];

    const pizacont = document.getElementById("pizarras");
    const piza = element.split(",");

    const newDiv = document.createElement("div");
    newDiv.className = "pizarra";
    const color = getRandomColor();
    const titleop = document.createElement("input");
    titleop.className = "tituloPizarra";
    titleop.style.backgroundColor = color;
    titleop.value = piza[1];

    var msg = new SpeechSynthesisUtterance();
    msg.lang = "es-ES";
    msg.text = piza[1];
    window.speechSynthesis.speak(msg);


    //evento para actualizar la pizarra
    titleop.addEventListener("keyup", () => {

      xhttp.open("POST", "update_pizarra.php", false);
      var formData = new FormData();
      formData.append("id_workflow", piza[0]);
      formData.append("nombre", titleop.value);
      formData.append("descripcion", Depop.value);
      formData.append("fecha", fechaop.value);
      formData.append("id_usuario", 1);
      xhttp.send(formData);

    });
    const Depop = document.createElement("input");
    Depop.className = "tituloPizarra";
    Depop.style.backgroundColor = color;
    Depop.value = piza[2];

    Depop.addEventListener("keyup", () => {

      xhttp.open("POST", "update_pizarra.php", false);
      var formData = new FormData();
      formData.append("id_workflow", piza[0]);
      formData.append("nombre", titleop.value);
      formData.append("descripcion", Depop.value);
      formData.append("fecha", fechaop.value);
      formData.append("id_usuario", 1);
      xhttp.send(formData);

    });

    const fechaop = document.createElement("input");
    fechaop.className = "tituloPizarra";
    fechaop.style.backgroundColor = color;
    fechaop.value = piza[3];
    fechaop.readOnly = true;
    newDiv.appendChild(titleop);
    newDiv.appendChild(Depop);
    newDiv.appendChild(fechaop);

    //recuperar estados de las tablas


    var xxhttp = new XMLHttpRequest();
    xxhttp.open("POST", "get_estados.php", false);
    var formData = new FormData();
    formData.append("workflow_id", piza[0]);
    xxhttp.onload = function () {
      estados = this.response;
    };
    xxhttp.send(formData);
    const esta = estados.split("/");
    esta.pop();
    //estados
    esta.forEach(element => {
      const con = element.split(",");
      const cat1 = document.createElement("div");
      cat1.className = "categorias";
      cat1.id = con[0];
      cat1.ondrop = dragDrop;
      cat1.ondragover = allowDrop;

      const tituloC1 = document.createElement('input');
      tituloC1.className = "TCategoria";
      tituloC1.value = con[1];
      tituloC1.readOnly = true;
      cat1.appendChild(tituloC1);
      newDiv.appendChild(cat1);
      //recuperar notas
      xhttp.open("POST", "gets_notas.php", false);
      var formData = new FormData();
      formData.append("estado_id", con[0]);
      xhttp.onload = function () {
        notasbases = this.response;
      };
      xhttp.send(formData);
      const notB = notasbases.split("/");
      notB.pop();
      //notas
      notB.forEach(element => {

        const notBB = element.split(",");
        const note = document.createElement('textarea');
        note.className = 'note';
        note.draggable = "true";
        note.style.backgroundColor = notBB[2];
        note.id = notBB[0];
        note.value = notBB[1];

        note.ondragstart = dragStart;

        note.addEventListener("dragstart", () => {
          console.log("im draggin");
          note.classList.add('dragging');
        });

        note.addEventListener('dragend', () => {
          note.classList.remove('dragging');
          console.log(note.parentNode.id);
          xhttp.open("POST", "notas_update.php", false);
          var formData = new FormData();
          formData.append("id_stickynote", note.id);
          formData.append("contenido", note.value);
          formData.append("color", notBB[2]);
          formData.append("estado_id", note.parentNode.id);
          xhttp.send(formData);

        });

        //Guardar cuando se escribe en la nota
        note.addEventListener('keyup', () => {
          xhttp.open("POST", "notas_update.php", false);
          var formData = new FormData();
          formData.append("id_stickynote", note.id);
          formData.append("contenido", note.value);
          formData.append("color", notBB[2]);
          formData.append("estado_id", note.parentNode.id);
          xhttp.send(formData);
        });

        note.addEventListener("dblclick", () => {

          var modal = document.createElement("div");
          modal.id = "myModal";
          modal.className = "modal";

          var mcontent = document.createElement("div");
          mcontent.id = "modalC";
          mcontent.className = "modal-content";

          var span = document.createElement("span");
          span.className = "close";
          span.innerHTML = "&times;";

          var mfooter = document.createElement("div");
          mfooter.className = "modal-footer";



          mcontent.appendChild(span);
          modal.appendChild(mcontent);
          modal.appendChild(mfooter);
          document.body.appendChild(modal);
          modal.style.display = "block";

          //Eliminar la Nota 
          const eliminar = document.createElement("button");
          eliminar.className = "notaEliminar";
          eliminar.innerHTML = "Eliminar";
          eliminar.onclick = function () {

            xhttp.open("POST", "Delete_nota.php", false);
            var formData = new FormData();
            formData.append("id_stickynote", note.id);
            xhttp.send(formData);
            note.remove();
            modal.style.display = "none";
            modal.remove();

          }
          mfooter.appendChild(eliminar);

          let colors = [ // Nine different note colors
            'lightgoldenrodyellow',
            'lightblue',
            'lightgreen',
            'lightpink',
            'lightcoral',
            'lightskyblue',
            'lightsalmon',
            'plum',
            'lightseagreen'
          ];
          colors.forEach(color => {
            const button = document.createElement("button");
            button.className = "botonPizarra";
            button.id = "bColor";
            button.style.backgroundColor = color;
            button.onclick = function () {
              note.style.backgroundColor = color;
              xhttp.open("POST", "notas_update.php", false);
              var formData = new FormData();
              formData.append("id_stickynote", note.id);
              formData.append("contenido", note.value);
              formData.append("color", color);
              formData.append("estado_id", note.parentNode.id);
              xhttp.send(formData);
            }
            mcontent.appendChild(button);
          });

          span.onclick = function () {
            modal.style.display = "none";
            modal.remove();
          }
          window.onclick = function (event) {
            if (event.target == modal) {
              modal.style.display = "none";
              modal.remove();
            }
          }
          //note.remove();

        });
        cat1.appendChild(note);


      });



    })



    newDiv.id = piza[0];


    const button = document.createElement("button");
    button.className = "botonPizarra";
    button.style.backgroundColor = color;
    button.innerHTML = "X";
    button.addEventListener("click", () => {
      //get estados
      xxhttp.open("POST", "get_estados.php", false);
      var formData = new FormData();
      formData.append("workflow_id", newDiv.id);
      xxhttp.onload = function () {
        estados = this.response;
      };
      xxhttp.send(formData);
      const esta = estados.split("/");
      esta.pop();
      //estados
      esta.forEach(element => {
        const con = element.split(",");
        //getnotas
        xhttp.open("POST", "gets_notas.php", false);
        var formData = new FormData();
        formData.append("estado_id", con[0]);
        xhttp.onload = function () {
          notasbases = this.response;
        };
        xhttp.send(formData);
        const notB = notasbases.split("/");
        notB.pop();
        //notas
        notB.forEach(element => {
          const notBB = element.split(",");
          xhttp.open("POST", "Delete_nota.php", false);
          var formData = new FormData();
          formData.append("id_stickynote", notBB[0]);
          xhttp.send(formData);

        });
        //delete estado
        xhttp.open("POST", "Delete_estados.php", false);
        var formData = new FormData();
        formData.append("id_estado", con[0]);
        xhttp.send(formData);

      });
      //delete pizarra
      xhttp.open("POST", "Delete_pizarra.php", false);
      var formData = new FormData();
      formData.append("id_workflow", newDiv.id);
      xhttp.send(formData);

      pizarras.removeChild(newDiv);

    });
    newDiv.appendChild(button);

    pizacont.appendChild(newDiv);



  });

  //notas basicas

  xhttp.open("POST", "gets_notas.php", false);

  var formData = new FormData();
  formData.append("estado_id", 0);

  xhttp.onload = function () {
    notasbases = this.response;

  };

  xhttp.send(formData);
  const notB = notasbases.split("/");
  notB.pop();
  notB.forEach(element => {
    const notitas = document.getElementById("showNotas");
    const notBB = element.split(",");
    const note = document.createElement('textarea');
    note.className = 'note';
    note.draggable = "true";
    note.style.backgroundColor = notBB[2];
    note.id = notBB[0];
    note.value = notBB[1];

    note.ondragstart = dragStart;

    note.addEventListener("dragstart", () => {
      console.log("im draggin");
      note.classList.add('dragging');
    });

    note.addEventListener('dragend', () => {
      note.classList.remove('dragging');
      console.log(note.parentNode.id);
      xhttp.open("POST", "notas_update.php", false);
      var formData = new FormData();
      formData.append("id_stickynote", note.id);
      formData.append("contenido", note.value);
      formData.append("color", notBB[2]);
      formData.append("estado_id", note.parentNode.id);
      xhttp.send(formData);

    });

    //Guardar cuando se escribe en la nota
    note.addEventListener('keyup', () => {
      xhttp.open("POST", "notas_update.php", false);
      var formData = new FormData();
      formData.append("id_stickynote", note.id);
      formData.append("contenido", note.value);
      formData.append("color", notBB[2]);
      formData.append("estado_id", note.parentNode.id);
      xhttp.send(formData);
    });

    note.addEventListener("dblclick", () => {

      var modal = document.createElement("div");
      modal.id = "myModal";
      modal.className = "modal";

      var mcontent = document.createElement("div");
      mcontent.id = "modalC";
      mcontent.className = "modal-content";

      var span = document.createElement("span");
      span.className = "close";
      span.innerHTML = "&times;";

      var mfooter = document.createElement("div");
      mfooter.className = "modal-footer";



      mcontent.appendChild(span);
      modal.appendChild(mcontent);
      modal.appendChild(mfooter);
      document.body.appendChild(modal);
      modal.style.display = "block";


      const eliminar = document.createElement("button");
      eliminar.className = "notaEliminar";
      eliminar.innerHTML = "Eliminar";
      eliminar.onclick = function () {
        xhttp.open("POST", "Delete_nota.php", false);
        var formData = new FormData();
        formData.append("id_stickynote", note.id);
        xhttp.send(formData);
        note.remove();
        modal.style.display = "none";
        modal.remove();
      }
      mfooter.appendChild(eliminar);

      let colors = [ // Nine different note colors
        'lightgoldenrodyellow',
        'lightblue',
        'lightgreen',
        'lightpink',
        'lightcoral',
        'lightskyblue',
        'lightsalmon',
        'plum',
        'lightseagreen'
      ];
      colors.forEach(color => {
        const button = document.createElement("button");
        button.className = "botonPizarra";
        button.id = "bColor";
        button.style.backgroundColor = color;
        button.onclick = function () {
          note.style.backgroundColor = color;
          xhttp.open("POST", "notas_update.php", false);
          var formData = new FormData();
          formData.append("id_stickynote", note.id);
          formData.append("contenido", note.value);
          formData.append("color", color);
          formData.append("estado_id", note.parentNode.id);
          xhttp.send(formData);
        }
        mcontent.appendChild(button);
      });

      span.onclick = function () {
        modal.style.display = "none";
        modal.remove();
      }
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
          modal.remove();
        }
      }
      //note.remove();

    });
    notitas.appendChild(note);


  });


}

function crearPizzarra() {
  var xhttp = new XMLHttpRequest();
  const pizarras = document.getElementById("pizarras");
  const newDiv = document.createElement("div");
  newDiv.className = "pizarra";
  pizarracount++;

  //titulo,descripcion, fecha
  const color = getRandomColor();
  const titleop = document.createElement("input");
  titleop.className = "tituloPizarra";
  titleop.style.backgroundColor = color;
  titleop.value = "Titulo";

  //actualizar Titulo

  titleop.addEventListener("keyup", () => {

    xhttp.open("POST", "update_pizarra.php", false);
    var formData = new FormData();
    formData.append("id_workflow", newDiv.id);
    formData.append("nombre", titleop.value);
    formData.append("descripcion", Depop.value);
    formData.append("fecha", fechaop.value);
    formData.append("id_usuario", 1);
    xhttp.send(formData);

  });


  const Depop = document.createElement("input");
  Depop.className = "tituloPizarra";
  Depop.style.backgroundColor = color;
  Depop.value = "Descripcion";

  //actualizar Titulo

  Depop.addEventListener("keyup", () => {

    xhttp.open("POST", "update_pizarra.php", false);
    var formData = new FormData();
    formData.append("id_workflow", newDiv.id);
    formData.append("nombre", titleop.value);
    formData.append("descripcion", Depop.value);
    formData.append("fecha", fechaop.value);
    formData.append("id_usuario", 1);
    xhttp.send(formData);

  });

  const fechaop = document.createElement("input");
  fechaop.className = "tituloPizarra";
  fechaop.style.backgroundColor = color;

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  fechaop.value = hoy.toISOString().slice(0, 19).replace('T', ' ');
  fechaop.readOnly = true;

  newDiv.appendChild(titleop);
  newDiv.appendChild(Depop);
  newDiv.appendChild(fechaop);


  //categorias

  //categoria iniciado
  const cat1 = document.createElement("div");
  cat1.className = "categorias";
  cat1.ondrop = dragDrop;
  cat1.ondragover = allowDrop;
  //titulo
  const tituloC1 = document.createElement('input');
  tituloC1.className = "TCategoria";
  tituloC1.value = "iniciar";
  tituloC1.readOnly = true;
  cat1.appendChild(tituloC1);


  newDiv.appendChild(cat1);

  //categoria iniciado

  const cat2 = document.createElement("div");
  cat2.ondrop = dragDrop;
  cat2.ondragover = allowDrop;

  const tituloC2 = document.createElement('input');
  tituloC2.className = "TCategoria";
  tituloC2.value = "iniciado";
  tituloC2.readOnly = true;
  cat2.appendChild(tituloC2);

  cat2.className = "categorias";
  newDiv.appendChild(cat2);

  //categoria finalizado
  const cat3 = document.createElement("div");
  cat3.className = "categorias";
  cat3.ondrop = dragDrop;
  cat3.ondragover = allowDrop;

  const tituloC3 = document.createElement('input');
  tituloC3.className = "TCategoria";
  tituloC3.value = "finalizado";
  tituloC3.readOnly = true;
  cat3.appendChild(tituloC3);

  newDiv.appendChild(cat3);

  const button = document.createElement("button");
  button.className = "botonPizarra";
  button.style.backgroundColor = color;
  button.innerHTML = "X";
  button.addEventListener("click", () => {
    //get estados
    xhttp.open("POST", "get_estados.php", false);
    var formData = new FormData();
    formData.append("workflow_id", newDiv.id);
    xhttp.onload = function () {
      estados = this.response;
    };
    xhttp.send(formData);
    const esta = estados.split("/");
    esta.pop();
    //estados
    esta.forEach(element => {
      const con = element.split(",");
      //getnotas
      xhttp.open("POST", "gets_notas.php", false);
      var formData = new FormData();
      formData.append("estado_id", con[0]);
      xhttp.onload = function () {
        notasbases = this.response;
      };
      xhttp.send(formData);
      const notB = notasbases.split("/");
      notB.pop();
      //notas
      notB.forEach(element => {
        const notBB = element.split(",");
        xhttp.open("POST", "Delete_nota.php", false);
        var formData = new FormData();
        formData.append("id_stickynote", notBB[0]);
        xhttp.send(formData);

      });
      //delete estado
      xhttp.open("POST", "Delete_estados.php", false);
      var formData = new FormData();
      formData.append("id_estado", con[0]);
      xhttp.send(formData);

    });
    //delete pizarra
    xhttp.open("POST", "Delete_pizarra.php", false);
    var formData = new FormData();
    formData.append("id_workflow", newDiv.id);
    xhttp.send(formData);

    pizarras.removeChild(newDiv);
  });
  newDiv.appendChild(button);
  // add the newly created element and its content into the DOM


  //newDiv.id = "note" + pizarracount;

  pizarras.appendChild(newDiv);

  //Insertar a la base

  //Pizarra

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "pizarras.php", false);

  xhttp.onreadystatechange = function () { //Call a function when the state changes.
    if (xhttp.readyState == 4 && xhttp.status == 200) { // complete and no errors
      alert(xhttp.responseText); // some processing here, or whatever you want to do with the response
    }
  };

  var formData = new FormData();
  formData.append("nombre", titleop.value);
  formData.append("descripcion", Depop.value);
  formData.append("fecha", fechaop.value);
  formData.append("id_usuario", 1);

  xhttp.onload = function () {
    newDiv.id = this.responseText;

  };

  xhttp.send(formData);

  //estados
  //1
  xhttp.open("POST", "estados.php", false);

  xhttp.onreadystatechange = function () { //Call a function when the state changes.
    if (xhttp.readyState == 4 && xhttp.status == 200) { // complete and no errors
      alert(xhttp.responseText); // some processing here, or whatever you want to do with the response
    }
  };

  var formData = new FormData();
  formData.append("nombre", tituloC1.value);
  formData.append("workflow_id", newDiv.id);
  xhttp.onload = function () {
    cat1.id = this.responseText;
  };

  xhttp.send(formData);

  //2

  xhttp.open("POST", "estados.php", false);

  xhttp.onreadystatechange = function () { //Call a function when the state changes.
    if (xhttp.readyState == 4 && xhttp.status == 200) { // complete and no errors
      alert(xhttp.responseText); // some processing here, or whatever you want to do with the response
    }
  };


  var formData = new FormData();
  formData.append("nombre", tituloC2.value);
  formData.append("workflow_id", newDiv.id);

  xhttp.onload = function () {
    cat2.id = this.responseText;
  };

  xhttp.send(formData);

  //3

  xhttp.open("POST", "estados.php", false);

  xhttp.onreadystatechange = function () { //Call a function when the state changes.
    if (xhttp.readyState == 4 && xhttp.status == 200) { // complete and no errors
      alert(xhttp.responseText); // some processing here, or whatever you want to do with the response
    }
  };


  var formData = new FormData();
  formData.append("nombre", tituloC3.value);
  formData.append("workflow_id", newDiv.id);

  xhttp.onload = function () {
    cat3.id = this.responseText;
  };

  xhttp.send(formData);


}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function allowDrop() {
  event.preventDefault();
}

function dragStart() {
  event.dataTransfer.setData("text", event.target.id);
}


function dragDrop() {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
}


//Crear Notas_____________________

function crearNota() {
  //Create note container
  var xhttp = new XMLHttpRequest();
  const color = getRandomColor();
  const note = document.createElement('textarea');
  note.className = 'note';
  note.draggable = "true";
  note.style.backgroundColor = color;
  note.ondragstart = dragStart;

  xhttp.open("POST", "notas.php", false);

  var formData = new FormData();
  formData.append("color", color);
  formData.append("estado_id", 0);
  xhttp.onload = function () {
    note.id = this.responseText;
  };

  xhttp.send(formData);

  note.addEventListener("dragstart", () => {
    console.log("im draggin");
    note.classList.add('dragging');
  });

  note.addEventListener('dragend', () => {
    note.classList.remove('dragging');
    console.log(note.parentNode.id);
    xhttp.open("POST", "notas_update.php", false);
    var formData = new FormData();
    formData.append("id_stickynote", note.id);
    formData.append("contenido", note.value);
    formData.append("color", color);
    formData.append("estado_id", note.parentNode.id);
    xhttp.send(formData);

  })


  //actualizar 
  note.addEventListener('keyup', () => {
    console.log(note.value);
    console.log(note.parentNode.id);
    xhttp.open("POST", "notas_update.php", false);
    var formData = new FormData();
    formData.append("id_stickynote", note.id);
    formData.append("contenido", note.value);
    formData.append("color", note.style.backgroundColor);
    formData.append("estado_id", note.parentNode.id);
    xhttp.send(formData);

  });


  //menu colores
  note.addEventListener("dblclick", () => {
    //const doDelete = confirm("¿Desea eliminar esta nota");

    //var modal = document.getElementById("myModal");
    //var mcontent = document.getElementById("modalC");
    //var span = document.getElementsByClassName("close")[0];

    var modal = document.createElement("div");
    modal.id = "myModal";
    modal.className = "modal";

    var mcontent = document.createElement("div");
    mcontent.id = "modalC";
    mcontent.className = "modal-content";

    var span = document.createElement("span");
    span.className = "close";
    span.innerHTML = "&times;";

    var mfooter = document.createElement("div");
    mfooter.className = "modal-footer";



    mcontent.appendChild(span);
    modal.appendChild(mcontent);
    modal.appendChild(mfooter);
    document.body.appendChild(modal);
    modal.style.display = "block";


    const eliminar = document.createElement("button");
    eliminar.className = "notaEliminar";
    eliminar.innerHTML = "Eliminar";
    eliminar.onclick = function () {
      xhttp.open("POST", "Delete_nota.php", false);
      var formData = new FormData();
      formData.append("id_stickynote", note.id);
      xhttp.send(formData);
      note.remove();
      modal.style.display = "none";
      modal.remove();
    }
    mfooter.appendChild(eliminar);

    let colors = [ // Nine different note colors
      'lightgoldenrodyellow',
      'lightblue',
      'lightgreen',
      'lightpink',
      'lightcoral',
      'lightskyblue',
      'lightsalmon',
      'plum',
      'lightseagreen'
    ];
    colors.forEach(color => {
      const button = document.createElement("button");
      button.className = "botonPizarra";
      button.id = "bColor";
      button.style.backgroundColor = color;
      button.onclick = function () {
        note.style.backgroundColor = color;

        xhttp.open("POST", "notas_update.php", false);
        var formData = new FormData();
        formData.append("id_stickynote", note.id);
        formData.append("contenido", note.value);
        formData.append("color", color);
        formData.append("estado_id", note.parentNode.id);
        xhttp.send(formData);

      }
      mcontent.appendChild(button);
    });

    span.onclick = function () {
      modal.style.display = "none";
      modal.remove();
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        modal.remove();
      }
    }
    //note.remove();

  });

  const notitas = document.getElementById("showNotas");

  notitas.appendChild(note);

}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}



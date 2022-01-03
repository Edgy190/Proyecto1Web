
let notecount = 0;
let pizarracount = 0;

function crearPizzarra() {
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

  const Depop = document.createElement("input");
  Depop.className = "tituloPizarra";
  Depop.style.backgroundColor = color;
  Depop.value = "Descripcion";

  const fechaop = document.createElement("input");
  fechaop.className = "tituloPizarra";
  fechaop.style.backgroundColor = color;

  const tiempoTranscurrido = Date.now();
   const hoy = new Date(tiempoTranscurrido);
  fechaop.value = hoy.toDateString();
  fechaop.readOnly = true;

  newDiv.appendChild(titleop);
  newDiv.appendChild(Depop);
  newDiv.appendChild(fechaop);


  //categorias

  const cat1 = document.createElement("div");
  cat1.className = "categorias";
  cat1.ondrop =dragDrop;
  cat1.ondragover = allowDrop;
  //titulo
  const tituloC1 = document.createElement('input');
  tituloC1.className = "TCategoria";
  tituloC1.value = "iniciar";
  tituloC1.readOnly = true;
  cat1.appendChild(tituloC1);


  newDiv.appendChild(cat1);


  const cat2 = document.createElement("div");
  cat2.ondrop =dragDrop;
  cat2.ondragover = allowDrop;

  const tituloC2 = document.createElement('input');
  tituloC2.className = "TCategoria";
  tituloC2.value = "iniciado";
  tituloC2.readOnly = true;
  cat2.appendChild(tituloC2);

  cat2.className = "categorias";
  newDiv.appendChild(cat2);

  const cat3 = document.createElement("div");
  cat3.className = "categorias";
  cat3.ondrop =dragDrop;
  cat3.ondragover = allowDrop;

  const tituloC3 = document.createElement('input');
  tituloC3.className = "TCategoria";
  tituloC3.value = "finalizado";
  tituloC3.readOnly = true;
  cat3.appendChild(tituloC3);

  newDiv.appendChild(cat3);




  const button = document.createElement("button");
  button.className="botonPizarra";
  button.style.backgroundColor= color;
  button.innerHTML = "X";
  button.addEventListener("click",() =>{
    const doDelete = confirm("¿Desea eliminar esta pizarra");
    if(doDelete){
      pizarras.removeChild(newDiv);
    }
  });
  newDiv.appendChild(button);
  // add the newly created element and its content into the DOM


  newDiv.id = "note" + pizarracount; 
  pizarras.appendChild(newDiv);

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



function crearNota() {
  //Create note container
  const note = document.createElement('textarea');
  note.className = 'note';
  note.draggable = "true";
  note.style.backgroundColor = getRandomColor();
  note.ondragstart = dragStart;
  note.addEventListener("dragstart", () => {
    note.classList.add('dragging');
  });
  note.addEventListener('dragend',()=>{
    note.classList.remove('dragging');
  })
  note.addEventListener("dblclick",() =>{
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
      span.className ="close";
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
      eliminar.onclick = function(){
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
        button.className="botonPizarra";
        button.id = "bColor";
        button.style.backgroundColor= color;
        button.onclick = function(){
          note.style.backgroundColor = color;
        }
        mcontent.appendChild(button);
      });

      span.onclick = function(){
        modal.style.display = "none";
        modal.remove();
      }
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
          modal.remove();
        }
      }
      //note.remove();
    
  });
  notecount++;
  note.id = 'nota' +   notecount;
  const notitas = document.getElementById("showNotas");
  
  notitas.appendChild(note);
  //document.body.appendChild(note);

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

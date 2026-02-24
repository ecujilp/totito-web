const celdas = document.querySelectorAll(".celda");
const mensaje = document.getElementById("mensaje");

let turno = "x";
let juegoActivo= true;
let estadoTablero = ["", "", "", "", "", "", "", "", ""];

const combinacionesGanadoras= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

celdas.forEach(celda => {
    celda.addEventListener("click", manejarClick);
});

function manejarClick(e) {
  const index = e.target.dataset.index;
  if(estadoTablero[index] !== "" || !juegoActivo) {
    return;
  }  

  //juega el jugador x
  estadoTablero[index] = "X";
  e.target.textContent = "X";
  verificarGanador();
  
  if(juegoActivo){
    setTimeout(jugarMaquina, 500);
  }


}
  function verificarGanador(){
    let gano = false;

    for(let combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if(
            estadoTablero[a] &&
            estadoTablero[a] === estadoTablero[b] &&
            estadoTablero[a] === estadoTablero[c]
        ){
        gano = true;
        break;
    }
}
    
        if (gano){
            mensaje.textContent = "Gano " + turno + "!";
            juegoActivo = false;
            return;
        }

        if (!estadoTablero.includes("")) {
            mensaje.textContent= "Es un empate";
            juegoActivo = false;
        }
    }
            
    function reiniciarJuego(){
                estadoTablero = ["", "", "", "", "", "", "", "", ""];
                juegoActivo = true;
                turno="x";
                mensaje.textContent= "";

                celdas.forEach(celda => {
                    celda.textContent = "";
                });

    
    
        }
        function jugarMaquina(){
        if(!juegoActivo) return;

        //intentar ganar
        let movimiento = buscarMovimientoGanador("O");
        if (movimiento !== -1){
            hacerMoviemiento(movimiento);
            return;
        }
          
        //bloquear al jugador si va a ganar
        movimiento = buscarMovimientoGanador("X");
        if(movimiento !== -1){
            hacerMoviemiento(movimiento);
            return;
        }
        //tomar el centro
        if(estadoTablero[4] === ""){
            hacerMoviemiento(4);
            return;
        }

        //tomar esquinas
        const esquinas = [0, 2, 6, 8];
        for(let esquina of esquinas){
            if (estadoTablero[esquina] === ""){
                hacerMoviemiento(esquina);
                return;
            }
        }

        //última opción
        for(let i= 0; i < estadoTablero.length; i++){
            if (estadoTablero[i] === ""){
                hacerMoviemiento(i);
                return;
            }
        }
    }

    function buscarMovimientoGanador(jugador){
        for (let combinacion of combinacionesGanadoras){
            const [a, b, c] = combinacion;
            let valores = [
                estadoTablero[a],
                estadoTablero[b],
                estadoTablero[c]
            ];
            if (
                valores.filter(v => v === jugador).length === 2 &&
                valores.includes("")
            )
            if(estadoTablero[a] === "")return a;
            if(estadoTablero[b] === "")return b;
            if(estadoTablero[c] === "")return c;
            return -1;
        }
    }

    function hacerMoviemiento(posicion){
        estadoTablero[posicion] = "O";
        celdas[posicion].textContent = "O";
        verificarGanador();
    }
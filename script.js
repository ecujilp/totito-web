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
            let ganador;

            for(let combinacion of combinacionesGanadoras){
                const [a,b,c] = combinacion;
                if(
                    estadoTablero[a] &&
                    estadoTablero[a] === estadoTablero[b] &&
                    estadoTablero[a] === estadoTablero[c]
                ){
                    ganador = estadoTablero[a];
                  break;
                }
            }
            mensaje.textContent = "Ganó " + ganador + "!";
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

            let mejorPuntaje = -Infinity;
            let movimiento;

            for(let i=0; i < estadoTablero.length; i++){
                if(estadoTablero[i] === ""){
                    estadoTablero[i] = "O";
                    let puntaje = minimax(estadoTablero, 0, false);
                    estadoTablero[i] = "";
                    if(puntaje > mejorPuntaje){
                        mejorPuntaje = puntaje;
                        movimiento = i;
                    }
                }
                }
                hacerMoviemiento(movimiento);
            }
        
            function minimax(tablero, profundidad, esMaximizado){

                let resultado =evaluarTablero();

                if(resultado !== null){
                    const puntajes = {
                        "X": -10,
                        "O": 10,
                        "empate": 0
                    };
                    return puntajes[resultado];
                }

                if(esMaximizado){
                    let mejorPuntaje =-Infinity;
                    for(let i=0; i < tablero.length; i++){
                        if(tablero[i] === ""){
                            tablero[i] = "O";
                            let puntaje = minimax(tablero, profundidad + 1, false);
                            tablero[i] = "";
                            mejorPuntaje = Math.max(puntaje, mejorPuntaje);
                        }
                    }
                    return mejorPuntaje;
                }else{
                    let mejorPuntaje = Infinity;
                    for(let i= 0; i < tablero.length; i++){
                        if(tablero[i] === ""){
                            tablero[i] ="X";
                            let puntaje = minimax(tablero, profundidad + 1, true);
                        tablero[i] = "";
                        mejorPuntaje = Math.min(puntaje, mejorPuntaje);
                        }
                    }
                    return mejorPuntaje;
                }
            }

        
    function evaluarTablero(){
        for(let combinacion of combinacionesGanadoras){
            const [a,b,c] = combinacion;
            if(
                estadoTablero[a] &&
                estadoTablero[a] === estadoTablero[b] &&
                estadoTablero[a] === estadoTablero[c]
            ){
                return estadoTablero[a];
            }
        }

        if(!estadoTablero.includes("")){
            return "empate";
        }
        return null;
    }
        
     
    function hacerMoviemiento(posicion){
        estadoTablero[posicion] = "O";
        celdas[posicion].textContent = "O";
        verificarGanador();
    }
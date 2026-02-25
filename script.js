const celdas = document.querySelectorAll(".celda");
const botonReiniciar = document.getElementById("reiniciar");
const mensaje = document.getElementById("mensaje");

let turno = "X";
let tablero = ["", "", "", "", "", "", "", "", ""];
let juegoActivo = true;

const combinacionesGanadoras = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

celdas.forEach(celda => {
    celda.addEventListener("click", manejarClick);
});

botonReiniciar.addEventListener("click", reiniciarJuego);

function manejarClick(e) {
    const index = e.target.dataset.index;

    if (tablero[index] !== "" || !juegoActivo) return;

    hacerMovimiento(index, "X");

    if (juegoActivo) {
        setTimeout(() => {
            movimientoIA();
        }, 400);
    }
}

function hacerMovimiento(index, jugador) {
    tablero[index] = jugador;
    celdas[index].textContent = jugador;
    celdas[index].classList.add(jugador);

    if (verificarGanador(jugador)) {
        mensaje.textContent = "Ganó " + jugador + " 🎉";
        juegoActivo = false;
        return;
    }

    if (!tablero.includes("")) {
        mensaje.textContent = "Empate 🤝";
        juegoActivo = false;
    }
}

function movimientoIA() {
    let mejorMovimiento = mejorJugada();
    if (mejorMovimiento !== null) {
        hacerMovimiento(mejorMovimiento, "O");
    }
}

function mejorJugada() {
    for (let combo of combinacionesGanadoras) {
        let [a,b,c] = combo;
        if (tablero[a] === "O" && tablero[b] === "O" && tablero[c] === "") return c;
        if (tablero[a] === "O" && tablero[c] === "O" && tablero[b] === "") return b;
        if (tablero[b] === "O" && tablero[c] === "O" && tablero[a] === "") return a;
    }

    for (let combo of combinacionesGanadoras) {
        let [a,b,c] = combo;
        if (tablero[a] === "X" && tablero[b] === "X" && tablero[c] === "") return c;
        if (tablero[a] === "X" && tablero[c] === "X" && tablero[b] === "") return b;
        if (tablero[b] === "X" && tablero[c] === "X" && tablero[a] === "") return a;
    }

    if (tablero[4] === "") return 4;

    let esquinas = [0,2,6,8];
    for (let i of esquinas) {
        if (tablero[i] === "") return i;
    }

    for (let i = 0; i < tablero.length; i++) {
        if (tablero[i] === "") return i;
    }

    return null;
}

function verificarGanador(jugador) {
    return combinacionesGanadoras.some(combo => {
        return combo.every(index => tablero[index] === jugador);
    });
}

function reiniciarJuego() {
    tablero = ["", "", "", "", "", "", "", "", ""];
    juegoActivo = true;
    mensaje.textContent = "";

    celdas.forEach(celda => {
        celda.textContent = "";
        celda.classList.remove("X", "O");
    });
}
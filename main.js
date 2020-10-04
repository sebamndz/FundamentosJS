const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
btnEmpezar.addEventListener("click", empezarJuego);
const Nivel = document.getElementById("Nivel");
const btnReiniciar = document.getElementById("btnReiniciar");
const ULTIMO_NIVEL = 5;

class Juego{
    constructor() {
        this.inicializar();
        this.generarSecuencia();
        setTimeout (this.siguienteNivel(), 500);
}

inicializar() {
    btnEmpezar.classList.add('hide')
    btnReiniciar.classList.add('hide')
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.nivel = 1
    this.colores = {
        celeste,
        violeta,
        naranja,
        verde 
    }
}

generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map( n => Math.floor(Math.random() * 4))
}

siguienteNivel() {
    this.subnivel = 0
    this.eliminarEventosClick()
    this.iluminarSecuencia()
    this.agregarEventosClick()
}

transformarNumeroAColor(numero) {
    switch (numero) {
        case 0:
            return "celeste"
        case 1:
            return "violeta"
        case 2:
            return "naranja"
        case 3:
            return "verde"
    }
}

transformarColorANumero(color){
    switch(color) {
        case "celeste":
            return 0
        case "violeta":
            return 1
        case "naranja":
            return 2
        case "verde":
            return 3
    }
}

iluminarSecuencia() {
    for (let n = 0; n < this.nivel; n++) {
        const color = this.transformarNumeroAColor(this.secuencia[n])
        setTimeout(() => this.iluminarColor(color),1000 * n)
    Nivel.innerHTML =` Nivel ${this.nivel}`
    }
}

iluminarColor(color) {
    this.colores[color].classList.add("light")
    setTimeout(() => this.apagarColor(color), 350)
}

    apagarColor(color) {
    this.colores[color].classList.remove("light")
    }
    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }
    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }
    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
            this.nivel++
            this.eliminarEventosClick()
            if (this.nivel === (ULTIMO_NIVEL + 1)) {
                this.ganoElJuego()
            } else {
                setTimeout(this.siguienteNivel, 1500)
            }
        }   
            } else {
                this.perdioElJuego()
        }
    }
    ganoElJuego() {
        Nivel.innerHTML = `Ganaste! :O`
        this.eliminarEventosClick()
        this.iluminarColores()
        btnReiniciar.innerHTML = `Reiniciar juego`
        btnReiniciar.classList.remove('hide')
        btnReiniciar.addEventListener('click', empezarJuego)
    }
    perdioElJuego() {
        Nivel.innerHTML= `Perdiste :(`
        this.eliminarEventosClick()
        btnReiniciar.classList.remove('hide')
        btnReiniciar.innerHTML = `Reiniciar juego`
        btnReiniciar.addEventListener('click', empezarJuego)
    }
}

function empezarJuego() {
    window.juego = new Juego();
}
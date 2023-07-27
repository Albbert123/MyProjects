//seleccionar todos los botones "numero" y "operador"
const botonNumero = document.querySelectorAll(".numero")
const botonOperador = document.querySelectorAll(".operador")

//seleccionar los demas botones
const botonIgual = document.querySelector(".igual")
const botonBorrarTodo = document.querySelector(".borrar-todo")
const botonBorrar = document.querySelector(".borrar")
const textoSuperior = document.querySelector(".valor-superior")
const textoInferior = document.querySelector(".valor-inferior")

//creamos la clase calculadora
class Calculadora {
    constructor(textoInferior,textoSuperior) {
        this.textoInferior = textoInferior //var local
        this.textoSuperior = textoSuperior //var local
        this.valorInferior = '' //segundo valor para calculo
        this.valorSuperior = '' //primer valor para calculo
        this.operador = undefined
    }

    agregarNumero(numero) {
        //solo puede haver 1 punto
        if(numero == '.' && this.valorInferior.includes('.')) return
        //para que no se salga por pantalla
        if(this.valorInferior.length > 13) return
        this.valorInferior = this.valorInferior + numero
    }

    imprimirDisplay() {
        this.textoInferior.innerText = this.valorInferior
        this.textoSuperior.innerText = this.valorSuperior
    }

    borrar() {
        this.valorInferior = this.valorInferior.slice(0,-1) //de la posicion 0 a la -1 (se borra uno)
    }

    elegirOperacion(operador) {
        //si no hay nada, no hagas nada
        if(this.valorInferior == '') return 
        //si hay algo arriba quiere decir que ya hemos clicado un operador
        if(this.valorSuperior != '') { 
            this.realizarCalculo()
        }
        //leemos operador
        this.operador = operador
        //ponemos el valor arriba
        this.valorSuperior = this.valorInferior
        //despejamos la parte inferior para la segunda parte de la operacion
        this.valorInferior = ''
    }

    realizarCalculo() {
        let resultado
        //pasar los string a numeros
        let convertSuperior = parseFloat(this.valorSuperior)
        let convertInferior = parseFloat(this.valorInferior)
        //evitar NaN en calculo
        if(isNaN(convertSuperior) || isNaN(convertInferior)) return
        //elegir operacion
        if(this.operador == '+') resultado = convertSuperior + convertInferior
        else if(this.operador == '-')resultado = convertSuperior - convertInferior
        else if(this.operador == '*')resultado = convertSuperior * convertInferior
        else resultado = convertSuperior / convertInferior
        //poner resultado abajo
        this.valorInferior = resultado
        //reiniciar
        this.operador = undefined
        this.valorSuperior = ''
    }

    limpiarDisplay() {
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = undefined
    }
}

//llamamos a la clase
const calculadora = new Calculadora (textoInferior,textoSuperior)

//capturar click numeros
botonNumero.forEach(boton => {
    boton.addEventListener("click", () => {
        // el innerText es la parte de HTML que pone el valor o las letras <button>innerText</button>
        calculadora.agregarNumero(boton.innerText)
        calculadora.imprimirDisplay()
        
    })
})

//capturar click borrar
botonBorrar.addEventListener("click", () => {
    calculadora.borrar()
    calculadora.imprimirDisplay()
})

//capturar click operadores
botonOperador.forEach(boton => {
    boton.addEventListener("click", () => {
        // el innerText es la parte de HTML que pone el valor o las letras <button>innerText</button>
        calculadora.elegirOperacion(boton.innerText)
        calculadora.imprimirDisplay()
        
    })
})

//capturar click igual
botonIgual.addEventListener("click", () => {
    calculadora.realizarCalculo()
    calculadora.imprimirDisplay()
})

//capturar click borrar-todo
botonBorrarTodo.addEventListener("click", () => {
    calculadora.limpiarDisplay()
    calculadora.imprimirDisplay()
})





//variables
const fecha = document.getElementById("fecha")
const lista = document.getElementById("lista")
const input = document.getElementById("input")
const enter = document.getElementById("enter")
const check = "fa-check-circle"
const uncheck = "fa-circle"
const lineThrough = "line-through"
let id
let LIST //array para guardar valores


//creacion de la fecha
const FECHA = new Date()
//poner texto en HTML
fecha.innerHTML = FECHA.toLocaleDateString("es", {weekday:"long", month:"long", day:"numeric"})

//funcion para agrear tarea
function agregarTarea(tarea, id, realizado, eliminado) {
    //si eliminado entonces no hagas lo otro
    if(eliminado) return
    //variable auxiliar de realizado
    //"si realizado es true(?), REALIZADO = check, else(:) REALIZADO = uncheck"
    const REALIZADO = realizado ? check : uncheck
    //variable para subrayar palabra
    const LINE = realizado ? lineThrough : ''
    //creamos variable que tendra el codigo html para crear items de nueva tarea
    const elemento =  ` <li id="elemento">
                            <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                            <p class="text ${LINE}">${tarea}</p>
                            <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                      `
    lista.insertAdjacentHTML("beforeend", elemento)
}

//funcion confirmar tarea (leer input, agregar tarea, resetear input)
function confirmarTarea() {
    //la tarea es lo que hay dentro del input
    const tarea = input.value
    //si existe la tarea(es diferente a nulo), la agregamos
    if(tarea) {
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
    }
    //guardamos los datos por si cerramos ventana
    localStorage.setItem("TO-DO", JSON.stringify(LIST))
    //reseteamos el valor del input
    input.value = ''
    id++
}

//funcion tarea realizada 
function tareaRealizada(element) {
    //si toggle detecta que esta uncheck, lo cambia a check
    element.classList.toggle(check)
    //si toggle detecta que esta check, lo cambia a uncheck
    element.classList.toggle(uncheck)
    //si toggle detecta que no esta line-through, lo cambia
    element.parentNode.querySelector(".text").classList.toggle(lineThrough)
    //parentNode se va al padre del elemento, en nuestro caso estemos en <i> se va al <li>
    
    //actualizamos el elemento realizado de la lista
    //si realizado es true(?), pon true en la lista, else(:) pon false
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true
}

//funcion tarea eliminada
function tareaEliminada(element) {
    //estamos en <i> y hemos de ir a <li> y luego a <ul> para eliminar todo el <li>
    element.parentNode.parentNode.removeChild(element.parentNode)
    //actualizamos el elemento eliminado de la lista
    LIST[element.id].eliminado = true
}

//cuando clicamos boton, añadimos la tarea
enter.addEventListener("click", () => confirmarTarea())

//hacer la misma funcionalidad con la tecla "enter" de teclado
document.addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        confirmarTarea()
    }
})

//cuando clicamos los botones de confirmar tarea o eliminar tarea
lista.addEventListener("click", function(event) {
    //bloque de codigo entero de html
    const element = event.target
    //el valor de "data" dentro de los atributos del codigo html
    const elementData = element.attributes.data.value
    if(elementData == "realizado") {
        tareaRealizada(element)
    }
    else {
        tareaEliminada(element)
    }
    //guardamos los datos por si cerramos ventana
    localStorage.setItem("TO-DO", JSON.stringify(LIST))
})

//recuperar informacion
let data = localStorage.getItem("TO-DO")
if(data) {
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}
else {
    LIST = []
    id = 0
}

//funcion cargar lista
function cargarLista(DATA) {
    DATA.forEach(function(i) {
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
    })
}


/*
    *guardar info*
    localStorage.setItem("TO-DO", JSON.stringify(LIST))
    JSON es una forma de crear archivo de texto para intercambiar datos
    JSON convierte del lenguaje utilizado a formato JSON
    PARSE convierte de formato JSON al lenguaje utilizado

    *obtener info*
    localStorage("TO-DO")

*/



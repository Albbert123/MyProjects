// Song data
const songList = [
    {
        title: "Changes",
        file: "1.mp3",
        cover: "1.png"

    },
    {
        title: "Dolphin",
        file: "2.mp3",
        cover: "2.png"
    },
    {
        title: "Reflection",
        file: "3.mp3",
        cover: "3.png"
    },
]

//cancion actual
let actualSong = null

// Capturar elementos del documento para trabajar con JS
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const titulo = document.getElementById("titulo")
const prev = document.getElementById("prev")
const play = document.getElementById("play")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container") 

//escuchar el elemento audio
audio.addEventListener("timeupdate", updateProgress)

//escuchar click de la barra
progressContainer.addEventListener("click", changeProgress)

//escuchar clicks en los controles
play.addEventListener("click", () => {
    if(audio.paused) {
        playSong()
    }
    else {
        pauseSong()
    }
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())

// Cargar canciones y mostrar el listado de canciones
function loadSongs() {
    songList.forEach((song, index) => {
         //crear elemento li
         const li = document.createElement("li")
         //crear a
         const link = document.createElement("a")
         //hidratar a
         link.textContent = song.title
         link.href = "#"
         //escuchar clicks
         link.addEventListener("click", () => loadSong(index)) //si pones directamente loadSong(..) se llama siempre, se pone una funcion flecha para arreglar rapido el problema
         //añadir li
         li.appendChild(link)
         //añadir li a ul
         songs.appendChild(li)
    })
}

//cargar cancion seleccionada
function loadSong(songIndex) {
    if(songIndex != actualSong) { //para que si vuelvo a clicar no pase nada
        changeActive(actualSong, songIndex);
        actualSong = songIndex 
        audio.src = "./audio/" + songList[songIndex].file
        playSong()
        changeCover(songIndex)
        changeTitulo(songIndex)
    }
}

//actualizar controles
function updateControls() {
    if(audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    }
    else { //si audo.play
        play.classList.remove("fa-play")
        play.classList.add("fa-pause")
    }
}

//reproducir cancion
function playSong() {
    if(actualSong != null) {
        audio.play()
        updateControls()
    }
}

//pausar cancion
function pauseSong() {
    audio.pause()
    updateControls()
}

//Cambiar clase activa
function changeActive(lastIndex, newIndex) {
    const links = document.querySelectorAll("a")
    if(lastIndex != null) {
        links[lastIndex].classList.remove("activo")
    }
    links[newIndex].classList.add("activo")
}

//change el cover de la cancion
function changeCover(songIndex) {
    cover.src = "./img/" + songList[songIndex].cover
}

//change el titulo de la cancion
function changeTitulo(songIndex) {
    titulo.textContent = songList[songIndex].title
}

//anterior cancion
function prevSong() {
    if(actualSong > 0) loadSong(actualSong-1)
    else loadSong(songList.length - 1)
}

//siguiente cancion
function nextSong() {
    if(actualSong < songList.length - 1) loadSong(actualSong+1)
    else loadSong(0)
}

// actualizar barra de progreso
function updateProgress(event) {
    //total y el actual
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration)*100
    progress.style.width = percent + "%"
}

//cambiar barra cuando se clica
function changeProgress(event) {
    //barra de 256px --> mirando a inspeccionar, para tenerlo en variable:
    const totalWidth = this.offsetWidth //el width de la barra
    const progressWidth = event.offsetX //el width cuando clicas (evento)
    const current = (progressWidth / totalWidth) * audio.duration //el factor * total de la cancion
    audio.currentTime = current

}

//siguiente cancion cuando se acaba la actual
audio.addEventListener("ended", () => nextSong())

//GO!
loadSongs();


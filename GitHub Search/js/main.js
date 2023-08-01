// obtener el formulario
const form = document.getElementById("form")

//obtener barra de busqueda
const search = document.getElementById("search")

//obtener el widget del usuario
const usercard = document.getElementById("usercard")

//escuchar evento submit del form
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = search.value
    getUserData(username)
    search.value = ""
})

//funcion obtener la info del usuario en github
/*  
    fetch sirve para hablar con otras API's, ponemos "await" i la funcion "asyn" 
    para que sea una "conversación" mas limpia, la funcion se pausa hasta que la 
    llamada a la API no sea resuelta
*/
 async function getUserData(username) {
    const API = "https://api.github.com/users/"

    try {
         //obtenemos la pagina del user
        const userRequest = await fetch(API + username)

        //si el user no existe lanza error y salimos de la funcion
        if(!userRequest.ok) {
            throw new Error(userRequest.status)
        }

        //devuelve la informacion en formato json
        const userData = await userRequest.json()
        
        //si el user tiene public repos
        if(userData.public_repos) {
            const reposRequest = await fetch(API + username + "/repos")
            const reposData = await reposRequest.json()
            userData.repos = reposData
        }

        showUserData(userData)
    } 
    catch(error) {
        showError(error.message)
    }
}

//funcion para componer el html del widget
function showUserData(userData) {
    let userContent = 
    `
        <img src="${userData.avatar_url}" alt="Avatar">
        <h1>${userData.name}</h1>
        <p>${userData.bio}</p>

        <section class="data">
            <ul>
                <li>${userData.followers} Followers</li>
                <li>${userData.following} Following</li>
                <li>${userData.public_repos} Repos</li>
            </ul>
        </section>
    
    `
    if(userData.repos) {

        userContent +=  ` <section class="repos"> `;

        //solo mostramos 7 repos y los vamos mostrando en un bucle
        userData.repos.slice(0,7).forEach(repo => {
            userContent += `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`
        })

        userContent += `</section> `;

    }

    usercard.innerHTML = userContent
}

//funcion gestion errores
function showError(error) {
    const errorContent = `<h1>Error: ${error}</h1>`
    usercard.innerHTML = errorContent
}
console.log('Buenas padrino, alivianese con café')

console.log('01- Primera instrucción')

// setTimeout (función callback, tiempo_para ejecutar)
// setTimeout(() => console.log('01.5 - Holiwis crayoli'), 3000)
const temporizador = (retardo, msj) => {
    setTimeout(() => console.log(msj), retardo)
}

const intervalo = (tiempo, msj) => {
    setInterval(() => console.log(msj), tiempo)
}

// temporizador(5000, '02- Segunda instrucción')
// intervalo(2000, 'Aparecí padrino')

console.log('03- Tercera instrucción')

// *********************************************************************
// API Fetch.

console.log('01- Antes de la soolicitud fetch')

function solicitudFetch(userToFind) {

    fetch('https://reqres.in/api/users?delay=3')
        .then(response => response.json())
        .then(conversion => {
            // console.log(conversion)
            //Buscando a Michael 
            /*     console.log(conversion.data[0].first_name)
                console.log(conversion.data[0].email) */

            /*             let { email, first_name } = conversion.data[0]
                        console.log(first_name, email)
                        console.log(conversion.data) */

            let encontrado = conversion.data.find(data => data.first_name === userToFind)
                // console.log(`Te encontré: ${encontrado}`)
            alert("API consulted")
            let objUser = document.getElementById('user-name')
            let objEmail = document.getElementById('user-email')

            objUser.value = encontrado.first_name
            objEmail.value = encontrado.email
            usarLocalStorage();
        })
}

function leerUsuario(usuario) {
    console.log(`Usuario a buscar: ${usuario}`)
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.time > Date.now()) {
        console.log(user.time - Date.now())
        leerLocalStorage();
    } else {
        solicitudFetch(usuario)
    }
}

function usarLocalStorage() {
    let objUser = document.getElementById('user-name')
    let objEmail = document.getElementById('user-email')
        // localStorage.setItem('clave', valor)
    let user = {
        name: objUser.value,
        email: objEmail.value,
        time: Date.now() + 60000
    }
    localStorage.setItem('name', objUser.value)
    localStorage.setItem('email', objEmail.value)
        // Para convertir un objeto a JSON: JSON.stringify( Objeto )
    localStorage.setItem('user', JSON.stringify(user))

}

function leerLocalStorage() {
    const objUser = document.getElementById('user-name')
    const objEmail = document.getElementById('user-email')
    alert('get From Local Storage')
    const user = JSON.parse(localStorage.getItem('user'))
    objUser.value = user.name
    objEmail.value = user.email

}
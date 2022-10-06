const button = document.getElementById('btn')

const runGetters = () => {
    getLoader()
    getUsers()
}

const getUsers = () => {
    const usersFromLocal = JSON.parse(localStorage.getItem("users"))
    if (usersFromLocal && usersFromLocal.time > Date.now()) {
        getUsersFromLocalStorage()
        console.log("Printed from local")
    } else {
        getUsersFromAPI()
        console.log("Printed from API")
    }
}

const getUsersFromAPI = async() => {
    fetch("https://reqres.in/api/users?delay=2")
        .then(response => response.json())
        .then(users => {
            console.log(users)
            printUsers(users.data)
            saveUsersToLocalStorage(users.data)
        })
}


const printLoader = () => `<div class="container-sm">
                                <div class="row">
                                    <p class="text-center">Loading users</p>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4 text-center">
                                        <img
                                            class="mx-auto"
                                            src="./loading.gif"
                                            style="width: 100px" 
                                        ></img>
                                    </div>
                                <div/>
                            </div>
                            `

const getLoader = () => {
    const container = document.getElementById("users-container")
    container.innerHTML = printLoader()
}



const printUser = (avatar_url, id, email, first_name, last_name) => {
    return `<div class="user-card">
                <p class="user-card-id">${id}</p>
                <p class="user-email"><a href='#'>${email}</a></p>
                <p>${first_name}</p>
                <p>${last_name}</p>
                <img 
                    src="${avatar_url}" 
                    class="user-card-img" 
                ></img>
            <div/>`
}


const userHeader = `<div class="user-card-header">
                        <p class="user-card-id">id</p>
                        <p class="user-email">Email</p>
                        <p>First name</p>
                        <p>Last name</p>
                        <p class="user-card-img-header">Image</p>
                    <div/>`

const printUsers = (users) => {
    const container = document.getElementById("users-container")
    container.innerHTML = userHeader
    for (let user of users) {
        container.innerHTML += printUser(user.avatar, user.id, user.email, user.first_name, user.last_name)
    }
}

const saveUsersToLocalStorage = data => {
    const users = {
        content: [...data],
        time: Date.now() + 60000
    }
    localStorage.setItem('users', JSON.stringify(users))
}

const getUsersFromLocalStorage = () => {
    const userList = JSON.parse(localStorage.getItem('users'))
    printUsers(userList.content)
}

button.addEventListener("click", runGetters)
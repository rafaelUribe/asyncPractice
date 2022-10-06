const button = document.getElementById('btn')

const getUsers = () => {
    getLoader()
    const localData = JSON.parse(localStorage.getItem("users"))
    localData && localData.time > Date.now() ?
        printUsers(localData.content) :
        getUsersFromAPI()
}

const getUsersFromAPI = () => {
    fetch("https://reqres.in/api/users?delay=2")
        .then(response => response.json())
        .then(users => {
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

const printUser = ({ avatar, id, email, first_name, last_name }) => {
    return `<div class="user-card">
                <p class="user-card-id">${id}</p>
                <p class="user-email"><a href='#'>${email}</a></p>
                <p>${first_name}</p>
                <p>${last_name}</p>
                <img 
                    src="${avatar}" 
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
    users.forEach(u => container.innerHTML += printUser(u))
}

const saveUsersToLocalStorage = data => {
    const users = {
        content: [...data],
        time: Date.now() + 60000
    }
    localStorage.setItem('users', JSON.stringify(users))
}

button.addEventListener("click", getUsers)
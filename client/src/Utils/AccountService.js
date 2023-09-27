let saveUUID = (uuid) => {
    sessionStorage.setItem("uuid", uuid)
}

let logout = () => {
    sessionStorage.removeItem("uuid")
}

let haveUUID = () => {
    return !!sessionStorage.getItem("uuid")
}

let getUUID = () => {
    return sessionStorage.getItem("uuid")
}

let saveEmail = (email) => {
    localStorage.setItem("email", email)
}

let haveEmail = () => {
    return localStorage.getItem("email") !== null
}

let getEmail = () => {
    return localStorage.getItem("email")
}

export const AccountService = {
    saveUUID, logout, haveUUID, getUUID, saveEmail, haveEmail, getEmail
}
export function setUser(user) {
    return {
        type: "USER/SET_USER",
        payload: user,
    };
}

export function removeUser() {
    return {
        type: "USER/REMOVE_USER",
    };
}

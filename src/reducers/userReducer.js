const defaultUser = {
    id: undefined,
    userName: "Guest",
    email: undefined,
};

const userReducer = (state = { ...defaultUser }, action) => {
    switch (action.type) {
        case "USER/SET_USER":
            state = {
                ...state,
                id: action.payload.id,
                userName: action.payload.userName,
                email: action.payload.email,
            };
            break;
        case "USER/REMOVE_USER":
            state = {
                ...state,
                ...defaultUser,
            };
            break;
        default:
            break;
    }
    return state;
};

export default userReducer;

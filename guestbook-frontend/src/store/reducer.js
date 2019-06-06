const initState = {
    isLoggedIn: false,
    showDeleteBtn: false,
    showLogin: false,
    data: [
        {
            Name: '',
            Body: ''
        }
    ],
    LoggedUserName: '',
    Password: '',


};

const reducer = (state = initState, action) => {

    let newState = {...state};
    switch (action.type) {
        case "LOGIN":
            if (!state.isLoggedIn) {
                newState.showLogin = !state.showLogin;
            }
            else {
                newState.isLoggedIn = false;
                newState.showDeleteBtn = false;
            }
            break;

        case "IsLoggedIn":
            newState.isLoggedIn = !state.isLoggedIn;
            newState.showDeleteBtn = true;
            newState.showLogin = false;
            newState.LoggedUserName = action.LoggedUserName;
            break;

    }
    return newState
};

export default reducer;
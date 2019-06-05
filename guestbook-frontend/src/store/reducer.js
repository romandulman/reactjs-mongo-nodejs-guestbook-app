const initState = {
    isLoggedIn: false,
    showLogin: false,
    data: [
        {
            Name: '',
            Body: ''
        }
    ],
    UserName:'',
    Password:'',


};

const reducer = (state = initState, action) => {

    let newState = {...state};
    switch (action.type) {
        case "LOGIN":
           // newState.isLoggedIn = !state.isLoggedIn
            newState.showLogin = !state.showLogin;
            break;

        case "IsLoggedIn":
            newState.isLoggedIn = !state.isLoggedIn;
            break;

    }
    return newState
};

export default reducer;
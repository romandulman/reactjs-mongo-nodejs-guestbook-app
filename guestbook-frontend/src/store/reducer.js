import Cookies from 'universal-cookie';


const initState = {
    isLoggedIn: false,
    showDeleteBtn: false,
    showLogin: false,
    showAddModal: false,
    GuestsList: [
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
        case "SHOWMODAL":
            newState.showAddModal = !state.showAddModal;
            break;
        case "LOGIN":
            if (!state.isLoggedIn) {
                newState.showLogin = !state.showLogin;
            }
            else {
                newState.isLoggedIn = false;
                newState.showDeleteBtn = false;
                if (state.isLoggedIn) {
                    window.open("http://127.0.0.1:8080/auth/logout", "_self");


                }
            }
            break;

        case "IsLoggedIn":
            newState.isLoggedIn = !state.isLoggedIn;
            newState.showDeleteBtn = true;
            newState.showLogin = false;
            newState.LoggedUserName = action.LoggedUserName;
            break;
        case "DATA":
            newState.GuestsList = action.guestsData;
            console.log(action.guestsData);
            break;

    }


    return newState
};

export default reducer;
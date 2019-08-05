


const initState = {
    isLoggedIn: false,
    showDeleteBtn: false,
    showLogin: false,
    showAddModal: false,
    GuestsList: [
        {
            Name: '',
            Body: '',
            Image: ''
        }
    ],
    LoggedUserName: '',
    UserProfile:{
       Username: '',
       Email:'',
       ProfileImage:'',
    }


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
                    fetch("/auth/logout")
                        .then(res => res.json())
                        .then(result => {
                            let data = result;
                            console.log(data);
                            newState.LoggedUserName = data;

                        });
                    window.location.assign("/guests");
                }
            }
            break;

        case "IsLoggedIn":
            newState.isLoggedIn = !state.isLoggedIn;
            newState.showDeleteBtn = true;
            newState.showLogin = false;
            newState.UserProfile = action.UserProfile;
            break;
        case "DATA":
            newState.GuestsList = action.guestsData;
           // console.log(action.guestsData);
            break;

    }


    return newState
};

export default reducer;
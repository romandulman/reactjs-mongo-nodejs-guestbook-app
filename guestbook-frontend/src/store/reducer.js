const initState = {
    isLoggedIn: false,
    data: [
        {
            Name: '',
            Body: ''
        }
    ]

};

const reducer = (state = initState, action) => {

    let newState = {...state}
    switch (action.type) {
        case "LOGIN":
            newState.isLoggedIn = !state.isLoggedIn
    }
    return newState
};

export default reducer;
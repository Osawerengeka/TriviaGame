const INIT_USER = "INIT-USER";

export const initUser = (user) => ({
    type: "INIT-USER", user: user});

let initialState = {
    user: {
        name: null,
        id: null,
    }
};

export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case INIT_USER:
            state.user.name = action.user.name;
            state.user.id = action.user.id;
            return state;
    }
    return state;
}
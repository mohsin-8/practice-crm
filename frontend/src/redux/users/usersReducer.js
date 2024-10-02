import * as actionTypes from "./usersTypes";

const initialState = {
    isLoadingUser: false,
    isUserData: []
};

export const userReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.GET_USERS_LOADING:
            return {
                ...state,
                isLoadingUser: true
            }
        case actionTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                isUserData: payload,
                isLoadingUser: false
            }
        case actionTypes.GET_USERS_ERROR:
            return {
                ...state,
                isLoadingUser: false
            }
        default:
            return state;
    };
};
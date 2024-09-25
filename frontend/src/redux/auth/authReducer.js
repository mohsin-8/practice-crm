import * as actionTypes from "./authTypes";

const initial_state = {
    isLoadingRegister: false,
    isRegister: null
};

export const authReducer = (state = initial_state, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.AUTH_REGISTER_LOADING:
            return {
                ...state,
                isLoadingRegister: true
            };
        case actionTypes.AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                isRegister: payload,
                isLoadingRegister: false
            }
        case actionTypes.AUTH_REGISTER_ERROR:
            return {
                ...state,
                isLoadingRegister: false
            }
        default:
            return state;
    };
};
import * as actionTypes from "./authTypes";

const initial_state = {
    isLoadingRegister: false,
    isRegister: null,
    isRegisterError: null,
    isLoadingLogin: false,
    isLogin: null,
    isLoginError: null,
    isAuthenticated: false
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
                isLoadingRegister: false,
                isAuthenticated: true,
            }
        case actionTypes.AUTH_REGISTER_ERROR:
            return {
                ...state,
                isLoadingRegister: false,
                isRegisterError: action.payload
            }
        case actionTypes.AUTH_LOGIN_LOADING:
            return {
                ...state,
                isLoadingLogin: true
            };
        case actionTypes.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: payload,
                isLoadingLogin: false,
                isAuthenticated: true,
            }
        case actionTypes.AUTH_LOGIN_ERROR:
            return {
                ...state,
                isLoadingLogin: false,
                isLoginError: action.payload,
            }
        default:
            return state;
    };
};
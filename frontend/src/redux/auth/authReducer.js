import * as actionTypes from "./authTypes";

const initial_state = {
    isLoadingRegister: false,
    isRegister: null,
    isRegisterError: null,
    isLoadingLogin: false,
    isLogin: null,
    isLoginError: null,
    isAuthenticated: false,
    isLoadingForgot: false,
    isForgotPassword: null,
    isForgotError: null,
    isLoadingResetPassword: false,
    isResetPassword: null,
    isResetPasswordError: null,
    isLoadingGetUser: false,
    isGetUser: null,
    isGetUserError: null,
    isLoadingChangePassword: false,
    isChangePassword: null,
    isChangePasswordError: null
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
        case actionTypes.AUTH_FORGOT_PASSWORD_LOADING:
            return {
                ...state,
                isLoadingForgot: true
            };
        case actionTypes.AUTH_FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isForgotPassword: payload,
                isLoadingForgot: false
            };
        case actionTypes.AUTH_FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                isLoadingForgot: false,
                isForgotError: action.payload
            }

        case actionTypes.AUTH_RESET_PASSWORD_LOADING:
            return {
                ...state,
                isLoadingResetPassword: true
            };
        case actionTypes.AUTH_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isResetPassword: payload,
                isLoadingResetPassword: false
            };
        case actionTypes.AUTH_RESET_PASSWORD_ERROR:
            return {
                ...state,
                isLoadingResetPassword: false,
                isResetPasswordError: action.payload
            }

        case actionTypes.AUTH_GET_USER_LOADING:
            return {
                ...state,
                isLoadingGetUser: true
            };
        case actionTypes.AUTH_GET_USER_SUCCESS:
            return {
                ...state,
                isGetUser: payload,
                isLoadingGetUser: false
            };
        case actionTypes.AUTH_GET_USER_ERROR:
            return {
                ...state,
                isLoadingGetUser: false,
                isGetUserError: action.payload
            }

        case actionTypes.AUTH_CHANGE_PASSWORD_LOADING:
            return {
                ...state,
                isLoadingChangePassword: true
            };
        case actionTypes.AUTH_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isChangePassword: payload,
                isLoadingChangePassword: false
            };
        case actionTypes.AUTH_CHANGE_PASSWORD_ERROR:
            return {
                ...state,
                isLoadingChangePassword: false,
                isChangePasswordError: action.payload
            }
        default:
            return state;
    };
};
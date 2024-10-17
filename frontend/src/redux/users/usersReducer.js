import * as actionTypes from "./usersTypes";

const initialState = {
    isLoadingUser: false,
    isUserData: [],
    isLoadingDeleteUser: false,
    isLoadingUpdateUser: false,
    isLoadingCreateUser: false,
    isGetUser: null,
    isLoadingGetUser: false
};

export const userReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.GET_USERS_LOADING:
            return {
                ...state,
                isLoadingUser: true,
            };
        case actionTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                isUserData: payload,
                isLoadingUser: false,
            };
        case actionTypes.GET_USERS_ERROR:
            return {
                ...state,
                isLoadingUser: false,
            };
        case actionTypes.DELETE_USERS_LOADING:
            return {
                ...state,
                isLoadingDeleteUser: true,
            };
        case actionTypes.DELETE_USERS_SUCCESS:
            return {
                ...state,
                isUserData: state.isUserData.filter(user => user._id !== payload),
                isLoadingDeleteUser: false,
            };
        case actionTypes.DELETE_USERS_ERROR:
            return {
                ...state,
                isLoadingDeleteUser: false,
            };
        case actionTypes.UPDATE_USERS_LOADING:
            return {
                ...state,
                isLoadingUpdateUser: true,
            };
        case actionTypes.UPDATE_USERS_SUCCESS:
            return {
                ...state,
                isUserData: state.isUserData.map(user => user._id === payload._id ? { ...user, ...payload } : user),
                isLoadingUpdateUser: false,
            };
        case actionTypes.UPDATE_USERS_ERROR:
            return {
                ...state,
                isLoadingUpdateUser: false,
            };

        case actionTypes.CREATE_USERS_LOADING:
            return {
                ...state,
                isLoadingCreateUser: true,
            };
        case actionTypes.CREATE_USERS_SUCCESS:
            return {
                ...state,
                isUserData: payload,
                isLoadingCreateUser: false,
            };
        case actionTypes.CREATE_USERS_ERROR:
            return {
                ...state,
                isLoadingCreateUser: false,
            };

        case actionTypes.GET_USERS_DATA_LOADING:
            return {
                ...state,
                isLoadingGetUser: true,
            };
        case actionTypes.GET_USERS_DATA_SUCCESS:
            return {
                ...state,
                isGetUser: payload,
                isLoadingGetUser: false,
            };
        case actionTypes.GET_USERS_DATA_ERROR:
            return {
                ...state,
                isLoadingGetUser: false,
            };
        default:
            return state;
    }
};
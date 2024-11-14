import * as actionTypes from "./orderTypes";

const initialState = {
    isLoadingGetAllOrder: false,
    isGetAllOrder: null,
    isLoadingCreateOrder: false,
    isCreateOrder: null
};

export const orderReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.GET_ALL_ORDER_LOADING:
            return {
                ...state,
                isLoadingGetAllOrder: true
            }
        case actionTypes.GET_ALL_ORDER_SUCCESS:
            return {
                ...state,
                isGetAllOrder: payload,
                isLoadingGetAllOrder: false
            }
        case actionTypes.GET_ALL_ORDER_FAILED:
            return {
                ...state,
                isLoadingGetAllOrder: false
            }

        case actionTypes.CREATE_ORDER_LOADING:
            return {
                ...state,
                isLoadingCreateOrder: true
            }
        case actionTypes.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                isCreateOrder: payload,
                isLoadingCreateOrder: false
            }
        case actionTypes.CREATE_ORDER_FAILED:
            return {
                ...state,
                isLoadingCreateOrder: false
            }
        default:
            return state;
    }
};
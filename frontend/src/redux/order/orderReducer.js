import * as actionTypes from "./orderTypes";

const initialState = {
    isLoadingGetAllOrder: false,
    isGetAllOrder: null
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
        default:
            return state;
    }
};
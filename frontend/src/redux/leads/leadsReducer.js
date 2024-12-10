import * as actionTypes from "./leadsType";

const initialState = {
    isLoadingAllLeads: false,
    isAllLeads: null
};

export const leadsReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.GET_ALL_LEADS_LOADING:
            return {
                ...state,
                isLoadingAllLeads: true
            };

        case actionTypes.GET_ALL_LEADS_SUCCESS:
            return {
                ...state,
                isAllLeads: payload,
                isLoadingAllLeads: false
            };

        case actionTypes.GET_ALL_LEADS_FAILED:
            return {
                ...state,
                isLoadingAllLeads: false
            };
        default:
            return state;
    }
};
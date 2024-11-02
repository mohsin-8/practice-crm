import * as actionTypes from "./leadsType";

const initialState = {
    isLoadingCreateLeads: false,
    isCreateLeads: null,
    isLoadingGetAllLeads: false,
    isGetAllLeads: null
};

export const leadReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.CREATE_LEADS_LOADING:
            return {
                ...state,
                isLoadingCreateLeads: true
            }

        case actionTypes.CREATE_LEADS_SUCCESS:
            return {
                ...state,
                isCreateLeads: payload,
                isLoadingCreateLeads: false
            }

        case actionTypes.CREATE_LEADS_FAILED:
            return {
                ...state,
                isLoadingCreateLeads: false
            }

        case actionTypes.GET_LEADS_LOADING:
            return {
                ...state,
                isLoadingGetAllLeads: true
            }

        case actionTypes.GET_LEADS_SUCCESS:
            return {
                ...state,
                isGetAllLeads: payload,
                isLoadingGetAllLeads: false
            }

        case actionTypes.GET_LEADS_FAILED:
            return {
                ...state,
                isLoadingGetAllLeads: false
            }
        default:
            return state;
    }
};
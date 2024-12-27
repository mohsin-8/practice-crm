import * as actionTypes from "./leadsType";

const initialState = {
    isLoadingAllLeads: false,
    isAllLeads: null,
    isLeadDeleteByIdLoading: false,
    isLoadingUpdateLead: false,
    isLoadingCreateNewLead: false,
    isCreateNewLead: null,
    isLoadingLeadDataById: false,
    isGetLeadById: null
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

        case actionTypes.DELETE_LEADS_BY_ID_LOADING:
            return {
                ...state,
                isLeadDeleteByIdLoading: true
            };

        case actionTypes.DELETE_LEADS_BY_ID_SUCCESS:
            return {
                ...state,
                isAllLeads: state.isAllLeads.filter(lead => lead?._id !== payload),
                isLeadDeleteByIdLoading: false
            };

        case actionTypes.DELETE_LEADS_BY_ID_ERROR:
            return {
                ...state,
                isLeadDeleteByIdLoading: false
            };

        case actionTypes.UPDATE_LEADS_BY_ID_LOADING:
            return {
                ...state,
                isLoadingUpdateLead: true,
            };
        case actionTypes.UPDATE_LEADS_BY_ID_SUCCESS:
            return {
                ...state,
                isAllLeads: state.isAllLeads.map(lead => lead?._id === payload?._id ? { ...lead, ...payload } : lead),
                isLoadingUpdateLead: false,
            };
        case actionTypes.UPDATE_LEADS_BY_ID_ERROR:
            return {
                ...state,
                isLoadingUpdateLead: false,
            };

        case actionTypes.CREATE_LEADS_LOADING:
            return {
                ...state,
                isLoadingCreateNewLead: true
            };
        case actionTypes.CREATE_LEADS_SUCCESS:
            return {
                ...state,
                isCreateNewLead: payload,
                isLoadingCreateNewLead: false,
            };
        case actionTypes.CREATE_LEADS_FAILED:
            return {
                ...state,
                isLoadingCreateNewLead: false,
            }

        case actionTypes.GET_LEADS_BY_ID_LOADING:
            return {
                ...state,
                isLoadingLeadDataById: true
            };
        case actionTypes.GET_LEADS_BY_ID_SUCCESS:
            return {
                ...state,
                isGetLeadById: payload,
                isLoadingLeadDataById: false,
            };
        case actionTypes.GET_LEADS_BY_ID_FAILED:
            return {
                ...state,
                isLoadingLeadDataById: false,
            }
        default:
            return state;
    }
};
import * as actionTypes from "./invoiceTypes";

const initialState = {
    isLoadingCreateInvoice: false,
    isCreateInvoice: null,
    isLoadingGetAllInvoices: false,
    isGetAllInvoices: null
};

export const invoiceReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.CREATE_INVOICE_LOADING:
            return {
                ...state,
                isLoadingCreateInvoice: true
            }
        case actionTypes.CREATE_INVOICE_SUCCESS:
            return {
                ...state,
                isCreateInvoice: payload,
                isLoadingCreateInvoice: false
            }
        case actionTypes.CREATE_INVOICE_FAILED:
            return {
                ...state,
                isLoadingCreateInvoice: false
            }

        case actionTypes.GETALL_INVOICE_LOADING:
            return {
                ...state,
                isLoadingGetAllInvoices: true
            }
        case actionTypes.GETALL_INVOICE_SUCCESS:
            return {
                ...state,
                isGetAllInvoices: payload,
                isLoadingGetAllInvoices: false
            }
        case actionTypes.GETALL_INVOICE_FAILED:
            return {
                ...state,
                isLoadingGetAllInvoices: false
            }
        default:
            return state;
    }
};
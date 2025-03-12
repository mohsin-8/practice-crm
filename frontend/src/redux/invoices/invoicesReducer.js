import * as actionTypes from "./invoicesType";

const initialState = {
    invoices: [],
    invoice: null,
    error: null,
};

export const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INVOICE_CREATE:
            return { ...state, invoices: [...state.invoices, action.payload], error: null };

        case actionTypes.INVOICE_GET_ALL:
            return { ...state, invoices: action.payload, error: null };

        case actionTypes.INVOICE_GET_BY_ID:
            return { ...state, invoice: action.payload, error: null };

        case actionTypes.INVOICE_UPDATE:
            return {
                ...state,
                invoices: state.invoices.map((inv) =>
                    inv._id === action.payload._id ? action.payload : inv
                ),
                error: null,
            };

        case actionTypes.INVOICE_DELETE:
            return {
                ...state,
                invoices: state.invoices.filter((inv) => inv._id !== action.payload),
                error: null,
            };

        case actionTypes.INVOICE_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
};
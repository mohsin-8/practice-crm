import * as actionTypes from "./invoicesType";
import axiosInstance from "../../axiosInstance";

export const createInvoice = (invoiceData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/invoice/create", invoiceData);
        dispatch({ type: actionTypes.INVOICE_CREATE, payload: response.data });
        alert("Invoice created successfully!");
    } catch (error) {
        dispatch({ type: actionTypes.INVOICE_ERROR, payload: error.response?.data || error.message });
    }
};

export const getInvoices = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/invoice/get-all");
        dispatch({ type: actionTypes.INVOICE_GET_ALL, payload: response.data });
    } catch (error) {
        dispatch({ type: actionTypes.INVOICE_ERROR, payload: error.response?.data || error.message });
    }
};

export const getInvoiceById = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/invoice/get-invoice/${id}`);
        dispatch({ type: actionTypes.INVOICE_GET_BY_ID, payload: response.data });
    } catch (error) {
        dispatch({ type: actionTypes.INVOICE_ERROR, payload: error.response?.data || error.message });
    }
};

export const updateInvoice = (id, updatedData) => async (dispatch) => {
    try {
        const response = await axiosInstance.put(`/invoice/update-invoice/${id}`, updatedData);
        dispatch({ type: actionTypes.INVOICE_UPDATE, payload: response.data });
        alert("Invoice updated successfully!");
    } catch (error) {
        dispatch({ type: actionTypes.INVOICE_ERROR, payload: error.response?.data || error.message });
    }
};

export const deleteInvoice = (id) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/invoice/delete-invoice/${id}`);
        dispatch({ type: actionTypes.INVOICE_DELETE, payload: id });
        alert("Invoice deleted successfully!");
    } catch (error) {
        dispatch({ type: actionTypes.INVOICE_ERROR, payload: error.response?.data || error.message });
    }
};
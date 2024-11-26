import * as actionTypes from "./invoiceTypes";
import axiosInstance from "../../axiosInstance";

export const CreateInvoiceAction = (formData, onSuccess) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.CREATE_INVOICE_LOADING
        });
        const accessToken = localStorage.getItem("accessToken");
        axiosInstance.post("/invoice/create", formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.CREATE_INVOICE_SUCCESS,
                        payload: res.data
                    });
                    onSuccess();
                } else {
                    dispatch({
                        type: actionTypes.CREATE_INVOICE_FAILED,
                        payload: res.data.message
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.CREATE_INVOICE_FAILED,
                    payload: error.response?.data?.message || "Failed to add invoice data."
                });
            });
    };
};

export const GetInvoiceAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GETALL_INVOICE_LOADING
        });
        axiosInstance.get("/invoice/get-all")
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.GETALL_INVOICE_SUCCESS,
                        payload: res.data
                    });
                } else {
                    dispatch({
                        type: actionTypes.GETALL_INVOICE_FAILED,
                        payload: res.data.message
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.GETALL_INVOICE_FAILED,
                    payload: error.response?.data?.message || "Failed to get invoice data."
                });
            });
    };
};
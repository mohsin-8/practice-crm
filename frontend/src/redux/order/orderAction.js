import * as actionTypes from "./orderTypes";
import axiosInstance from "../../axiosInstance";

export const OrderGetAllAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_ORDER_LOADING
        });
        axiosInstance.get("/order/get-all")
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.GET_ALL_ORDER_SUCCESS,
                        payload: res.data
                    });
                } else {
                    dispatch({
                        type: actionTypes.GET_ALL_ORDER_FAILED,
                        payload: res.data.message
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.GET_ALL_ORDER_FAILED,
                    payload: error.response?.data?.message || "Failed to get orders data."
                });
            });
    };
};

export const OrderCreateAction = (formData, onSuccess) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.CREATE_ORDER_LOADING
        });

        axiosInstance.post("/order/create", formData)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.CREATE_ORDER_SUCCESS,
                        payload: res.data
                    });
                    if (onSuccess) onSuccess();
                } else {
                    dispatch({
                        type: actionTypes.CREATE_ORDER_FAILED,
                        payload: res.data.message || "Failed to create order."
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.CREATE_ORDER_FAILED,
                    payload: error.response?.data?.message || "Failed to add leads data."
                });
            });
    };
};
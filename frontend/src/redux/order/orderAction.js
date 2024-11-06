import * as actionTypes from "./orderTypes";
import axiosInstance from "../../axiosInstance";

export const LeadGetAllAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_ORDER_LOADING
        });
        axiosInstance.get("/order/list")
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
                    payload: error.response?.data?.message || "Failed to get leads data."
                });
            });
    };
};
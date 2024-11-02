import * as actionTypes from "./leadsType";
import axiosInstance from "../../axiosInstance";

export const LeadCreateAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.CREATE_LEADS_LOADING
        });
        axiosInstance.post("/leads/create")
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.CREATE_LEADS_SUCCESS,
                        payload: res.data
                    });
                } else {
                    dispatch({
                        type: actionTypes.CREATE_LEADS_FAILED,
                        payload: res.data.message
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.CREATE_LEADS_FAILED,
                    payload: error.response?.data?.message || "Failed to add leads data."
                });
            });
    };
};

export const LeadGetAllAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_LEADS_LOADING
        });
        const accessToken = localStorage.getItem("accessToken");
        axiosInstance.get("/leads/get-all", {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.GET_LEADS_SUCCESS,
                        payload: res.data
                    });
                } else {
                    dispatch({
                        type: actionTypes.GET_LEADS_FAILED,
                        payload: res.data.message
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.GET_LEADS_FAILED,
                    payload: error.response?.data?.message || "Failed to get leads data."
                });
            });
    };
};
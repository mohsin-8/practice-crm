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

export const LeadUpdateAction = (id, onSuccess, formData) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.UPDATE_LEADS_LOADING
        });
        axiosInstance.put(`/leads/update/${id}`, formData).then((res) => {
            if (res.status === 200) {
                dispatch({
                    type: actionTypes.UPDATE_LEADS_SUCCESS,
                    payload: res.data
                });
                onSuccess();
            } else {
                dispatch({
                    type: actionTypes.UPDATE_LEADS_FAILED,
                    payload: res.data.message
                });
            }
        }).catch((error) => {
            dispatch({
                type: actionTypes.UPDATE_LEADS_FAILED,
                payload: error.response?.data?.message || "Failed to update lead data."
            })
        })
    }
};

export const LeadDeleteAction = (id, onSuccess) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.DELETE_LEADS_LOADING
        });
        axiosInstance.delete(`/leads/delete/${id}`).then((res) => {
            if (res.status === 200) {
                dispatch({
                    type: actionTypes.DELETE_LEADS_SUCCESS,
                    payload: id
                });
                onSuccess();
            } else {
                dispatch({
                    type: actionTypes.DELETE_LEADS_FAILED,
                    payload: res.data.message
                });
            }
        }).catch((error) => {
            dispatch({
                type: actionTypes.DELETE_LEADS_FAILED,
                payload: error.response?.data?.message || "Failed to update lead data."
            })
        })
    }
};
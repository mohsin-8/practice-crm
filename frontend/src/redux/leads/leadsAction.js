import * as actionTypes from "./leadsType";
import axiosInstance from "../../axiosInstance";

export const GetLeadsAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_LEADS_LOADING
        });
        axiosInstance.get("/lead/get-all")
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.GET_ALL_LEADS_SUCCESS,
                        payload: res.data
                    });
                } else {
                    dispatch({
                        type: actionTypes.GET_ALL_LEADS_FAILED,
                        payload: res.data.message
                    });
                }
            }).catch((error) => {
                dispatch({
                    type: actionTypes.GET_ALL_LEADS_FAILED,
                    payload: error.response?.data?.message || "Failed to fetch Leads data."
                });
            })
    };
};

export const DeleteLeadByIdAction = (leadId, onSuccess) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.DELETE_LEADS_BY_ID_LOADING
        });
        axiosInstance.delete(`/lead/delete/${leadId}`)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.DELETE_LEADS_BY_ID_SUCCESS,
                        payload: leadId
                    });
                    onSuccess();
                } else {
                    dispatch({
                        type: actionTypes.DELETE_LEADS_BY_ID_ERROR,
                        payload: res.data.message
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.DELETE_LEADS_BY_ID_ERROR,
                    payload: error.response?.data?.message || "Failed to delete Lead by id."
                });
            })
    }
};

export const UpdateLeadByIdAction = (leadId, onSuccess, formData) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.UPDATE_LEADS_BY_ID_LOADING
        });
        axiosInstance.put(`/lead/update/${leadId}`, formData)
        .then((res)=> {
            if(res.status === 200) {
                dispatch({
                    type: actionTypes.UPDATE_LEADS_BY_ID_SUCCESS,
                    payload: res.data
                });
                onSuccess();
            } else {
                dispatch({
                    type: actionTypes.UPDATE_LEADS_BY_ID_ERROR,
                    payload: res.data.message
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.UPDATE_LEADS_BY_ID_ERROR,
                payload: error.response?.data?.message || "Failed to update lead data."
            });
        });
    }
};
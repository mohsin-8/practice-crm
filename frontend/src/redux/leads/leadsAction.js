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
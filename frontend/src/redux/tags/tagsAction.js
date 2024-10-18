import * as actionTypes from "./tagsTypes";
import axiosInstance from "../../axiosInstance";

export const GetTagsAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_TAGS_LOADING
        });
        axiosInstance.get("/get/tag")
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.GET_TAGS_SUCCESS,
                        payload: res.data
                    });
                } else {
                    dispatch({
                        type: actionTypes.GET_TAGS_ERROR,
                        payload: res.data.message
                    });
                }
            }).catch((error) => {
                dispatch({
                    type: actionTypes.GET_TAGS_ERROR,
                    payload: error.response?.data?.message || "Failed to fetch Tags data."
                });
            });
    };
};
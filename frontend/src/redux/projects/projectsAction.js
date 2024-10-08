import * as actionTypes from "./projectsType";
import axiosInstance from "../../axiosInstance";

export const GetProjectAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_PROJECTS_LOADING
        });
        const accessToken = localStorage.getItem("accessToken");
        axiosInstance.get("/project", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.GET_PROJECTS_SUCCESS,
                        payload: res.data
                    });
                } else {
                    dispatch({
                        type: actionTypes.GET_PROJECTS_FAILED,
                        payload: res.data.message
                    });
                };
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.GET_PROJECTS_FAILED,
                    payload: error.response?.data?.message || "Failed to fetch projects data."
                });
            });
    };
};
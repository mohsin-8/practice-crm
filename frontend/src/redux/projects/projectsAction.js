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

export const DeleteProjectAction = (id) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.DELETE_PROJECTS_LOADING
        });
        const accessToken = localStorage.getItem("accessToken");
        axiosInstance.delete(`/project/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.DELETE_PROJECTS_SUCCESS,
                        payload: res.data
                    });
                } else {
                    dispatch({
                        type: actionTypes.DELETE_PROJECTS_FAILED,
                        payload: res.data.message
                    });
                };
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.DELETE_PROJECTS_FAILED,
                    payload: error.response?.data?.message || "Failed to fetch projects data."
                });
            });
    };
};

export const DeleteProjectUsers = (projectId, userId, onSuccessDeleteUser) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.DELETE_PROJECTS_USER_LOADING
        });
        const accessToken = localStorage.getItem("accessToken");
        axiosInstance.delete(`/project/${projectId}/members/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.DELETE_PROJECTS_USER_SUCCESS,
                        payload: res.data
                    });
                    onSuccessDeleteUser(projectId, userId);
                } else {
                    dispatch({
                        type: actionTypes.DELETE_PROJECTS_USER_FAILED,
                        payload: res.data.message
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.DELETE_PROJECTS_USER_FAILED,
                    payload: error.response?.data?.message || "Failed to delete user from projects"
                });
            });
    };
};
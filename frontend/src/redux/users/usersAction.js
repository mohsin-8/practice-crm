import * as actionTypes from "./usersTypes";
import axiosInstance from "../../axiosInstance";

export const UserDataAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_USERS_LOADING
        });
        axiosInstance.get("/hr/users")
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.GET_USERS_SUCCESS,
                        payload: res.data.data
                    });
                } else {
                    dispatch({
                        type: actionTypes.GET_USERS_ERROR,
                        payload: res.data.message
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.GET_USERS_ERROR,
                    payload: error.response?.data?.message || "Failed to fetch user data."
                });
            });
    };
};

export const UserDeleteAction = (userId, onSuccess) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.DELETE_USERS_LOADING
        });
        axiosInstance.delete(`/hr/users/${userId}`)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.DELETE_USERS_SUCCESS,
                        payload: userId
                    });
                    onSuccess();
                } else {
                    dispatch({
                        type: actionTypes.DELETE_USERS_ERROR,
                        payload: res.data.message
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.DELETE_USERS_ERROR,
                    payload: error.response?.data?.message || "Failed to delete user data."
                });
            });
    };
};

export const UserUpdateAction = (userId, formData, onSuccess) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.UPDATE_USERS_LOADING
        });
        axiosInstance.put(`/hr/users/update/${userId}`, formData)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.UPDATE_USERS_SUCCESS,
                        payload: res.data
                    });
                    onSuccess();
                } else {
                    dispatch({
                        type: actionTypes.UPDATE_USERS_ERROR,
                        payload: res.data.message
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.UPDATE_USERS_ERROR,
                    payload: error.response?.data?.message || "Failed to delete user data."
                });
            });
    };
};
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
                    payload: error.response?.data?.message
                });
            });
    };
};
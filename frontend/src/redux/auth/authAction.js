import axiosInstance from "../../axiosInstance";
import * as actionTypes from "./authTypes";

export const RegisterAction = (userData) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.AUTH_REGISTER_LOADING
        });
        axiosInstance.post("/auth/register", userData)
            .then((res) => {
                if (res.status) {
                    sessionStorage.setItem('token', response.data.token);
                    dispatch({
                        type: actionTypes.AUTH_REGISTER_SUCCESS,
                        payload: res.data
                    });
                } else {
                    dispatch({
                        type: actionTypes.AUTH_REGISTER_ERROR
                    });
                }
            }).catch((error) => {
                dispatch({
                    type: actionTypes.AUTH_REGISTER_ERROR
                });
            });
    };
};
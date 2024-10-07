import axiosInstance from "../../axiosInstance";
import * as actionTypes from "./authTypes";

export const RegisterAction = (userData) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.AUTH_REGISTER_LOADING
        });

        axiosInstance.post("/auth/register", userData)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem("role", res.data.user.role);
                    localStorage.setItem("user", JSON.stringify(res.data.user));

                    dispatch({
                        type: actionTypes.AUTH_REGISTER_SUCCESS,
                        payload: res
                    });
                } else {
                    dispatch({
                        type: actionTypes.AUTH_REGISTER_ERROR,
                        payload: res.data.message || 'Registration failed'
                    });
                }
            })
            .catch((error) => {
                const errorMsg = error.response?.data?.message || 'An error occurred during registration';
                dispatch({
                    type: actionTypes.AUTH_REGISTER_ERROR,
                    payload: errorMsg
                });
            });
    };
};

export const LoginAction = (userData) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.AUTH_LOGIN_LOADING
        });

        axiosInstance.post("/auth/login", userData)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("token", res.data.refreshToken);
                    localStorage.setItem("role", res.data.user.role);
                    localStorage.setItem("user", JSON.stringify(res.data.user));

                    dispatch({
                        type: actionTypes.AUTH_LOGIN_SUCCESS,
                        payload: res.data
                    });
                } else {
                    dispatch({
                        type: actionTypes.AUTH_LOGIN_ERROR,
                        payload: res.data.message || "Login Failed"
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.AUTH_LOGIN_ERROR,
                    payload: error.response?.data?.message || "Login Failed"
                });
            });
    };
};

export const ForgotPasswordAction = (data) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.AUTH_FORGOT_PASSWORD_LOADING
        });

        axiosInstance.post("/auth/request-reset-password", data)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.AUTH_FORGOT_PASSWORD_SUCCESS,
                        payload: res.data
                    });
                } else {
                    dispatch({
                        type: actionTypes.AUTH_FORGOT_PASSWORD_ERROR,
                        payload: res.data.message || "Forgot Password Failed"
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.AUTH_FORGOT_PASSWORD_ERROR,
                    payload: error.response?.data?.message || "Forgot Password Failed"
                });
            });
    };
};

export const ResetPasswordAction = (data, token) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.AUTH_RESET_PASSWORD_LOADING
        });

        axiosInstance.post(`/auth/reset-password/${token}`, data)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.AUTH_RESET_PASSWORD_SUCCESS,
                        payload: res.data
                    });
                } else {
                    dispatch({
                        type: actionTypes.AUTH_RESET_PASSWORD_ERROR,
                        payload: res.data.message || "Reset Password Failed"
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.AUTH_RESET_PASSWORD_ERROR,
                    payload: error.response?.data?.message || "Reset Password Failed"
                });
            });
    };
};

export const GetUserAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.AUTH_GET_USER_LOADING
        });

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            axiosInstance.get(`/auth/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        dispatch({
                            type: actionTypes.AUTH_GET_USER_SUCCESS,
                            payload: res.data.data
                        });
                    } else {
                        dispatch({
                            type: actionTypes.AUTH_GET_USER_ERROR,
                            payload: res.data.message || "Failed to retrieve user data"
                        });
                    }
                })
                .catch((error) => {
                    dispatch({
                        type: actionTypes.AUTH_GET_USER_ERROR,
                        payload: error.response?.data?.message || "Failed to retrieve user data"
                    });
                });
        } else {
            dispatch({
                type: actionTypes.AUTH_GET_USER_ERROR,
                payload: "No token found, please log in"
            });
        }
    };
};

export const GetChangePasswordAction = (data) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.AUTH_CHANGE_PASSWORD_LOADING
        });

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            axiosInstance.put(`/auth/change-password`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        dispatch({
                            type: actionTypes.AUTH_CHANGE_PASSWORD_SUCCESS,
                            payload: res.data.data
                        });
                    } else {
                        dispatch({
                            type: actionTypes.AUTH_CHANGE_PASSWORD_ERROR,
                            payload: res.data.message || "Failed to retrieve user data"
                        });
                    }
                })
                .catch((error) => {
                    dispatch({
                        type: actionTypes.AUTH_CHANGE_PASSWORD_ERROR,
                        payload: error.response?.data?.message || "Failed to retrieve user data"
                    });
                });
        } else {
            dispatch({
                type: actionTypes.AUTH_CHANGE_PASSWORD_ERROR,
                payload: "No token found, please log in"
            });
        }
    };
};

export const clearLoginError = () => {
    return {
        type: actionTypes.CLEAR_LOGIN_ERROR,
    };
};
import * as actionTypes from "./projectsType";

const initialState = {
    isLoadingProject: false,
    isProjects: null
};

export const projectReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.GET_PROJECTS_LOADING:
            return {
                ...state,
                isLoadingProject: true
            };
        case actionTypes.GET_PROJECTS_SUCCESS:
            return {
                ...state,
                isProject: payload,
                isLoadingProject: false
            };
        case actionTypes.GET_PROJECTS_FAILED:
            return {
                ...state,
                isLoadingUser: false,
            };

        default:
            return state;
    }
};
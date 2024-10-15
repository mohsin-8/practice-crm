import * as actionTypes from "./projectsType";

const initialState = {
    isLoadingProject: false,
    isProjects: null,
    isLoadingProjectUser: false,
    isLoadingDeleteProject: false
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
                isProjects: payload,
                isLoadingProject: false
            };
        case actionTypes.GET_PROJECTS_FAILED:
            return {
                ...state,
                isLoadingProject: false,
            };
        case actionTypes.DELETE_PROJECTS_USER_LOADING:
            return {
                ...state,
                isLoadingProjectUser: true
            };
        case actionTypes.DELETE_PROJECTS_USER_SUCCESS:
            return {
                ...state,
                isProjects: state.isProjects.map(project =>
                    project._id === action.payload.projectId
                        ? { ...project, assignMembers: project.assignMembers.filter(user => user._id !== action.payload.userId) }
                        : project
                ),
                isLoadingProjectUser: false
            };
        case actionTypes.DELETE_PROJECTS_USER_FAILED:
            return {
                ...state,
                isLoadingProjectUser: false,
            };
        case actionTypes.DELETE_PROJECTS_LOADING:
            return {
                ...state,
                isLoadingDeleteProject: true
            };
        case actionTypes.DELETE_PROJECTS_SUCCESS:
            return {
                ...state,
                isProjects: state.isProjects.map(project => [...project, project.filter(i => i._id !== action.payload.id)]),
                isLoadingDeleteProject: false
            };
        case actionTypes.DELETE_PROJECTS_FAILED:
            return {
                ...state,
                isLoadingDeleteProject: false,
            };
        default:
            return state;
    }
};
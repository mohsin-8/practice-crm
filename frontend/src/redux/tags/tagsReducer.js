import * as actionTypes from "./tagsTypes";

const initialState = {
    isLoadingGetTags: false,
    isGetTags: null,
    isTagsDelete: null
};

export const TagsReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.GET_TAGS_LOADING:
            return {
                ...state,
                isLoadingGetTags: true
            }
        case actionTypes.GET_TAGS_SUCCESS:
            return {
                ...state,
                isGetTags: payload,
                isLoadingGetTags: false
            }
        case actionTypes.GET_TAGS_ERROR:
            return {
                ...state,
                isLoadingGetTags: false
            }
        default:
            return state;
    };
};
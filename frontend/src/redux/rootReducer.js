import { combineReducers } from "redux";
import { authReducer } from "./auth/authReducer";
import { userReducer } from "./users/usersReducer";
import { projectReducer } from "./projects/projectsReducer";
import { TagsReducer } from "./tags/tagsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    projects: projectReducer,
    tags: TagsReducer
});

export default rootReducer;
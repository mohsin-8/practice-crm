import { combineReducers } from "redux";
import { authReducer } from "./auth/authReducer";
import { userReducer } from "./users/usersReducer";
import { projectReducer } from "./projects/projectsReducer";
import { TagsReducer } from "./tags/tagsReducer";
import { leadsReducer } from "./leads/leadsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    projects: projectReducer,
    tags: TagsReducer,
    leads: leadsReducer
});

export default rootReducer;
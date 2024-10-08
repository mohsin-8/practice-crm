import { combineReducers } from "redux";
import { authReducer } from "./auth/authReducer";
import { userReducer } from "./users/usersReducer";
import { projectReducer } from "./projects/projectsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    projects: projectReducer
});

export default rootReducer;
import { combineReducers } from "redux";
import { authReducer } from "./auth/authReducer";
import { userReducer } from "./users/usersReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});

export default rootReducer;
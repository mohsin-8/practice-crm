import { combineReducers } from "redux";
import { authReducer } from "./auth/authReducer";
import { userReducer } from "./users/usersReducer";
import { projectReducer } from "./projects/projectsReducer";
import { TagsReducer } from "./tags/tagsReducer";
import { leadsReducer } from "./leads/leadsReducer";
import { invoiceReducer } from "./invoices/invoicesReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    projects: projectReducer,
    tags: TagsReducer,
    leads: leadsReducer,
    invoices: invoiceReducer
});

export default rootReducer;
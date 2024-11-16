import { combineReducers } from "redux";
import { authReducer } from "./auth/authReducer";
import { userReducer } from "./users/usersReducer";
import { projectReducer } from "./projects/projectsReducer";
import { TagsReducer } from "./tags/tagsReducer";
import { leadReducer } from "./leads/leadsReducer";
import { orderReducer } from "./order/orderReducer";
import { invoiceReducer } from "./invoice/invoiceReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    projects: projectReducer,
    tags: TagsReducer,
    leads: leadReducer,
    order: orderReducer,
    invoice: invoiceReducer
});

export default rootReducer;
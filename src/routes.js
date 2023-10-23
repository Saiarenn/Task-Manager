import {CALENDAR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, TASKS_ROUTE} from "./utils/consts";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Auth from "./pages/Auth";

export const publicRoutes = [
    {
        path: CALENDAR_ROUTE,
        component: Calendar,
    },
    {
        path: TASKS_ROUTE,
        component: Tasks,
    },
    {
        path: LOGIN_ROUTE,
        component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        component: Auth
    },
]
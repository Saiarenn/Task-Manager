import {CALENDAR_ROUTE, TASKS_ROUTE} from "./components/utils/consts";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";

export const publicRoutes = [
    {
        path: CALENDAR_ROUTE,
        component: Calendar,
    },
    {
        path: TASKS_ROUTE,
        component: Tasks,
    },
]
import {
    CALENDAR_ROUTE, CONFIRMATION_ROUTE,
    DASHBOARD_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE, SEND_ROUTE,
    SETTING_ROUTE,
    TASKS_ROUTE,
} from "./utils/consts";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Auth from "./pages/Auth";
import Setting from "./pages/Setting";
import TaskPage from "./pages/TaskPage";
import EmailSend from "./pages/EmailSend";
import EmailConfirmation from "./pages/EmailConfirmation";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: Auth,
    },
    {
        path: REGISTRATION_ROUTE,
        component: Auth,
    },
    {
        path: SEND_ROUTE,
        component: EmailSend,
    },
    {
        path: CONFIRMATION_ROUTE,
        component: EmailConfirmation,
    }
]

export const authRoutes = [
    // {
    //     path: DASHBOARD_ROUTE,
    //     component: Home,
    // },
    {
        path: CALENDAR_ROUTE,
        component: Calendar,
    },
    {
        path: TASKS_ROUTE,
        component: Tasks
    },
    // {
    //     path: SETTING_ROUTE,
    //     component: Setting
    // },
    {
        path: TASKS_ROUTE + '/:id',
        component: TaskPage
    },
]
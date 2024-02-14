import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import EmailConfirmation from "../pages/EmailConfirmation";

const AppRouter = observer(() => {
    const {user} = useContext(Context);

    return (
        <Routes>
            {user.isAuth &&
                authRoutes.map(route =>
                    <Route key={route.path} path={route.path} element={<route.component />}/>
                )
            }
            {publicRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.component />}/>
            )}
            {/*<Route path='/*' element={<Navigate to='/calendar' />} />*/}
        </Routes>
    );
});

export default AppRouter;
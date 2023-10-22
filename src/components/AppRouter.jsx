import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes} from "../routes";

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.component />}/>
            )}
            <Route path='/*' element={<Navigate to='/calendar' />} />
        </Routes>
    );
};

export default AppRouter;
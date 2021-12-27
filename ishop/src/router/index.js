import React from 'react';
import { authRoutes, publicRoutes } from './routes';
import { Routes, Route,Navigate } from "react-router";
import {DESK_ROUTE, USER_ROUTE} from "../constants";




export const AppRouter = () => {
    // const user = useSelector(getUser, shallowEqual);
    // const isAuth = user.isAuth;
    const isAuth=true;
    return (
        <Routes>
            {  authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path}
                       element={
                           isAuth ?
                               Component
                               :
                               <Navigate replace to={DESK_ROUTE}/>
                       }
                       exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path}
                       element={
                           (isAuth && (path===USER_ROUTE))?
                               <Navigate replace to={DESK_ROUTE}/>
                               :
                           Component
                       } exact />
            )}
            <Route path={"*"} element={<Navigate replace to={DESK_ROUTE} />} />
              
        </Routes>
    )
}


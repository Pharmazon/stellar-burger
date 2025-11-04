import React from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Page404NotFound from "./pages/page-404-not-found/page-404-not-found";
import PageHome from "./pages/page-home/page-home";
import {
    FORGOT_PASSWORD_PATH,
    HOME_PATH,
    INGREDIENT_PATH,
    LOGIN_PATH,
    PROFILE_PATH,
    REGISTER_PATH,
    RESET_PASSWORD_PATH
} from "./utils/constants";
import PageLogin from "./pages/page-login/page-login";
import PageForgotPassword from "./pages/page-forgot-password/page-forgot-password";
import PageResetPassword from "./pages/page-reset-password/page-reset-password";
import PageRegister from "./pages/page-register/page-register";
import PageIngredientInfo from "./pages/page-ingredient-info/page-ingredient-info";
import PageProfile from "./pages/page-profile/page-profile";
import ProfileInfo from "./components/profile/profile-info";
import ProtectedRouteElement from "./components/route/protected-route-element";
import PublicRouteElement from "./components/route/public-route-element";

const App = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path={HOME_PATH}
                        element={<ProtectedRouteElement target={<PageHome/>}/>}
                    />
                    <Route
                        path={INGREDIENT_PATH}
                        element={<ProtectedRouteElement target={<PageIngredientInfo/>}/>}
                    />
                    <Route
                        path={PROFILE_PATH}
                        element={<ProtectedRouteElement target={<PageProfile/>}/>}
                    >
                        <Route index element={<ProfileInfo/>}/>
                    </Route>
                    <Route
                        path={LOGIN_PATH}
                        element={<PublicRouteElement target={<PageLogin/>}/>}
                    />
                    <Route
                        path={REGISTER_PATH}
                        element={<PublicRouteElement target={<PageRegister/>}/>}
                    />
                    <Route
                        path={FORGOT_PASSWORD_PATH}
                        element={<PublicRouteElement target={<PageForgotPassword/>}/>}
                    />
                    <Route
                        path={RESET_PASSWORD_PATH}
                        element={<PublicRouteElement target={<PageResetPassword/>}/>}
                    />
                    <Route
                        path='*'
                        element={<Page404NotFound/>}
                    />
                </Routes>
            </BrowserRouter>
        </DndProvider>
    );
}

export default App;

import {Route, Routes, useLocation} from "react-router-dom";
import {
    ANY_PATH,
    FORGOT_PASSWORD_PATH,
    HOME_PATH,
    INGREDIENT_PATH,
    LOGIN_PATH,
    PROFILE_PATH,
    REGISTER_PATH,
    RESET_PASSWORD_PATH
} from "../../utils/constants";
import PageHome from "../../pages/page-home/page-home";
import PageIngredientInfo from "../../pages/page-ingredient-info/page-ingredient-info";
import ProtectedRouteElement from "../route/protected-route-element";
import PageProfile from "../../pages/page-profile/page-profile";
import ProfileInfo from "../profile/profile-info";
import OrdersHistory from "../../pages/page-profile/order-history";
import PageLogin from "../../pages/page-login/page-login";
import PageRegister from "../../pages/page-register/page-register";
import PageForgotPassword from "../../pages/page-forgot-password/page-forgot-password";
import PageResetPassword from "../../pages/page-reset-password/page-reset-password";
import Page404NotFound from "../../pages/page-404-not-found/page-404-not-found";
import React from "react";

const AppContent = () => {

    const location = useLocation();
    const background = location.state?.background

    return (
        <>
            <Routes location={background || location}>
                <Route
                    path={HOME_PATH}
                    element={<PageHome/>}
                />
                <Route
                    path={INGREDIENT_PATH}
                    element={<PageIngredientInfo/>}
                />
                <Route
                    path={PROFILE_PATH}
                    element={<ProtectedRouteElement anonymous={false} target={<PageProfile/>}/>}
                >
                    <Route index element={<ProfileInfo/>}/>
                    <Route path='orders' element={<OrdersHistory/>}/>
                </Route>
                <Route
                    path={LOGIN_PATH}
                    element={<ProtectedRouteElement anonymous={true} target={<PageLogin/>}/>}
                />
                <Route
                    path={REGISTER_PATH}
                    element={<ProtectedRouteElement anonymous={true} target={<PageRegister/>}/>}
                />
                <Route
                    path={FORGOT_PASSWORD_PATH}
                    element={<ProtectedRouteElement anonymous={true} target={<PageForgotPassword/>}/>}
                />
                <Route
                    path={RESET_PASSWORD_PATH}
                    element={<ProtectedRouteElement anonymous={true} target={<PageResetPassword/>}/>}
                />
                <Route
                    path={ANY_PATH}
                    element={<Page404NotFound/>}
                />
            </Routes>

            {background && (
                <Routes>
                    <Route path={INGREDIENT_PATH} element={<PageIngredientInfo/>}/>
                </Routes>
            )}

        </>
    )
}

export default AppContent;
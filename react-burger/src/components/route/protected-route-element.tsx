import {useAppSelector} from "../../services/store";
import {Navigate, useLocation} from 'react-router-dom';
import {ReactElement} from "react";
import Preloader from "../preloader/preloader";
import {HOME_PATH, LOGIN_PATH} from "../../utils/constants";

interface IProtectedRouteElementProps {
    target: ReactElement,
    anonymous?: boolean
}

const ProtectedRouteElement = ({target, anonymous = false}: IProtectedRouteElementProps) => {

    const user = useAppSelector((store) => store.user);
    const location = useLocation();

    const from = location.state?.from || HOME_PATH;

    if ('loading' === user.status) {
        return <Preloader/>;
    }

    // Если не требуется авторизация, а пользователь авторизован...
    if (anonymous && user.isLoggedIn) {
        // ...то отправляем его на предыдущую страницу
        return <Navigate to={from}/>;
    }

    // Если требуется авторизация, а пользователь не авторизован...
    if (!anonymous && !user.isLoggedIn) {
        // ...то отправляем его на страницу логин
        return <Navigate to={LOGIN_PATH} state={{from: location}}/>;
    }

    // Если все ок, то рендерим внутреннее содержимое
    return target;
}

export default ProtectedRouteElement;
import {useAppSelector} from "../../services/store";
import {LOGIN_PATH} from "../../utils/constants";
import {Navigate} from 'react-router-dom';
import {ReactElement} from "react";
import Preloader from "../preloader/preloader";

interface ProtectedRouteElementProps {
    target: ReactElement
}

const ProtectedRouteElement = ({target}: ProtectedRouteElementProps) => {

    const user = useAppSelector((state) => state.user);

    if ('loading' === user.status) {
        return <Preloader/>;
    }

    if (!user.isLoggedIn) {
        return <Navigate to={LOGIN_PATH} replace/>;
    }

    return target;
};

export default ProtectedRouteElement;
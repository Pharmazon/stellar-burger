import {useAppDispatch} from "../../services/store";
import React, {ReactElement} from "react";
import {useNavigate} from "react-router-dom";
import {LOGIN_PATH, LOGOUT_PATH} from "../../utils/constants";
import {logout} from "../../services/slice/user-slice";
import tokens from "../../utils/token";

interface ILogoutProps {
    children: ReactElement;
}

const Logout = ({children}: ILogoutProps) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        let token = tokens.getRefreshToken();
        if (token) {
            await dispatch(logout());
        }
        navigate(LOGIN_PATH, {replace: true});
    };
    return (
        <a
            href={LOGOUT_PATH}
            onClick={handleLogout}
            className={'mt-4 mb-4'}
            style={{textDecoration: 'none'}}
        >
            {children}
        </a>
    );
};

export default Logout;
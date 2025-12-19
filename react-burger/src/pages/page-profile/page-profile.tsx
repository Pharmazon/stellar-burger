import styles from './page-profile.module.css';
import {Link, Outlet, useLocation} from "react-router-dom";
import {BASE_WSS_URL, PROFILE_ORDERS_PATH, PROFILE_PATH} from "../../utils/constants";
import Logout from "../../components/logout/logout";
import {useEffect} from "react";
import {useAppDispatch} from "../../services/store";
import {connect, disconnect} from "../../services/slice/actions";
import tokens from "../../utils/token";
import {CySelector} from "../../utils/selectors";

const PageProfile = () => {

    const location = useLocation();
    const dispatch = useAppDispatch();

    const isActive = (path: string) => location.pathname === path;

    const getClassName = (path: string) => {
        return `text text_type_main-medium ${isActive(path)
            ? ''
            : 'text_color_inactive'
        }`.trim();
    };

    useEffect(() => {
        if (location.pathname !== PROFILE_ORDERS_PATH) {
            return
        }

        const wssUrl = new URL(`${BASE_WSS_URL}orders`)
        const token = tokens.getAccessToken();
        if (!token) {
            console.error("Токен протух");
            return
        }
        wssUrl.searchParams.set('token', token.replace('Bearer ', ''));
        dispatch(connect(wssUrl.toString()));

        return () => {
            dispatch(disconnect());
        };
    }, [dispatch, location]);

    return (
        <div className={`${styles.body} pl-5`}>
            <div className={`${styles.container} pt-15`}>
                <div className={styles.menu}>
                    <Link to={PROFILE_PATH} className={`${styles.link} mt-4 mb-4`}>
                        <p className={getClassName(PROFILE_PATH)}>Профиль</p>
                    </Link>
                    <Link to={PROFILE_ORDERS_PATH} className={`${styles.link} mt-4 mb-4`}>
                        <p className={getClassName(PROFILE_ORDERS_PATH)}>История заказов</p>
                    </Link>
                    <Logout>
                        <p
                            data-test={CySelector.LOGOUT_LINK}
                            className={'text text_type_main-medium text_color_inactive'}
                        >Выход</p>
                    </Logout>
                    <p
                        className={`${styles.opacity} pt-20 text text_type_main-small text_color_inactive`}
                    >
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};

export default PageProfile;
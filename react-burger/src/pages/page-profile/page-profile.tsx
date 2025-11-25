import styles from './page-profile.module.css';
import {Link, Outlet, useLocation} from "react-router-dom";
import {PROFILE_ORDERS_PATH, PROFILE_PATH} from "../../utils/constants";
import Logout from "../../components/logout/logout";
import {useEffect} from "react";
import {useAppDispatch} from "../../services/store";
import {WS_CONNECTION_CLOSE, WS_CONNECTION_START} from "../../services/middleware/socket-middleware";

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
        if (location.pathname === PROFILE_ORDERS_PATH) {
            dispatch({
                type: WS_CONNECTION_START,
                payload: {
                    isPrivate: true,
                    path: 'orders'
                }
            });
            return () => {
                dispatch({type: WS_CONNECTION_CLOSE});
            };
        }
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
                        <p className={'text text_type_main-medium text_color_inactive'}>Выход</p>
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
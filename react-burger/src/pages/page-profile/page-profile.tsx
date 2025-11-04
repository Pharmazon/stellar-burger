import styles from './page-profile.module.css';
import AppHeader from "../../components/app-header/app-header/app-header";
import {Link, Outlet} from "react-router-dom";
import {PROFILE_PATH} from "../../utils/constants";
import Logout from "../../components/logout/logout";

const PageProfile = () => {

    return (
        <>
            <AppHeader/>
            <div className='pt-30'>
                <div className={styles.container}>
                    <div className={styles.menu}>
                        <Link to={PROFILE_PATH} className={`${styles.link} mt-4 mb-4`}>
                            <p className={'text text_type_main-medium'}>Профиль</p>
                        </Link>
                        <p className={'text text_type_main-medium text_color_inactive'}>История заказов</p>
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
        </>
    );
};

export default PageProfile;
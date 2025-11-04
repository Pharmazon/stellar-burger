import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useMemo} from "react";
import styles from './app-header.module.css';
import AppHeaderCard from "../app-header-card/app-header-card";
import {Link} from "react-router-dom";
import {HOME_PATH, PROFILE_PATH} from "../../../utils/constants";
import {useAppSelector} from "../../../services/store";

const AppHeader = () => {

    const user = useAppSelector((state) => state.user);

    const getIconType = useMemo(() => {
        return user.isLoggedIn
            ? 'primary'
            : 'secondary';
    }, [user.isLoggedIn]);
    
    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <div className={`${styles.left_group}`}>
                    {
                        user.isLoggedIn && (
                            <>
                                <Link to={HOME_PATH} className={styles.link}>
                                    <AppHeaderCard
                                        iconComponent={<BurgerIcon type={getIconType}/>}
                                        text={'Конструктор'}
                                    />
                                </Link>
                                <div className={'text_color_inactive'}>
                                    <AppHeaderCard
                                        iconComponent={<ListIcon type={getIconType}/>}
                                        text={'Лента заказов'}
                                    />
                                </div>
                            </>
                        )
                    }
                </div>

                <Link to={HOME_PATH} className={styles.link}>
                    <Logo className={styles.logo}/>
                </Link>

                <div className={styles.right_item}>
                    {
                        user.isLoggedIn && (
                            <Link to={PROFILE_PATH} className={styles.link}>
                                <AppHeaderCard
                                    iconComponent={<ProfileIcon type={getIconType}/>}
                                    text={'Личный кабинет'}
                                />
                            </Link>
                        )
                    }
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
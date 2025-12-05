import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useMemo} from "react";
import styles from './app-header.module.css';
import AppHeaderCard from "../app-header-card/app-header-card";
import {Link, NavLink} from "react-router-dom";
import {ElementState, FEED_PATH, HOME_PATH, PROFILE_PATH} from "../../../utils/constants";
import {useAppSelector} from "../../../services/store";

const AppHeader = () => {

    const user = useAppSelector((state) => state.user);

    const getIconType = useMemo(() => {
        return user.isLoggedIn
            ? ElementState.PRIMARY
            : 'secondary';
    }, [user.isLoggedIn]);
    
    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <div className={`${styles.left_group}`}>
                    <NavLink
                        to={HOME_PATH}
                        className={({isActive}) => (isActive ? styles.link_active : styles.link)}
                    >
                        <AppHeaderCard
                            iconComponent={<BurgerIcon type={getIconType}/>}
                            text={'Конструктор'}
                        />
                    </NavLink>
                    <NavLink
                        to={FEED_PATH}
                        className={({isActive}) => (isActive ? styles.link_active : styles.link)}
                    >
                        <AppHeaderCard
                            iconComponent={<ListIcon type={getIconType}/>}
                            text={'Лента заказов'}
                        />
                    </NavLink>
                </div>

                <Link to={HOME_PATH} className={styles.link}>
                    <Logo className={styles.logo}/>
                </Link>

                <div className={styles.right_item}>
                    <NavLink
                        to={PROFILE_PATH}
                        className={({isActive}) => (isActive ? styles.link_active : styles.link)}
                    >
                        <AppHeaderCard
                            iconComponent={<ProfileIcon type={getIconType}/>}
                            text={'Личный кабинет'}
                        />
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
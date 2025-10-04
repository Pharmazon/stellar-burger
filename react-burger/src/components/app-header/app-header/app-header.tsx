import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from './app-header.module.css';
import AppHeaderCard from "../app-header-card/app-header-card";

class AppHeader extends React.Component {
    
    render() {
        return (
            <header className={styles.header} >
                <div className={styles.header_container}>
                    <div className={`${styles.left_group}`}>
                        <AppHeaderCard 
                            iconComponent={<BurgerIcon type={'primary'}/>} 
                            text={'Конструктор'}
                            enabled={true}
                        />
                        <AppHeaderCard 
                            iconComponent={<ListIcon type={'secondary'} />} 
                            text={'Лента заказов'}
                            enabled={false}
                        />
                    </div>
                    
                    <Logo className={styles.center_item}/>
                    
                    <div className={styles.right_item}>
                        <AppHeaderCard
                            iconComponent={<ProfileIcon type={'secondary'} />}
                            text={'Личный кабинет'}
                            enabled={false}
                        />
                    </div>
                </div>
            </header>
        );
    }
}

export default AppHeader;
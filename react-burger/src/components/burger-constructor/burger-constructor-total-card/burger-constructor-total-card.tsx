import React from "react";
import styles from './burger-constructor-total-card.module.css';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface BurgerConstructorTotalCardProps {
    total: number;
}

class BurgerConstructorTotalCard extends React.Component<BurgerConstructorTotalCardProps> {
    
    render() {
        return (
            <div className={`${styles.total_container} ml-4 mt-10`}>
                <div className={styles.total_currency}>
                    <div className={'text text_type_digits-medium mr-3'}>{this.props.total}</div>
                    <div className={styles.currency_icon}>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
                <div className={'ml-10'}>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                    >
                        Оформить заказ
                    </Button>
                </div>
            </div>
        );
    }
}

export default BurgerConstructorTotalCard;
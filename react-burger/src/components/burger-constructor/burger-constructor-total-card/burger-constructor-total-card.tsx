import React from "react";
import styles from './burger-constructor-total-card.module.css';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../../modal/order-details/order-details";

interface BurgerConstructorTotalCardProps {
    total: number;
}

interface BurgerConstructorTotalCardState {
    isModalOpened: boolean;
}

class BurgerConstructorTotalCard extends React.Component<BurgerConstructorTotalCardProps, BurgerConstructorTotalCardState> {

    constructor(props: BurgerConstructorTotalCardProps) {
        super(props);
        this.state = {
            isModalOpened: false
        };
    }

    handleOpenModal = () => this.setState({ isModalOpened: true });
    handleCloseModal = () => this.setState({ isModalOpened: false });
    
    render() {
        return (
            <div className={`${styles.total_container} ml-4 mt-10`}>
                <div className={styles.total_currency}>
                    <span className={'text text_type_digits-medium mr-3'}>{this.props.total}</span>
                    <div className={styles.currency_icon}>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
                <div className={'ml-10'}>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={this.handleOpenModal}
                    >
                        Оформить заказ
                    </Button>
                </div>
                
                <OrderDetails 
                    isModalOpened={this.state.isModalOpened} 
                    onClose={this.handleCloseModal} 
                />
            </div>
        );
    }
}

export default BurgerConstructorTotalCard;
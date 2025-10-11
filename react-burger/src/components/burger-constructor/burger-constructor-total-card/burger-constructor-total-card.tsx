import React from "react";
import styles from './burger-constructor-total-card.module.css';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../../modal/order-details/order-details";
import Modal from "../../modal/modal/modal";
import {useModal} from "../../../hooks/useModal";

interface BurgerConstructorTotalCardProps {
    total: number;
}

const BurgerConstructorTotalCard = ({total}: BurgerConstructorTotalCardProps) => {

    const {isModalOpened, openModal, closeModal} = useModal();

    return (
        <div className={`${styles.total_container} ml-4 mt-10`}>
            <div className={styles.total_currency}>
                <span className={'text text_type_digits-medium mr-3'}>{total}</span>
                <div className={styles.currency_icon}>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
            <div className={'ml-10'}>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={openModal}
                >
                    Оформить заказ
                </Button>
            </div>

            {isModalOpened && (
                <Modal
                    onClose={closeModal}
                    width={720}
                    height={718}
                >
                    <OrderDetails/>
                </Modal>
            )}
        </div>
    );
}

export default BurgerConstructorTotalCard;
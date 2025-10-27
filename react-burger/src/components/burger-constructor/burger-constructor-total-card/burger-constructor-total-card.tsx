import React from "react";
import styles from './burger-constructor-total-card.module.css';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../../modal/order-details/order-details";
import Modal from "../../modal/modal/modal";
import {useModal} from "../../../hooks/useModal";
import {RootState, useAppDispatch} from "../../../services/store";
import {useSelector} from "react-redux";
import {createOrderRequest} from "../../../services/orderSlice";
import Ingredient from "../../../utils/ingredient";

interface BurgerConstructorTotalCardProps {
    total: number;
    itemsToOrder: Ingredient[]
}

const BurgerConstructorTotalCard = ({total, itemsToOrder}: BurgerConstructorTotalCardProps) => {

    const {isModalOpened, openModal, closeModal} = useModal();
    const dispatch = useAppDispatch();
    const {order, status} = useSelector((state: RootState) => state.order);

    const handleClick = async () => {
        await dispatch(createOrderRequest(itemsToOrder));
        openModal();
    };
    
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
                    onClick={handleClick}
                >
                    {'loading' === status ? 'Создаю заказ...' : 'Оформить заказ'}
                </Button>
            </div>

            {order && isModalOpened && (
                <Modal
                    onClose={closeModal}
                    width={720}
                    height={718}
                >
                    <OrderDetails orderId={order.number}/>
                </Modal>
            )}
        </div>
    );
}

export default BurgerConstructorTotalCard;
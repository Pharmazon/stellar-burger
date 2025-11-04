import React from "react";
import styles from './burger-constructor-total-card.module.css';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../../modal/order-details/order-details";
import Modal from "../../modal/modal/modal";
import {useModal} from "../../../hooks/useModal";
import {useAppDispatch, useAppSelector} from "../../../services/store";
import {createOrder} from "../../../services/order-slice";
import {clear} from "../../../services/burger-constructor-slice";
import {BurgerConstructorIngredient} from "../../../types/ingredient";

interface BurgerConstructorTotalCardProps {
    total: number;
    itemsToOrder: BurgerConstructorIngredient[]
}

const BurgerConstructorTotalCard = ({total, itemsToOrder}: BurgerConstructorTotalCardProps) => {

    const {isModalOpened, openModal, closeModal} = useModal();
    const dispatch = useAppDispatch();
    const {order, status} = useAppSelector((state) => state.order);

    const handleClick = async () => {
        await dispatch(createOrder({ingredients: itemsToOrder.map(item => item.item._id)}));
        openModal();
    };

    const closeModalWithClear = () => {
        dispatch(clear());
        closeModal();
    }
    
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
                    onClose={closeModalWithClear}
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
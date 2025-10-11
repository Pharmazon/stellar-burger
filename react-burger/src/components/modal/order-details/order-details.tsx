import React from "react";
import styles from './order-details.module.css';
import orderSuccessIcon from "../../../images/order-success.png";

const OrderDetails = () => {

    const generateRandomNumber = () => {
        const randomNum = Math.floor(Math.random() * 1000000);
        return randomNum.toString().padStart(6, '0');
    };

    return (
        <>
            <span className={`${styles.element_header} text text_type_digits-large mb-8`}>
                {generateRandomNumber()}
            </span>
            <span className={`${styles.element} mb-15 text text_type_main-medium`}>
                    идентификатор заказа
                </span>
            <div className={`mb-15`}>
                <img
                    src={orderSuccessIcon}
                    alt={'Заказ успешно оформлен'}
                    width={120}
                    height={120}
                />
            </div>
            <span className={`${styles.element} mb-2 text text_type_main-default`}>
                    Ваш заказ начали готовить
                </span>
            <span className={`${styles.element} mb-30 text text_type_main-default text_color_inactive`}>
                    Дождитесь готовности на орбитальной станции
                </span>
        </>
    );

}

export default OrderDetails;
import React from "react";
import styles from './order-details.module.css';
import orderSuccessIcon from "../../../images/order-success.png";
import Modal from "../modal/modal";

interface OrderDetailsProps {
    isModalOpened: boolean
    onClose: () => void
}

class OrderDetails extends React.Component<OrderDetailsProps> {

    private generateRandomNumber(){
        const randomNum = Math.floor(Math.random() * 1000000);
        return randomNum.toString().padStart(6, '0');
    };
    
    render() {

        return (
            <Modal 
                width={720} 
                height={718}
                isModalOpened={this.props.isModalOpened}
                onClose={this.props.onClose}
            >
                <span className={`${styles.element_header} text text_type_digits-large mb-8`}>
                    {this.generateRandomNumber()}
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
            </Modal>
        );
    }
}

export default OrderDetails;
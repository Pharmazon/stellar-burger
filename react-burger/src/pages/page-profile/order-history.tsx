import styles from "./order-history.module.css";
import error404Image from '../../assets/error-404.png';

const OrdersHistory = () => {
    return (
        <div className={styles.block}>
            <img alt='Страница не найдена' src={error404Image} width={200} height={200}/>
        </div>
    );
};

export default OrdersHistory;
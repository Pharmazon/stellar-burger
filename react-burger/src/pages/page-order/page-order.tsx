import {useLocation, useNavigate, useParams} from 'react-router-dom';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../services/store";
import {getOrder, setOrderInfo} from "../../services/slice/order-slice";
import OrderInfo from "../../components/order-info/order-info";
import Modal from "../../components/modal/modal/modal";
import {deselect} from "../../services/slice/ingredient-details-slice";
import styles from './page-order.module.css';

const PageOrder = () => {

    const {number} = useParams();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const publicFeedData = useAppSelector((state) => state.publicFeed.data);
    const order = useAppSelector((state) => state.order.orderInfo);

    const orderNumber = Number(number);
    const isModal = !!location.state?.background;

    useEffect(() => {
        if (order || !number) {
            return;
        }

        const foundOrder = publicFeedData?.orders?.find(
            (order) => order.number === orderNumber
        );

        if (foundOrder) {
            dispatch(setOrderInfo(foundOrder));
        } else {
            dispatch(getOrder(orderNumber));
        }
    }, [order, number, orderNumber, publicFeedData?.orders, dispatch]);

    const handleCloseModal = () => {
        dispatch(deselect());
        navigate(-1);
    }

    if (!order) {
        return <div>Нет данных по указанному заказу</div>;
    }

    if (isModal) {
        return (
            <Modal
                onClose={handleCloseModal}
                width={720}
                height={718}
            >
                <OrderInfo order={order}/>
            </Modal>
        );
    }

    return (
        <div className={`pt-20 ${styles.container}`}>
            <OrderInfo order={order}/>
        </div>
    );
};

export default PageOrder;
import styles from './feed-orders.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useEffect} from 'react';
import {useModal} from "../../../hooks/useModal";
import {clearOrder, setOrderInfo} from "../../../services/slice/order-slice";
import {useAppDispatch, useAppSelector} from "../../../services/store";
import {IFeedOrder} from "../../../types/feedOrder";
import Modal from "../../modal/modal/modal";
import OrderInfo from "../../order-info/order-info";
import {
    ElementState,
    FEED_MAX_VISIBLE_INGREDIENTS,
    FEED_NUMBER_PATH,
    FeedOrderStatus,
    LOGIN_PATH,
    PROFILE_ORDERS_NUMBER_PATH,
    PROFILE_ORDERS_PATH
} from "../../../utils/constants";
import {calculateOrderTotal, getFormattedDate} from "../../../utils/order";
import {useLocation, useNavigate} from "react-router-dom";

interface IFeedOrdersProps {
    isPrivate: boolean
    title?: string
}

export const FeedOrders = ({isPrivate, title}: IFeedOrdersProps) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {isModalOpened, closeModal} = useModal();
    const {items} = useAppSelector((state) => state.burgerIngredients);
    const order = useAppSelector((state) => state.order.orderInfo);
    const publicFeedData = useAppSelector((state) => state.publicFeed.data)
    const privateFeedData = useAppSelector((state) => state.privateFeed.data)
    const isUserLoggedIn = useAppSelector((store) => store.user.isLoggedIn);

    const feedData = isPrivate ? privateFeedData : publicFeedData;

    useEffect(() => {
        if (!isUserLoggedIn && isPrivate) {
            navigate(LOGIN_PATH);
        }
    }, [isPrivate, isUserLoggedIn, navigate]);

    const handleClick = (order: IFeedOrder) => {
        dispatch(setOrderInfo(order));
        let path = location.pathname === PROFILE_ORDERS_PATH ? PROFILE_ORDERS_NUMBER_PATH : FEED_NUMBER_PATH;
        navigate(path.replace(':number', String(order.number)), {state: {background: location}});
    };

    const handleClose = () => {
        closeModal();
        dispatch(clearOrder());
    };

    const getIngredientsStack = (order: IFeedOrder) => {
        if (!items) {
            return
        }

        const uniqueIngredients = new Set(order.ingredients);
        const orderIngredients = Array.from(uniqueIngredients).map(id =>
            items.find((ing) => ing._id === id)
        );

        const hasOverflow = orderIngredients.length > FEED_MAX_VISIBLE_INGREDIENTS;
        const visibleIngredients = orderIngredients.slice(0, FEED_MAX_VISIBLE_INGREDIENTS);
        const overflowCount = orderIngredients.length - FEED_MAX_VISIBLE_INGREDIENTS;

        return (
            <div className={styles.row_flex}>
                <div className={styles.imageStack}>
                    {visibleIngredients &&
                        visibleIngredients.map((ingredient, index) => (
                            <div
                                className={styles.imageWrapper}
                                key={index}
                                style={{left: `${index * 40}px`}}
                            >
                                <img
                                    className={styles.imageWrapper_img}
                                    src={ingredient?.image}
                                    alt={`ingredient-${index}`}
                                />
                            </div>
                        ))}
                    {hasOverflow && (
                        <div
                            className={styles.imageWrapper}
                            style={{left: `${FEED_MAX_VISIBLE_INGREDIENTS * 40 + 20}px`}}
                        >
                            <img
                                className={`${styles.imageWrapper_img} ${styles.imageWrapper_img_overflow}`}
                                src={orderIngredients[FEED_MAX_VISIBLE_INGREDIENTS]?.image}
                                alt='overflow'
                            />
                            <span className={styles.overflowText}>+{overflowCount}</span>
                        </div>
                    )}
                </div>
                <div className={styles.order_cost}>
                    <p className='text text_type_digits-default'>
                        {calculateOrderTotal(order, items) || ''}
                    </p>
                    <CurrencyIcon type={ElementState.PRIMARY}/>
                </div>
            </div>
        );
    };

    const getOrderStatus = (order: IFeedOrder) => {
        if (order.status === FeedOrderStatus.CREATED) {
            return <p className={'text text_type_main-small'}>Создан</p>;
        } else if (order.status === FeedOrderStatus.PENDING) {
            return <p className={'text text_type_main-small'}>Готовится</p>;
        } else
            return (
                <p className={'text text_type_main-small'} style={{color: '#00CCCC'}}>
                    Готов
                </p>
            );
    };

    return (
        <>
            <div className={styles.container}>
                {title &&
                    <p className={'pt-10 pb-10 text text_type_main-large'}>{title}</p>
                }
                {feedData && (
                    <ul className={styles.orders}>
                        {feedData.orders?.slice()
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((order, index) => (
                                <li
                                    className={styles.order}
                                    key={index}
                                    onClick={() => handleClick(order)}>
                                    <div className={styles.order_element_flex}>
                                        <div className={styles.row_flex}>
                                            <p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
                                            <p className={'text text_type_main-default text_color_inactive'}>
                                                {getFormattedDate(order.createdAt)}
                                            </p>
                                        </div>
                                        <p className={'text text_type_main-medium'}>{order.name}</p>
                                        {getOrderStatus(order)}
                                        {getIngredientsStack(order)}
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
            {order && isModalOpened && (
                <Modal
                    onClose={handleClose}
                    width={720}
                    height={718}
                >
                    <OrderInfo order={order}/>
                </Modal>
            )}
        </>
    );
};

export default FeedOrders;

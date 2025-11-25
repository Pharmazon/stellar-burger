import styles from './order-info.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useAppSelector} from "../../services/store";
import {IFeedOrder} from "../../types/feedOrder";
import {ElementState, FeedOrderStatus, IngredientSection} from "../../utils/constants";
import {calculateOrderTotal, getFormattedDate} from "../../utils/order";
import {useMemo} from "react";

interface IOrderInfoProps {
    order: IFeedOrder;
}

const OrderInfo = ({order}: IOrderInfoProps) => {

    const {items} = useAppSelector((state) => state.burgerIngredients);

    const getStatusText = (order: IFeedOrder) => {
        if (order.status === FeedOrderStatus.CREATED) {
            return <p className={'pt-3 text text_type_main-small'}>Создан</p>;
        } else if (order.status === FeedOrderStatus.PENDING) {
            return <p className={'pt-3 text text_type_main-small'}>Готовится</p>;
        } else
            return (
                <p
                    className={'pt-3 text text_type_main-small'}
                    style={{color: '#00CCCC'}}>
                    Выполнен
                </p>
            );
    };

    const ingredientCounts = useMemo(() => {
        const counts = new Map<string, number>();
        for (const ingredient of order.ingredients) {
            counts.set(ingredient, (counts.get(ingredient) || 0) + 1);
        }
        return counts;
    }, [order.ingredients]);

    const getIngredientsList = () => {
        if (items == null) {
            return
        }

        return (
            <ul className={styles.ingredient_container}>
                {Array.from(ingredientCounts).map(([id, count]) => {
                    const ingredient = items.find((ing) => ing._id === id);
                    return (
                        <li
                            className={styles.ingredient_element}
                            key={`order-ingredient-${id}`}
                        >
                            <div className={styles.image}>
                                <img
                                    className={styles.image_img}
                                    src={ingredient?.image}
                                    alt={`ingredient-order-${id}`}
                                />
                            </div>
                            <p
                                className={'text text_type_main-default'}
                                style={{flex: 1}}>
                                {ingredient?.name}
                            </p>
                            <p className={'text text_type_digits-default'}>
                                {ingredient?.type === IngredientSection.BUN
                                    ? `2 x ${ingredient.price}`
                                    : `${count} x ${ingredient?.price}`}
                            </p>
                            {<CurrencyIcon type={ElementState.PRIMARY}/>}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <p className={'text text_type_digits-medium'}>#{order.number}</p>
                <p className={'pt-7 text text_type_main-medium'}>{order.name}</p>
                {getStatusText(order)}
                <p className={'pt-7 pb-6 text text_type_main-medium'}>Состав:</p>
                {getIngredientsList()}
                <div className={`pt-10 ${styles.footer}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>
                        {getFormattedDate(order.createdAt)}
                    </p>
                    <p className={'text text_type_digits-default'}>
                        {calculateOrderTotal(order, items)}
                        {<CurrencyIcon type={ElementState.PRIMARY}/>}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderInfo;
import styles from './feed-info.module.css';
import {useAppSelector} from "../../../services/store";
import {FeedOrderStatus} from "../../../utils/constants";

interface IFeedColumnProps {
    orderNumbers: ReadonlyArray<number>;
    title: string;
    orderDone?: boolean;
}

interface ICounterBlockProps {
    title: string;
    count: number;
}

const FeedInfo = () => {

    const {data} = useAppSelector((state) => state.publicFeed);

    const FeedElement = ({orderNumbers, title, orderDone = false}: IFeedColumnProps) => {
        return (
            <div className={styles.info_column}>
                <h3 className={'text text_type_main-medium'}>{title}:</h3>
                <ul className={`pt-6  ${styles.info_list}`}>
                    {orderNumbers.map((item, index) => (
                        <li
                            className={'text text_type_digits-default'}
                            style={{color: orderDone ? '#00cccc' : '#F2F2F3'}}
                            key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const CounterElement = ({title, count}: ICounterBlockProps) => {
        return (
            <div>
                <h3 className={`text text_type_main-medium`}>{title}:</h3>
                <p className={`text text_type_digits-large ${styles.glow_effect}`}>{count}</p>
            </div>
        );
    };

    const doneOrders: ReadonlyArray<number> = data?.orders
        ?.filter((order) => FeedOrderStatus.DONE === order.status)
        .map((order) => order.number)
        .slice(0, 16) || [];

    const pendingOrders: ReadonlyArray<number> = data?.orders
        .filter((order) => FeedOrderStatus.PENDING === order.status)
        .map((order) => order.number)
        .slice(0, 16) || [];

    if (!data || data.total === undefined || data.totalToday === undefined) {
        return null;
    }

    return (
        <div className={styles.section}>
            <div className={styles.info_columns}>
                <FeedElement
                    orderNumbers={doneOrders}
                    title={'Готовы'}
                    orderDone={true}
                />
                <FeedElement
                    orderNumbers={pendingOrders}
                    title={'В работе'}
                />
            </div>
            <CounterElement
                title={'Выполнено за все время'}
                count={data?.total}
            />
            <CounterElement
                title={'Выполнено за сегодня'}
                count={data?.totalToday}
            />
        </div>
    );
};

export default FeedInfo;
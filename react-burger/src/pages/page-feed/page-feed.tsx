import {useAppDispatch, useAppSelector} from "../../services/store";
import styles from './page-feed.module.css';
import FeedOrders from "../../components/feed/feed-orders/feed-orders";
import FeedInfo from "../../components/feed/feed-info/feed-info";
import React, {useEffect} from "react";
import {connect, disconnect} from "../../services/slice/actions";
import Preloader from "../../components/preloader/preloader";
import {BASE_WSS_URL} from "../../utils/constants";

const PageFeed = () => {

    const dispatch = useAppDispatch();
    const isSocketLoading = useAppSelector((state) => state.socket.isLoading)

    useEffect(() => {
        dispatch(connect(`${BASE_WSS_URL}orders/all`));

        return () => {
            dispatch(disconnect());
        };
    }, [dispatch]);

    if (isSocketLoading) {
        return <Preloader/>;
    }

    return (
        <div className={styles.body}>
            <div className={`${styles.container} pl-5`}>
                <FeedOrders isPrivate={false} title={'Лента заказов'}/>
                <FeedInfo/>
            </div>
        </div>
    );
};

export default PageFeed;

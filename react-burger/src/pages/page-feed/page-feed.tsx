import {useAppDispatch, useAppSelector} from "../../services/store";
import styles from './page-feed.module.css';
import FeedOrders from "../../components/feed/feed-orders/feed-orders";
import FeedInfo from "../../components/feed/feed-info/feed-info";
import React, {useEffect} from "react";
import {WS_CONNECTION_CLOSE, WS_CONNECTION_START} from "../../services/middleware/socket-middleware";
import Preloader from "../../components/preloader/preloader";

const PageFeed = () => {

    const dispatch = useAppDispatch();
    const isSocketLoading = useAppSelector((state) => state.socket.isLoading)

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: {
                isPrivate: false,
                path: 'orders/all'
            } 
        });
        return () => {
            dispatch({type: WS_CONNECTION_CLOSE});
        };
    }, [dispatch]);

    if (isSocketLoading) {
        return <Preloader/>;
    }

    return (
        <div className={styles.body}>
            <div className={`${styles.container} pl-5`}>
                <FeedOrders isPrivate={false}/>
                <FeedInfo/>
            </div>
        </div>
    );
};

export default PageFeed;

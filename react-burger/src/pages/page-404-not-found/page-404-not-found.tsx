import styles from './page-404-not-found.module.css';
import {Link} from 'react-router-dom';
import error404Image from '../../assets/error-404.png';
import {HOME_PATH} from "../../utils/constants";

const Page404NotFound = () => {
    return (
        <div className={`${styles.container} pt-30`}>
            <img alt='Страница не найдена' src={error404Image} width={200} height={200}/>
            <p className={'text text_type_main-medium'}>Не удалось найти страницу. Ее нет =(</p>
            <div className={styles.item}>
                <Link to={HOME_PATH}>
                    <p className={'text text_type_main-default text_color_inactive'}>Вернуться</p>
                </Link>
            </div>
        </div>
    );
};

export default Page404NotFound;

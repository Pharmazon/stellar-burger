import styles from "./preloader.module.css";

const Preloader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}></div>
            <p>Загрузка...</p>
        </div>
    );
};

export default Preloader;
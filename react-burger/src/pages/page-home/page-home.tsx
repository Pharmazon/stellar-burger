import styles from "./page-home.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor/burger-constructor";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {useEffect} from "react";
import {getUserDetails} from "../../services/user-slice";

const PageHome = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const {items} = useAppSelector((state) => state.burgerIngredients);

    useEffect(() => {
        if (user.isLoggedIn && !user.user) {
            dispatch(getUserDetails());
        }
    }, [user.isLoggedIn, user.user, dispatch]);

    return (
        <main className={styles.body}>
            <div className={styles.body_container}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </div>
        </main>
    );
};

export default PageHome;

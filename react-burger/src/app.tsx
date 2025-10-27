import React from 'react';
import AppHeader from "./components/app-header/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor/burger-constructor";
import styles from "./app.module.css";

const App = () => {
    return (
        <div>
            <AppHeader/>
            <main className={styles.body}>
                <div className={styles.body_container}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </div>
            </main>
        </div>
    );
}

export default App;

import React from 'react';
import AppHeader from "./components/app-header/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor/burger-constructor";
import styles from "./app.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend';

const App = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <AppHeader/>
                <main className={styles.body}>
                    <div className={styles.body_container}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </div>
                </main>
            </div>
        </DndProvider>
    );
}

export default App;

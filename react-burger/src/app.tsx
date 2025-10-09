import React, {useEffect, useState} from 'react';
import AppHeader from "./components/app-header/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor/burger-constructor";
import styles from "./app.module.css";
import {BACKEND_URL} from "./utils/constants";
import Ingredient from "./utils/ingredient";

const App = () => {
    
    const [isLoading, setIsLoading] = useState(false); 
    const [hasError, setHasError] = useState(false); 
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        if (ingredients.length > 0 || isLoading) {
            return;
        }

        let isMounted = true;

        setIsLoading(true);
        setHasError(false);

        const getIngredientsFromServer = () => {
            fetch(BACKEND_URL)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(`Ошибка ${response.status}`);
                })
                .then(response => {
                    if (!isMounted) {
                        return;
                    }
                    if (response.success) {
                        setIngredients(response.data);
                    } else {
                        throw new Error("Вернулась ошибка");
                    }
                })
                .catch(e => {
                    if (!isMounted) {
                        return;
                    }
                    setHasError(true);
                    alert(`Ошибка получения данных с сервера: ${e.message}`);
                })
                .finally(() => {
                    if (isMounted) {
                        setIsLoading(false);
                    }
                })
        }
        
        getIngredientsFromServer();

        return () => {
            isMounted = false;
        }
    }, []);

    if (isLoading) {
        return (
            <div>
                <AppHeader/>
                <main className={styles.body}>
                    <div className={styles.body_container}>
                        <div>Загрузка данных с сервера...</div>
                    </div>
                </main>
            </div>
        );
    }
    
    if (hasError) {
        return (
            <div>
                <AppHeader/>
                <main className={styles.body}>
                    <div className={styles.body_container}>
                        <div>Ошибка загрузки данных с сервера!</div>
                    </div>
                </main>
            </div>
        );
    }
    
    
    return (
        <div>
            <AppHeader/>
            <main className={styles.body}>
                <div className={styles.body_container}>
                    <BurgerIngredients ingredients={ingredients}/>
                    <BurgerConstructor ingredients={ingredients}/>
                </div>
            </main>
        </div>
    );
}

export default App;

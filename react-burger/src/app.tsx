import React from 'react';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import styles from "./app.module.css";

function App() {
  return (
      <>
          <AppHeader />
          <div className={styles.body}>
              <div className={styles.body_container}>
                  <BurgerIngredients />
                  <BurgerConstructor />
              </div>
          </div>
      </>
  );
}

export default App;

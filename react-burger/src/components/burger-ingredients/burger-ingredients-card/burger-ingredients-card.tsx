import React from "react";
import styles from './burger-ingredients-card.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IBurgerIngredientsBulkaProps {
    name: string;
    price: number;
    image: string;
}

class BurgerIngredientsCard extends React.Component<IBurgerIngredientsBulkaProps> {

    render() {
        return (
            <div className={`${styles.main_container} ml-4 mt-4`}>
                <div className={styles.main_icon}>
                    <img
                        src={this.props.image}
                        alt={'Picture'}
                    />
                </div>
                <div className={styles.price_block}>
                    <div className="text text_type_digits-default">{this.props.price}</div>
                    <div className="pl-2">
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <div className={`${styles.description} text text_type_main-small`}>{this.props.name}</div>
            </div>
        );
    }
}

export default BurgerIngredientsCard;
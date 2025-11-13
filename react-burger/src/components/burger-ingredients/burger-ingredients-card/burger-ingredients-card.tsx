import React from "react";
import styles from './burger-ingredients-card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IMAGE_ALT_TEXT_MAP, INGREDIENT_PATH, TIngredientId} from "../../../utils/constants";
import {IIngredient} from "../../../types/ingredient";
import {useLocation, useNavigate} from "react-router-dom";

export interface IBurgerIngredientsCardProps {
    ingredient: IIngredient;
    quantityAdded: number
}

const BurgerIngredientsCard = ({ingredient, quantityAdded}: IBurgerIngredientsCardProps) => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleOnClick = () => {
        navigate(INGREDIENT_PATH.replace(':id', ingredient._id), {state: {background: location}});
    };
    
    return (
        <div
            className={`${styles.main_container} ml-4 mt-4`}
            onClick={handleOnClick}
        >
            {quantityAdded ? (
                <div className={styles.counter}>
                    <Counter count={quantityAdded} size={'default'}></Counter>
                </div>
            ) : undefined}
            
            <div className={styles.main_icon}>
                <img
                    src={ingredient.image}
                    alt={IMAGE_ALT_TEXT_MAP[ingredient._id as TIngredientId] || ingredient.name}
                />
            </div>
            
            <div className={styles.price_block}>
                <span className="text text_type_digits-default">{ingredient.price}</span>
                <div className="pl-2">
                    <CurrencyIcon type="primary" />
                </div>
            </div>
             
            <span className={`${styles.description} text text_type_main-small`}>{ingredient.name}</span>
        </div>
    );
}

export default BurgerIngredientsCard;
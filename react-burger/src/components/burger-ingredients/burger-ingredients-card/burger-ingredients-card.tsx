import React from "react";
import styles from './burger-ingredients-card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IMAGE_ALT_TEXT_MAP, INGREDIENT_PATH, IngredientId} from "../../../utils/constants";
import {Ingredient} from "../../../types/ingredient";
import {useNavigate} from "react-router-dom";

export interface BurgerIngredientsCardProps {
    ingredient: Ingredient;
    quantityAdded: number
}

const BurgerIngredientsCard = ({ingredient, quantityAdded}: BurgerIngredientsCardProps) => {

    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(INGREDIENT_PATH.replace(':id', ingredient._id) + '?openModal=true');
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
                    alt={IMAGE_ALT_TEXT_MAP[ingredient._id as IngredientId] || ingredient.name}
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
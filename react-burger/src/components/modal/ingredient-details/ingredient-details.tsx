import React from "react";
import styles from './ingredient-details.module.css';
import {Ingredient} from "../../../utils/ingredient";
import NutritionCard from "../nutrition-card/nutrition-card";
import {IMAGE_ALT_TEXT_MAP, IngredientId} from "../../../utils/constants";

interface IngredientDetailsProps {
    ingredient: Ingredient
}

const IngredientDetails = ({ingredient}: IngredientDetailsProps) => {

    return (
        <div className={`${styles.container} mb-15`}>
            <div className={`${styles.logo_container} mb-4`}>
                <div className={`${styles.logo} mb-4`}>
                    <img
                        src={ingredient.image_large}
                        alt={IMAGE_ALT_TEXT_MAP[ingredient._id as IngredientId] || ingredient.name}
                    />
                </div>
            </div>
            <span
                className={`${styles.description} text text_type_main-medium mb-8`}>{ingredient.name}</span>
            <div className={`${styles.nutrition_container}`}>
                <NutritionCard name={'Калории,ккал'} value={ingredient.calories}/>
                <NutritionCard name={'Белки, г'} value={ingredient.proteins}/>
                <NutritionCard name={'Жиры, г'} value={ingredient.fat}/>
                <NutritionCard name={'Углеводы, г'} value={ingredient.carbohydrates}/>
            </div>
        </div>
    );
}

export default IngredientDetails;
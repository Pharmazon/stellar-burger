import React from "react";
import styles from './ingredient-details.module.css';
import Ingredient from "../../../utils/ingredient";
import NutritionCard from "../nutrition-card/nutrition-card";
import Modal from "../modal/modal";
import {IMAGE_ALT_TEXT_MAP, IngredientId} from "../../../utils/constants";

interface IngredientDetailsProps {
    ingredient: Ingredient
    isModalOpened: boolean,
    onClose: () => void
}

class IngredientDetails extends React.Component<IngredientDetailsProps> {

    render() {
        return (
            <Modal
                headerText={'Детали ингредиента'} 
                width={720} 
                height={539}
                isModalOpened={this.props.isModalOpened}
                onClose={this.props.onClose}
            >
                <div className={`${styles.container} mb-15`}>
                    <div className={`${styles.logo_container} mb-4`}>
                        <div className={`${styles.logo} mb-4`}>
                            <img 
                                src={this.props.ingredient.image_large}
                                alt={IMAGE_ALT_TEXT_MAP[this.props.ingredient._id as IngredientId] || this.props.ingredient.name}
                            />
                        </div>
                    </div>
                    <span className={`${styles.description} text text_type_main-medium mb-8`}>{this.props.ingredient.name}</span>
                    <div className={`${styles.nutrition_container}`}>
                        <NutritionCard name={'Калории,ккал'} value={this.props.ingredient.calories} />
                        <NutritionCard name={'Белки, г'} value={this.props.ingredient.proteins} />
                        <NutritionCard name={'Жиры, г'} value={this.props.ingredient.fat} />
                        <NutritionCard name={'Углеводы, г'} value={this.props.ingredient.carbohydrates} />
                    </div>
                </div>
                <div></div>
            </Modal>
        );
    }
}

export default IngredientDetails;
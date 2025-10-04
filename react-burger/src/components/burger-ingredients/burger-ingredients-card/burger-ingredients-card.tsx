import React, {useState} from "react";
import styles from './burger-ingredients-card.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../../../utils/ingredient";
import IngredientDetails from "../../modal/ingredient-details/ingredient-details";
import {IMAGE_ALT_TEXT_MAP, IngredientId} from "../../../utils/constants";

interface BurgerIngredientsCardProps {
    ingredient: Ingredient;
}

const BurgerIngredientsCard: React.FC<BurgerIngredientsCardProps> = ({ ingredient }) => {

    const [isModalOpened, setIsModalOpened] = useState(false);

    const handleOpenModal = () => setIsModalOpened(true);
    const handleCloseModal = () => setIsModalOpened(false);

    return (
        <div className={`${styles.main_container} ml-4 mt-4`} onClick={handleOpenModal}>
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
            
            <IngredientDetails
                ingredient={ingredient}
                isModalOpened={isModalOpened}
                onClose={handleCloseModal}
            />
        </div>
    );
}

export default BurgerIngredientsCard;
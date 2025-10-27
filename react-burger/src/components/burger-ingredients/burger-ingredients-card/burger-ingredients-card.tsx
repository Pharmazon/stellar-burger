import React from "react";
import styles from './burger-ingredients-card.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient} from "../../../utils/ingredient";
import IngredientDetails from "../../modal/ingredient-details/ingredient-details";
import {IMAGE_ALT_TEXT_MAP, IngredientId} from "../../../utils/constants";
import Modal from "../../modal/modal/modal";
import {useModal} from "../../../hooks/useModal";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../services/store";
import {deselect, select} from "../../../services/ingredientDetailsSlice";

export interface BurgerIngredientsCardProps {
    ingredient: Ingredient;
}

const BurgerIngredientsCard = ({ingredient}: BurgerIngredientsCardProps) => {

    const {isModalOpened, openModal, closeModal} = useModal();
    const {ingredientDetails: selectedIngredient} = useSelector((state: RootState) => state.ingredientDetails);
    const dispatch = useAppDispatch();

    const handleOpenModal = () => {
        dispatch(select(ingredient));
        openModal();
    };

    const handleCloseModal = () => {
        closeModal();
        dispatch(deselect());
    };
    
    return (
        <div
            className={`${styles.main_container} ml-4 mt-4`}
            onClick={handleOpenModal}
        >
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

            {selectedIngredient && isModalOpened && (
                <Modal
                    title={"Детали ингредиента"}
                    onClose={handleCloseModal}
                    width={720}
                    height={539}
                >
                    <IngredientDetails ingredient={selectedIngredient}/>
                </Modal>
            )}
        </div>
    );
}

export default BurgerIngredientsCard;
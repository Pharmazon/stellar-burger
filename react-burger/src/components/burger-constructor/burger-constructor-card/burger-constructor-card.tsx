import React from "react";
import styles from './burger-constructor-card.module.css';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch} from "../../../services/store";
import {removeIngredient} from "../../../services/burgerConstructorSlice";
import {Ingredient} from "../../../utils/ingredient";
import {BOTTOM_POSITION, BUN_TYPE, CardPosition, TOP_POSITION} from "../../../utils/constants";

export interface BurgerConstructorCardProps {
    name: string
    num: number | null
    ingredient: Ingredient
    type?: CardPosition
}

const BurgerConstructorCard = ({name, num, ingredient, type}: BurgerConstructorCardProps) => {

    const dispatch = useAppDispatch();

    const showDragIcon = BUN_TYPE !== ingredient.type;
    const isLocked = BUN_TYPE === ingredient.type;

    const handleClick = () => {
        if (num === null) {
            return;
        }
        dispatch(removeIngredient(num));
    };

    const constructorElementType = TOP_POSITION === type
        ? TOP_POSITION
        : BOTTOM_POSITION === type
            ? BOTTOM_POSITION
            : undefined

    const price = BUN_TYPE === ingredient.type
        ? ingredient.price / 2
        : ingredient.price;

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.card}`}>
                <div className={showDragIcon ? '' : styles.hidden}>
                    <DragIcon type="primary"/>
                </div>
                <div className={styles.element}>
                    <ConstructorElement
                        type={constructorElementType}
                        isLocked={isLocked}
                        text={name}
                        price={price}
                        thumbnail={ingredient.image}
                        handleClose={handleClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructorCard;
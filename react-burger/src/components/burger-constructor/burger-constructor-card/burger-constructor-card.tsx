import React from "react";
import styles from './burger-constructor-card.module.css';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch} from "../../../services/store";
import {removeIngredient} from "../../../services/slice/burger-constructor-slice";
import {CardPosition, ElementState, IngredientSection, TNullableCardPosition} from "../../../utils/constants";
import {IIngredient} from "../../../types/ingredient";

export interface IBurgerConstructorCardProps {
    name: string
    num: number | null
    ingredient: IIngredient
    type?: TNullableCardPosition
}

const BurgerConstructorCard = ({name, num, ingredient, type}: IBurgerConstructorCardProps) => {

    const dispatch = useAppDispatch();

    const showDragIcon = IngredientSection.BUN !== ingredient.type;
    const isLocked = IngredientSection.BUN === ingredient.type;

    const handleClick = () => {
        if (num === null) {
            return;
        }
        dispatch(removeIngredient(num));
    };

    const constructorElementType = CardPosition.TOP === type
        ? CardPosition.TOP
        : CardPosition.BOTTOM === type
            ? CardPosition.BOTTOM
            : undefined

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.card}`}>
                <div className={showDragIcon ? '' : styles.hidden}>
                    <DragIcon type={ElementState.PRIMARY}/>
                </div>
                <div className={styles.element}>
                    <ConstructorElement
                        type={constructorElementType}
                        isLocked={isLocked}
                        text={name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        handleClose={handleClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructorCard;
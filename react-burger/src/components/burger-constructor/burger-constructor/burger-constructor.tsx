import React, {useMemo} from "react";
import styles from './burger-constructor.module.css';
import BurgerConstructorTotalCard from "../burger-constructor-total-card/burger-constructor-total-card";
import {Ingredient} from "../../../utils/ingredient";
import {
    BOTTOM_POSITION,
    BUN_TYPE,
    CardPosition,
    DND_BURGER_BUN,
    DND_BURGER_INGREDIENT,
    TOP_POSITION
} from "../../../utils/constants";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../services/store";
import {useDrop} from "react-dnd";
import {addBun, addIngredient, moveIngredient} from "../../../services/burgerConstructorSlice";
import DraggableBurgerConstructorCard from "../burger-constructor-card/draggable-burger-constructor-card";

const BurgerConstructor = () => {

    const {ingredients, selectedBun} = useSelector((state: RootState) => state.burgerConstructor);
    const dispatch = useAppDispatch();
    const numRef = React.useRef(0);

    const calculateTotal = useMemo(() => {
        return ingredients.reduce((total, ingredient) => {
            return total + (ingredient.item.price || 0);
        }, 0) + (selectedBun?.price || 0);
    }, [ingredients, selectedBun]);

    const renderIngredientCard = (
        ingredient: Ingredient | null,
        position: CardPosition,
        num: number | null,
        index: number
    ) => {
        if (!ingredient) {
            return null;
        }

        let suffix = '';
        let type = undefined;
        if (ingredient.type === BUN_TYPE) {
            type = position === null ? undefined : position;
            suffix = position === TOP_POSITION ? ' (верх)' : ' (низ)';
        }

        return (
            <DraggableBurgerConstructorCard
                key={num}
                name={`${ingredient.name}${suffix}`}
                ingredient={ingredient}
                num={num}
                type={type}
                index={index}
                onMove={(fromIndex, toIndex) => {
                    dispatch(moveIngredient({from: fromIndex, to: toIndex}));
                }}
            />
        );
    }

    const renderTopBunCard = () => {
        return renderIngredientCard(selectedBun, TOP_POSITION, null, -1);
    }

    const renderBottomBunCard = () => {
        return renderIngredientCard(selectedBun, BOTTOM_POSITION, null, -2);
    }

    const renderIngredientCards = () => {
        if (ingredients.length === 0) {
            return null;
        }

        return ingredients.map((ingredient, index) => {
            return renderIngredientCard(ingredient.item, null, ingredient.num, index);
        });
    }

    const [{canIngredientDrop, isOverIngredient}, dropIngredient] = useDrop({
        accept: DND_BURGER_INGREDIENT,
        drop: (item: { ingredient: Ingredient }) => {
            dispatch(addIngredient({num: ++numRef.current, item: item.ingredient}));
        },
        collect: (monitor) => ({
            isOverIngredient: monitor.isOver(),
            canIngredientDrop: monitor.canDrop(),
        }),
    });

    const [{canDropTopBun, isOverTopBun}, dropTopBun] = useDrop({
        accept: DND_BURGER_BUN,
        drop: (item: { ingredient: Ingredient }) => {
            dispatch(addBun(item.ingredient));
        },
        collect: (monitor) => ({
            isOverTopBun: monitor.isOver(),
            canDropTopBun: monitor.canDrop(),
        }),
    });

    const [{canDropBottomBun, isOverBottomBun}, dropBottomBun] = useDrop({
        accept: DND_BURGER_BUN,
        drop: (item: { ingredient: Ingredient }) => {
            dispatch(addBun(item.ingredient));
        },
        collect: (monitor) => ({
            isOverBottomBun: monitor.isOver(),
            canDropBottomBun: monitor.canDrop(),
        }),
    });

    return (
        <div className={`${styles.main_container}`}>
            <div className={`${styles.burger_container} mt-25 ml-4`}>
                <div
                    ref={dropTopBun as any}
                    className={`${styles.bun_container} mb-4`}
                    style={{
                        border: canDropTopBun
                            ? isOverTopBun
                                ? '3px solid #646cff'
                                : '1px solid #646cff'
                            : 'transparent',
                        boxShadow: canDropTopBun ? '0 0 3px 3px #646CFF86' : 'none',
                        borderRadius: '10px',
                    }}
                >
                    {renderTopBunCard()}
                </div>
                <div
                    ref={dropIngredient as any}
                    className={styles.ingredient_container}
                    style={{
                        border: canIngredientDrop
                            ? isOverIngredient
                                ? '3px solid #646cff'
                                : '1px solid #646cff'
                            : 'transparent',
                        boxShadow: canIngredientDrop ? '0 0 3px 3px #646CFF86' : 'none',
                        borderRadius: '10px',
                    }}
                >
                    {renderIngredientCards()}
                </div>
                <div
                    ref={dropBottomBun as any}
                    className={`${styles.bun_container} mt-4`}
                    style={{
                        border: canDropBottomBun
                            ? isOverBottomBun
                                ? '3px solid #646cff'
                                : '1px solid #646cff'
                            : 'transparent',
                        boxShadow: canDropBottomBun ? '0 0 3px 3px #646CFF86' : 'none',
                        borderRadius: '10px',
                    }}
                >
                    {renderBottomBunCard()}
                </div>
            </div>
            {calculateTotal > 0 && (
                <BurgerConstructorTotalCard
                    total={calculateTotal}
                    itemsToOrder={ingredients}
                />
            )}
        </div>
    );
}

export default BurgerConstructor;
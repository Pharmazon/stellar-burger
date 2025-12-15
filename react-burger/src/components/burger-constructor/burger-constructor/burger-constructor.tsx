import React, {useMemo} from "react";
import styles from './burger-constructor.module.css';
import BurgerConstructorTotalCard from "../burger-constructor-total-card/burger-constructor-total-card";
import {
    CardPosition,
    DND_BURGER_BUN,
    DND_BURGER_INGREDIENT,
    IngredientSection,
    TNullableCardPosition
} from "../../../utils/constants";
import {useAppDispatch, useAppSelector} from "../../../services/store";
import {useDrop} from "react-dnd";
import {addBun, addIngredient, moveIngredient} from "../../../services/slice/burger-constructor-slice";
import DraggableBurgerConstructorCard from "../burger-constructor-card/draggable-burger-constructor-card";
import {IIngredient} from "../../../types/ingredient";

const BurgerConstructor = () => {

    const {ingredients, selectedBun} = useAppSelector((state) => state.burgerConstructor);
    const dispatch = useAppDispatch();
    const numRef = React.useRef(0);

    const allRequiredSelected = () => ingredients.length > 0 && selectedBun !== null;

    const calculateTotal = useMemo(() => {
        return ingredients.reduce((total, ingredient) => {
            return total + (ingredient.item.price || 0);
        }, 0) + (selectedBun?.price || 0) * 2;
    }, [ingredients, selectedBun]);

    const renderIngredientCard = (
        ingredient: IIngredient | null,
        position: TNullableCardPosition,
        num: number | null,
        index: number
    ) => {
        if (!ingredient) {
            return null;
        }

        let suffix = '';
        let type = undefined;
        if (ingredient.type === IngredientSection.BUN) {
            type = position === null ? undefined : position;
            suffix = position === CardPosition.TOP ? ' (верх)' : ' (низ)';
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
        return renderIngredientCard(selectedBun, CardPosition.TOP, null, -1);
    }

    const renderBottomBunCard = () => {
        return renderIngredientCard(selectedBun, CardPosition.BOTTOM, null, -2);
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
        drop: (item: { ingredient: IIngredient }) => {
            dispatch(addIngredient({num: ++numRef.current, item: item.ingredient}));
        },
        collect: (monitor) => ({
            isOverIngredient: monitor.isOver(),
            canIngredientDrop: monitor.canDrop(),
        }),
    });

    const [{canDropTopBun, isOverTopBun}, dropTopBun] = useDrop({
        accept: DND_BURGER_BUN,
        drop: (item: { ingredient: IIngredient }) => {
            dispatch(addBun(item.ingredient));
        },
        collect: (monitor) => ({
            isOverTopBun: monitor.isOver(),
            canDropTopBun: monitor.canDrop(),
        }),
    });

    const [{canDropBottomBun, isOverBottomBun}, dropBottomBun] = useDrop({
        accept: DND_BURGER_BUN,
        drop: (item: { ingredient: IIngredient }) => {
            dispatch(addBun(item.ingredient));
        },
        collect: (monitor) => ({
            isOverBottomBun: monitor.isOver(),
            canDropBottomBun: monitor.canDrop(),
        }),
    });

    const itemsToOrder = useMemo(() => {
        const orderItems: (IIngredient | null)[] = [];

        if (selectedBun) {
            orderItems.push(selectedBun); // верхняя булка
        }

        // Добавляем все ингредиенты
        ingredients.forEach(ing => {
            orderItems.push(ing.item);
        });

        if (selectedBun) {
            orderItems.push(selectedBun); // нижняя булка
        }

        return orderItems.filter(item => item !== null) as IIngredient[];
    }, [ingredients, selectedBun]);

    return (
        <div className={`${styles.main_container}`}>
            <div className={`${styles.burger_container} mt-25 ml-4`}>
                <div
                    id={'top_bun_area'}
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
                    {
                        selectedBun
                            ? renderTopBunCard()
                            : 'Перетащите сюда выбранную БУЛОЧКУ'
                    }
                </div>
                <div
                    id={'ingredients_area'}
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
                    {
                        ingredients.length > 0
                            ? renderIngredientCards()
                            : 'Перетащите сюда выбранные ИНГРЕДИЕНТЫ'
                    }
                </div>
                <div
                    id={'bottom_bun_area'}
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
                    {
                        selectedBun
                            ? renderBottomBunCard()
                            : 'Перетащите сюда выбранную БУЛОЧКУ'
                    }
                </div>
            </div>
            {
                allRequiredSelected() && (
                    <BurgerConstructorTotalCard
                        total={calculateTotal}
                        itemsToOrder={itemsToOrder}
                    />
                )
            }
        </div>
    );
}

export default BurgerConstructor;
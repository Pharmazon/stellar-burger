import React, {useMemo, useState} from "react";
import styles from './burger-constructor.module.css';
import BurgerConstructorCard from "../burger-constructor-card/burger-constructor-card";
import BurgerConstructorTotalCard from "../burger-constructor-total-card/burger-constructor-total-card";
import Ingredient from "../../../utils/ingredient";
import {BUN_TYPE} from "../../../utils/constants";

interface BurgerConstructorProps {
    ingredients: Ingredient[];
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ ingredients }) => {

    const [selectedBun, setSelectedBun] = useState<string>("643d69a5c3f7b9001cfa093c");
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0946",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0946",
        "643d69a5c3f7b9001cfa0949"
    ]);

    const getIngredientsMap = useMemo(() => {
        return ingredients.reduce((map, ingredient) => {
            map.set(ingredient._id, ingredient);
            return map;
        }, new Map<string, Ingredient>());
    }, [ingredients]);

    const calculateTotal = (): number => {
        if (ingredients.length === 0) {
            return 0;
        }

        const subTotal = selectedIngredients.reduce((total, id) => {
            const ingredient = getIngredientsMap.get(id);
            return total + (ingredient?.price || 0);
        }, 0);

        const bunIngredient = getById(selectedBun);

        return subTotal + (bunIngredient?.price || 0) * 2;
    }

    const getById = (id: string): Ingredient | null => {
        const ingredient = getIngredientsMap.get(id);

        if (ingredient === undefined) {
            return null;
        }

        return ingredient;
    }

    const renderIngredientCard = (ingredient: Ingredient | null, position: 'top' | 'bottom' | null) => {
        if (!ingredient) {
            return null;
        }

        let suffix = '';
        let type = undefined;
        if (ingredient.type === BUN_TYPE) {
            type = position === null ? undefined : position;
            suffix = position === 'top' ? ' (верх)' : ' (низ)';
        }

        return (
            <BurgerConstructorCard
                key={`${ingredient._id}_${crypto.randomUUID()}`}
                name={`${ingredient.name}${suffix}`}
                price={ingredient.price}
                image={ingredient.image}
                type={type}
            />
        );
    }

    const renderAllIngredients = () => {
        if (ingredients.length === 0) {
            return null;
        }

        return selectedIngredients.map(id => {
            const ingredient = getById(id);
            return renderIngredientCard(ingredient, null);
        });
    }
    

    let bun = getById(selectedBun);
    return (
        <div className={`${styles.main_container}`}>
            <div className={`${styles.burger_container} mt-25 ml-4`}>
                <div className={"mb-4"}>
                    {renderIngredientCard(bun, 'top')}
                </div>
                <div className={styles.ingredient_container}>
                    {renderAllIngredients()}
                </div>
                <div className={"mt-4"}>
                    {renderIngredientCard(bun, 'bottom')}
                </div>
            </div>
            <BurgerConstructorTotalCard total={calculateTotal()}/>
        </div>
    );
}

export default BurgerConstructor;
import React, {useMemo} from "react";
import styles from './burger-constructor.module.css';
import BurgerConstructorCard from "../burger-constructor-card/burger-constructor-card";
import BurgerConstructorTotalCard from "../burger-constructor-total-card/burger-constructor-total-card";
import Ingredient from "../../../utils/ingredient";
import {BUN_TYPE} from "../../../utils/constants";
import {useSelector} from "react-redux";
import {RootState} from "../../../services/store";

const BurgerConstructor = () => {

    const {ingredients, selectedBun} = useSelector((state: RootState) => state.burgerConstructor);

    const calculateTotal = useMemo(() => {
        if (ingredients.length === 0) {
            return 0;
        }

        return ingredients.reduce((total, ingredient) => {
            return total + (ingredient.price || 0);
        }, 0) + (selectedBun?.price || 0);
    }, [ingredients, selectedBun]);

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

    const renderBunCard = (position: 'top' | 'bottom') => {
        return renderIngredientCard(selectedBun, position)
    }

    const renderIngredientCards = () => {
        if (ingredients.length === 0) {
            return null;
        }

        console.log("CARDS=", ingredients);

        return ingredients.map(ingredient => {
            return renderIngredientCard(ingredient, null);
        });
    }

    return (
        <div className={`${styles.main_container}`}>
            <div className={`${styles.burger_container} mt-25 ml-4`}>
                <div className={"mb-4"}>
                    {renderBunCard('top')}
                </div>
                <div className={styles.ingredient_container}>
                    {renderIngredientCards()}
                </div>
                <div className={"mt-4"}>
                    {renderBunCard('bottom')}
                </div>
            </div>
            {ingredients.length > 0 && calculateTotal > 0 && (
                <BurgerConstructorTotalCard
                    total={calculateTotal}
                    itemsToOrder={ingredients}
                />
            )}
        </div>
    );
}

export default BurgerConstructor;
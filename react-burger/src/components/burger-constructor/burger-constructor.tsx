import React from "react";
import styles from './burger-constructor.module.css';
import BurgerConstructorCard from "./burger-constructor-card/burger-constructor-card";
import BurgerConstructorTotalCard from "./burger-constructor-total-card/burger-constructor-total-card";
import {BACKEND_DATA} from "../../utils/data";
import Ingredient from "../../utils/Ingredient";

interface BurgerConstructorProps {
}

interface BurgerConstructorState {
    ingredients: string[]
    bun: string
}

class BurgerConstructor extends React.Component<BurgerConstructorProps, BurgerConstructorState> {

    private ingredientsMap: Map<string, Ingredient>;
    
    constructor(props: BurgerConstructorProps) {
        super(props);
        this.state = {
            bun: "60666c42cc7b410027a1a9b1",
            ingredients: [
                "60666c42cc7b410027a1a9b9",
                "60666c42cc7b410027a1a9b4",
                "60666c42cc7b410027a1a9bc",
                "60666c42cc7b410027a1a9bb",
                "60666c42cc7b410027a1a9bb",
                "60666c42cc7b410027a1a9bb"
            ]
        };
        this.ingredientsMap = this.buildIngredientsMap(BACKEND_DATA);
    }

    private buildIngredientsMap(ingredients: Ingredient[]): Map<string, Ingredient> {
        return ingredients.reduce((map, ingredient) => {
            map.set(ingredient._id, ingredient);
            return map;
        }, new Map<string, Ingredient>());
    }

    private calculateTotal(): number {
        const subTotal = this.state.ingredients.reduce((total, id) => {
            const ingredient = this.ingredientsMap.get(id);
            return total + (ingredient?.price || 0);
        }, 0);

        const bunIngredient = this.getById(this.state.bun);
        
        return subTotal + bunIngredient.price * 2;
    }

    private getById(id: string): Ingredient {
        const ingredient = this.ingredientsMap.get(id);

        if (ingredient === undefined) {
            throw new DOMException(`Не найден ингредиент по id ${id}`);
        }
        
        return ingredient;
    }

    private renderIngredientCard(ingredient: Ingredient, position: 'top' | 'bottom' | null) {
        
        let suffix = '';
        let type = undefined;
        if (ingredient.type === 'bun') {
            type = position === null ? undefined : position;
            suffix = position === 'top' ? ' (верх)' : ' (низ)';
        }

        return (
            <BurgerConstructorCard
                name={`${ingredient.name}${suffix}`}
                price={ingredient.price}
                image={ingredient.image}
                type={type}
            />
        );
    }

    private renderAllIngredients() {
        return this.state.ingredients.map(id => {
            const ingredient = this.getById(id);

            if (ingredient === undefined) {
                throw new DOMException(`Не найден ингредиент по id ${id}`);
            }
            
            return this.renderIngredientCard(ingredient, null)
        });
    }
    
    render() {
        let bun = this.getById(this.state.bun);
        return (
            <div className={`${styles.main_container}`}>
                <div className={`${styles.burger_container} mt-25 ml-4`}>
                    <div className={"mb-4"}>
                        {this.renderIngredientCard(bun, 'top')}
                    </div>
                    <div className={styles.ingredient_container}>
                        {this.renderAllIngredients()}
                    </div>
                    <div className={"mt-4"}>
                        {this.renderIngredientCard(bun, 'bottom')}
                    </div>
                </div>
                <BurgerConstructorTotalCard total={this.calculateTotal()}/>
            </div>
        );
    }
}

export default BurgerConstructor;
import React from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCard from "./burger-ingredients-card/burger-ingredients-card";
import {BACKEND_DATA} from "../../utils/data";
import Ingredient from "../../utils/Ingredient";

interface BurgerIngredientsProps {
}

interface BurgerIngredientsState {
    ingredients: Ingredient[];
}

class BurgerIngredients extends React.Component<BurgerIngredientsProps, BurgerIngredientsState> {

    constructor(props: BurgerIngredientsProps) {
        super(props);
        this.state = {
            ingredients: BACKEND_DATA
        };
    }
    
    private getByType(type: Ingredient['type']): Ingredient[] {
        return this.state.ingredients.filter(ingredient => ingredient.type === type);
    }

    private renderIngredientCard(ingredient: Ingredient) {
        return (
            <BurgerIngredientsCard
                key={ingredient._id}
                name={ingredient.name}
                price={ingredient.price}
                image={ingredient.image}
            />
        );
    }

    private renderIngredientSection(title: string, ingredients: Ingredient[]) {
        return (
            <div>
                <div className="text text_type_main-medium pt-10">{title}</div>
                <div>
                    <div className={`${styles.card_container} mt-6`}>
                        {ingredients.map(ingredient => this.renderIngredientCard(ingredient))}
                    </div>
                </div>
            </div>
        );
    }
    
    render() {

        function click() {
            console.log("clicked")
        }
        
        return (
            <div className={styles.container}>
                <div className="text text_type_main-large pt-10">Соберите бургер</div>
                <div className={`${styles.button_block} pt-5`}>
                    <Tab value="one" active={ true } onClick={click}>Булки</Tab>
                    <Tab value="two" active={ false } onClick={click}>Соусы</Tab>
                    <Tab value="three" active={ false } onClick={click}>Начинки</Tab>
                </div>
                <div className={styles.components_container}>
                    {this.renderIngredientSection("Булки", this.getByType('bun'))}
                    {this.renderIngredientSection("Соусы", this.getByType('sauce'))}
                    {this.renderIngredientSection("Начинки", this.getByType('main'))}
                </div>
            </div>
        );
    }
}

export default BurgerIngredients;
import React, {useRef, useState} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCard from "../burger-ingredients-card/burger-ingredients-card";
import Ingredient from "../../../utils/ingredient";
import {BUN_TYPE, MAIN_TYPE, SAUCE_TYPE} from "../../../utils/constants";

interface BurgerIngredientsProps {
    ingredients: Ingredient[];
}

export type IngredientSection = 'bun' | 'sauce' | 'main';

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ ingredients }) => {

    const [currentTab, setCurrentTab] = useState(BUN_TYPE);
    
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const getRef = (section: IngredientSection) => {
        switch (section) {
            case "bun":
                return bunRef;
            case "sauce":
                return sauceRef;
            case "main":
                return mainRef;
            default:
                throw new Error("Неизвестная секция ингредиентов");
        }
    }
    
    const scrollToSection = (section: IngredientSection) => {
        const ref = getRef(section);
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };
    
    const getByType = (section: IngredientSection): Ingredient[] => {
        return ingredients.filter(ingredient => ingredient.type === section);
    }

    const renderIngredientCard = (ingredient: Ingredient)=> {
        return (
            <BurgerIngredientsCard
                key={ingredient._id}
                ingredient={ingredient}
            />
        );
    }

    const renderIngredientSection = (title: string, section: IngredientSection)=> {
        const ref = getRef(section);
        let ingredients = getByType(section)
        return (
            <div ref={ref}>
                <div className="text text_type_main-medium pt-10">{title}</div>
                <div>
                    <div className={`${styles.card_container} mt-6`}>
                        {ingredients.map(ingredient => renderIngredientCard(ingredient))}
                    </div>
                </div>
            </div>
        );
    }
    
    const handleClick = (value: string) => {
        const section = value as IngredientSection;
        setCurrentTab(section);
        scrollToSection(section);
    };
    
    return (
        <div className={styles.container}>
            <div className="text text_type_main-large pt-10">Соберите бургер</div>
            <div className={`${styles.button_block} pt-5`}>
                <Tab 
                    value={BUN_TYPE} 
                    active={currentTab === BUN_TYPE} 
                    onClick={handleClick}
                >
                    Булки
                </Tab>
                <Tab 
                    value={SAUCE_TYPE} 
                    active={currentTab === SAUCE_TYPE} 
                    onClick={handleClick}
                >
                    Соусы
                </Tab>
                <Tab 
                    value={MAIN_TYPE} 
                    active={currentTab === MAIN_TYPE} 
                    onClick={handleClick}
                >
                    Начинки
                </Tab>
            </div>
            <div className={styles.components_container}>
                {renderIngredientSection("Булки", BUN_TYPE)}
                {renderIngredientSection("Соусы", SAUCE_TYPE)}
                {renderIngredientSection("Начинки", MAIN_TYPE)}
            </div>
        </div>
    );
}

export default BurgerIngredients;
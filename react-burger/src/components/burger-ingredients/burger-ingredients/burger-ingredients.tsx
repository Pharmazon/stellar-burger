import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCard from "../burger-ingredients-card/burger-ingredients-card";
import Ingredient from "../../../utils/ingredient";
import {BUN_TYPE, MAIN_TYPE, SAUCE_TYPE} from "../../../utils/constants";
import {fetchIngredients} from "../../../services/burgerIngredientsSlice";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../services/store";

type IngredientSection = 'bun' | 'sauce' | 'main';

const BurgerIngredients = () => {

    const [currentTab, setCurrentTab] = useState(BUN_TYPE);
    const {items: ingredients, status, error} = useSelector((state: RootState) => state.burgerIngredients);
    const dispatch = useAppDispatch();
    
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, []);

    const bunIngredients = useMemo(() => {
        return ingredients.filter(ingredient => BUN_TYPE === ingredient.type);
    }, [ingredients]);

    const sauceIngredients = useMemo(() => {
        return ingredients.filter(ingredient => SAUCE_TYPE === ingredient.type);
    }, [ingredients]);

    const mainIngredients = useMemo(() => {
        return ingredients.filter(ingredient => MAIN_TYPE === ingredient.type);
    }, [ingredients]);

    const getRef = (section: IngredientSection) => {
        switch (section) {
            case BUN_TYPE:
                return bunRef;
            case SAUCE_TYPE:
                return sauceRef;
            case MAIN_TYPE:
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
        switch (section) {
            case BUN_TYPE:
                return bunIngredients;
            case SAUCE_TYPE:
                return sauceIngredients;
            case MAIN_TYPE:
                return mainIngredients;
            default:
                throw new Error("Неизвестная секция ингредиентов");
        }
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

            {'loading' === status &&
                <div className={styles.components_container}>Получение списка ингредиентов...</div>
            }

            {'fail' === status &&
                <div className={styles.components_container}>{error}</div>
            }

            {'success' === status &&
                <div className={styles.components_container}>
                    {renderIngredientSection("Булки", BUN_TYPE)}
                    {renderIngredientSection("Соусы", SAUCE_TYPE)}
                    {renderIngredientSection("Начинки", MAIN_TYPE)}
                </div>
            }
        </div>
    );
}

export default BurgerIngredients;
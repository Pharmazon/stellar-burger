import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {BUN_TYPE, MAIN_TYPE, SAUCE_TYPE} from "../../../utils/constants";
import {useAppSelector} from "../../../services/store";
import DraggableBurgerIngredient from "../burger-ingredients-card/draggable-burger-ingredient";
import DraggableBurgerBun from "../burger-ingredients-card/draggable-burger-bun";
import {Ingredient} from "../../../types/ingredient";
import Preloader from "../../preloader/preloader";

type IngredientSection = 'bun' | 'sauce' | 'main';

type CounterItem = {
    id: string;
    quantity: number;
};

const BurgerIngredients = () => {

    const [currentTab, setCurrentTab] = useState(BUN_TYPE);
    const {items: ingredients, status, error} = useAppSelector((state) => state.burgerIngredients);
    const {
        ingredients: constructorIngredients,
        selectedBun: constructorBun
    } = useAppSelector((state) => state.burgerConstructor);
    
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) {
            return;
        }

        const handleScroll = () => {
            const sections = [
                {type: BUN_TYPE, domRect: bunRef.current?.getBoundingClientRect()},
                {type: SAUCE_TYPE, domRect: sauceRef.current?.getBoundingClientRect()},
                {type: MAIN_TYPE, domRect: mainRef.current?.getBoundingClientRect()}
            ];

            let nearSection = null;
            let minDistance = Infinity;
            const containerDomRect = container.getBoundingClientRect();

            sections.forEach(({type, domRect}) => {
                if (!domRect) {
                    return;
                }

                const currentDistance = Math.abs(domRect.top - containerDomRect.top);

                if (currentDistance < minDistance) {
                    minDistance = currentDistance;
                    nearSection = type;
                }
            });

            if (nearSection) {
                setCurrentTab(nearSection);
            }
        };

        container.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    });

    const bunIngredients = useMemo(() => {
        return ingredients.filter((ingredient) => BUN_TYPE === ingredient.type);
    }, [ingredients]);

    const sauceIngredients = useMemo(() => {
        return ingredients.filter((ingredient) => SAUCE_TYPE === ingredient.type);
    }, [ingredients]);

    const mainIngredients = useMemo(() => {
        return ingredients.filter((ingredient) => MAIN_TYPE === ingredient.type);
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

    const counterArray = useMemo(() => {
        const result: CounterItem[] = [];

        constructorIngredients?.forEach((ingredient) => {
            const id = ingredient.item._id;

            const elementInResult = result.find(
                (counterItem) => counterItem.id === id
            );

            if (elementInResult) {
                elementInResult.quantity += 1;
            } else {
                result.push({id: id, quantity: 1});
            }
        });

        constructorBun && result.push({id: constructorBun._id, quantity: 1});

        return result;
    }, [constructorIngredients, constructorBun]);

    const getQuantityById = (id: string): number => {
        return counterArray.find((item) => item.id === id)?.quantity ?? 0;
    };

    const renderBunSection = () => {
        const ref = getRef(BUN_TYPE);
        const buns = getByType(BUN_TYPE)
        return (
            <div ref={ref}>
                <div className="text text_type_main-medium pt-10">Булки</div>
                <div>
                    <div className={`${styles.card_container} mt-6`}>
                        {buns.map(ingredient => (
                            <DraggableBurgerBun
                                key={ingredient._id}
                                ingredient={ingredient}
                                quantityAdded={getQuantityById(ingredient._id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const renderIngredientSection = (title: string, section: IngredientSection)=> {
        const ref = getRef(section);
        const ingredients = getByType(section)
        return (
            <div ref={ref}>
                <div className="text text_type_main-medium pt-10">{title}</div>
                <div>
                    <div className={`${styles.card_container} mt-6`}>
                        {ingredients.map(ingredient => (
                            <DraggableBurgerIngredient
                                key={ingredient._id}
                                ingredient={ingredient}
                                quantityAdded={getQuantityById(ingredient._id)}
                            />
                        ))}
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
                <Preloader/>
            }

            {'fail' === status &&
                <div className={styles.components_container}>{error}</div>
            }

            {'success' === status &&
                <div
                    ref={scrollContainerRef}
                    className={styles.components_container}
                >
                    {renderBunSection()}
                    {renderIngredientSection("Соусы", SAUCE_TYPE)}
                    {renderIngredientSection("Начинки", MAIN_TYPE)}
                </div>
            }
        </div>
    );
}

export default BurgerIngredients;
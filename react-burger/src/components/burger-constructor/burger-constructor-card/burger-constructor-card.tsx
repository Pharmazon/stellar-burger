import React from "react";
import styles from './burger-constructor-card.module.css';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface BurgerConstructorCardProps {
    name: string;
    price: number;
    image: string;
    type?: string
}

const BurgerConstructorCard = ({name, price, image, type}: BurgerConstructorCardProps) => {

    const showDragIcon = type !== 'top' && type !== 'bottom';
    const isLocked = type === 'top' || type === 'bottom';

    const constructorElementType = type === 'top'
        ? 'top'
        : type === 'bottom'
            ? 'bottom'
            : undefined

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.card}`}>
                <div className={showDragIcon ? '' : styles.hidden}>
                    <DragIcon type="primary"/>
                </div>
                <div className={styles.element}>
                    <ConstructorElement
                        type={constructorElementType}
                        isLocked={isLocked}
                        text={name}
                        price={price}
                        thumbnail={image}
                    />
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructorCard;
import React from "react";
import styles from './nutrition-card.module.css';

interface INutritionCardProps {
    name: string
    value: number
}

const NutritionCard = ({name, value}: INutritionCardProps) => {

    return (
        <div className={styles.container}>
            <span className={`${styles.card} text text_type_main-default text_color_inactive`}>{name}</span>
            <span className={`${styles.card} text text_type_digits-default text_color_inactive`}>{value}</span>
        </div>
    );
}

export default NutritionCard;
import React from "react";
import styles from './nutrition-card.module.css';

interface NutritionCardProps {
    name: string
    value: number
}

interface NutritionCardState {
}

class NutritionCard extends React.Component<NutritionCardProps, NutritionCardState> {

    render() {
        return (
            <div className={styles.container}>
                <span className={`${styles.card} text text_type_main-default text_color_inactive`}>{this.props.name}</span>
                <span className={`${styles.card} text text_type_digits-default text_color_inactive`}>{this.props.value}</span>
            </div>
        );
    }
}

export default NutritionCard;
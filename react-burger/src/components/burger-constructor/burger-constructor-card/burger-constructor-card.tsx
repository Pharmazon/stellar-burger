import React from "react";
import styles from './burger-constructor-card.module.css';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface BurgerConstructorCardProps {
    name: string;
    price: number;
    image: string;
    type?: string
}

class BurgerConstructorCard extends React.Component<BurgerConstructorCardProps> {
    
    render() {

        const showDragIcon = this.props.type !== 'top' && this.props.type !== 'bottom';
        const isLocked = this.props.type === 'top' || this.props.type === 'bottom';

        const constructorElementType = this.props.type === 'top' 
            ? 'top' 
            : this.props.type === 'bottom' 
                ? 'bottom' 
                : undefined
        
        return (
            <div className={`${styles.container}`}>
                <div className={`${styles.card}`}>
                    <div className={showDragIcon ? '' : styles.hidden}>
                        <DragIcon type="primary" />
                    </div> 
                    <div className={styles.element}>
                        <ConstructorElement
                            type={ constructorElementType }
                            isLocked={ isLocked }
                            text={ this.props.name }
                            price={ this.props.price }
                            thumbnail={ this.props.image }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default BurgerConstructorCard;
import BurgerIngredientsCard, {BurgerIngredientsCardProps} from "./burger-ingredients-card";
import {useDrag} from "react-dnd";
import React from "react";
import {DND_BURGER_BUN} from "../../../utils/constants";

const DraggableBurgerBun = ({ingredient}: BurgerIngredientsCardProps) => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: DND_BURGER_BUN,
        item: {
            ingredient
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag as any} style={{opacity: isDragging ? 0.5 : 1}}>
            <BurgerIngredientsCard ingredient={ingredient}/>
        </div>
    );
};

export default DraggableBurgerBun;
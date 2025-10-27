import React, {useRef} from "react";
import {DND_BURGER_CARD} from "../../../utils/constants";
import {useDrag, useDrop} from "react-dnd";
import styles from './burger-constructor-card.module.css';
import BurgerConstructorCard, {BurgerConstructorCardProps} from "./burger-constructor-card";

interface DraggableBurgerConstructorCardProps extends BurgerConstructorCardProps {
    index: number;
    onMove: (fromIndex: number, toIndex: number) => void;
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}

const DraggableBurgerConstructorCard = ({
                                            name,
                                            num,
                                            ingredient,
                                            type,
                                            onMove,
                                            index
                                        }: DraggableBurgerConstructorCardProps) => {

    const ref = useRef<HTMLDivElement>(null);

    const [{isDragging}, drag] = useDrag(() => ({
        type: DND_BURGER_CARD,
        item: {
            index,
            num,
            type: DND_BURGER_CARD
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop({
        accept: DND_BURGER_CARD,
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();

            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) {
                return;
            }

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            onMove(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    drag(drop(ref));

    const className = `${styles.container} ${isDragging ? styles.dragging : ''}`;

    return (
        <div
            ref={ref}
            className={className}
            style={{opacity: isDragging ? 0.5 : 1}}
        >
            <BurgerConstructorCard
                name={name}
                ingredient={ingredient}
                num={num}
                type={type}
            />
        </div>
    );
}

export default DraggableBurgerConstructorCard;
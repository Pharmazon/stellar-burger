import React, {ReactElement} from "react";
import styles from './app-header-card.module.css';

interface IAppHeaderCardProps {
    iconComponent: ReactElement,
    text: string
}

const AppHeaderCard = ({iconComponent, text}: IAppHeaderCardProps) => {
    return (
        <div className={`${styles.header_block}`}>
            <div>{iconComponent}</div>
            <span
                className={`${styles.header_block_text} text text_type_main-default ml-2`}
            >{text}</span>
        </div>
    );
}

export default AppHeaderCard;
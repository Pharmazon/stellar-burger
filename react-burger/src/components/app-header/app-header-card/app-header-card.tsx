import React from "react";
import styles from './app-header-card.module.css';

interface AppHeaderCardProps {
    iconComponent: React.ReactElement,
    text: string,
    enabled: boolean
}

const AppHeaderCard = ({enabled, iconComponent, text}: AppHeaderCardProps) => {

    let activeStyle = enabled ? '' : 'text_color_inactive';

    return (
        <div className={`${styles.header_block}`}>
            <div>{iconComponent}</div>
            <span
                className={`${styles.header_block_text} text text_type_main-default ${activeStyle} ml-2`}>{text}</span>
        </div>
    );
}

export default AppHeaderCard;
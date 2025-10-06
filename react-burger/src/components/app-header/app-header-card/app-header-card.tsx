import React from "react";
import styles from './app-header-card.module.css';

interface AppHeaderCardProps {
    iconComponent: React.ReactElement,
    text: string,
    enabled: boolean
}

class AppHeaderCard extends React.Component<AppHeaderCardProps> {
    render() {
        let activeStyle = this.props.enabled ? '' : 'text_color_inactive';
        
        return (
            <div className={`${styles.header_block}`}>
                <div>{this.props.iconComponent}</div>
                <div className={`${styles.header_block_text} text text_type_main-default ${activeStyle} ml-2`}>{this.props.text}</div>
            </div>
        );
    }
}

export default AppHeaderCard;
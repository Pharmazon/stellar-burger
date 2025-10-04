import React, {ReactNode} from 'react';
import styles from './modal-overlay.module.css';

interface ModalOverlayProps {
    children: ReactNode
    onClose: () => void
}

class ModalOverlay extends React.Component<ModalOverlayProps> {

    handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }
    
    render() {
        return (
            <div className={styles.container} onClick={this.handleOverlayClick}>
                {this.props.children}
            </div>
        )
    }
}

export default ModalOverlay;
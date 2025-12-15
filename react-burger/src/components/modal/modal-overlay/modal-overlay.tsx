import React, {ReactNode} from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
    children: ReactNode
    onClose: () => void
}

const ModalOverlay = ({children, onClose}: IModalOverlayProps) => {

    const handleOverlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div
            id={'modal_window_overlay'}
            className={styles.container}
            onClick={handleOverlayClick}
        >
            {children}
        </div>
    )
}

export default ModalOverlay;
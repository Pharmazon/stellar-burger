import React, {ReactNode} from 'react';
import styles from './modal-overlay.module.css';

interface ModalOverlayProps {
    children: ReactNode
    onClose: () => void
}

const ModalOverlay = ({children, onClose}: ModalOverlayProps) => {

    const handleOverlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={styles.container} onClick={handleOverlayClick}>
            {children}
        </div>
    )
}

export default ModalOverlay;
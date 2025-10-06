import React, {ReactNode} from 'react';
import styles from './modal-overlay.module.css';

interface ModalOverlayProps {
    children: ReactNode
    onClose: () => void
}

const ModalOverlay = ({children, onClose}: ModalOverlayProps) => {

    const handleOverlayClick = (e: React.MouseEvent) => {
        console.log('Overlay clicked: ', e.target, e.currentTarget);
        console.log('Equals: ', e.target === e.currentTarget);
        if (e.target === e.currentTarget) {
            console.log(onClose);
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
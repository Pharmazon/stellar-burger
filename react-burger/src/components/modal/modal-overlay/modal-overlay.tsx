import React, {ReactNode} from 'react';
import styles from './modal-overlay.module.css';
import {CySelector} from "../../../utils/selectors";

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
            data-test={CySelector.MODAL_WINDOW_OVERLAY}
            className={styles.container}
            onClick={handleOverlayClick}
        >
            {children}
        </div>
    )
}

export default ModalOverlay;
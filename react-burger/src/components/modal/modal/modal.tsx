import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {createPortal} from "react-dom";

interface ModalProps {
    headerText?: string
    children: ReactNode[]
    width: number,
    height: number,
    isModalOpened: boolean
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({width, height, children, headerText, isModalOpened, onClose}) => {

    const [closeIconType, setCloseIconType] = useState<"primary" | "success">("primary");

    const onCloseIconMouseAbove = () => setCloseIconType("success");
    const onCloseIconMouseLeave = () => setCloseIconType("primary");

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    useEffect(() => {
        const handleEscapeButtonClick = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        if (isModalOpened) {
            document.addEventListener('keydown', handleEscapeButtonClick);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeButtonClick);
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpened, handleClose]);

    if (!isModalOpened) {
        return null;
    }

    return createPortal(
        <ModalOverlay onClose={handleClose}>
            <div style={{ width, height }} className={styles.content_container}>
                <div className={`${styles.header_container} mb-5`}>
                    <div className={'text text_type_main-large'}>{headerText}</div>
                    <div
                        onMouseEnter={onCloseIconMouseAbove}
                        onMouseLeave={onCloseIconMouseLeave}
                        className={styles.close_icon}
                    >
                        <CloseIcon
                            type={closeIconType}
                            onClick={handleClose}
                        />
                    </div>
                </div>
                {children}
            </div>
        </ModalOverlay>,
        document.getElementById('modals') as HTMLElement
    );
}

export default Modal;
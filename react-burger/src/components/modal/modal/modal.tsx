import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {createPortal} from "react-dom";

interface ModalProps {
    title?: string
    children: ReactNode
    width: number,
    height: number,
    onClose: () => void
}

const Modal = ({width, height, children, title, onClose}: ModalProps) => {

    const [closeIconType, setCloseIconType] = useState<"primary" | "success">("primary");

    const onCloseIconMouseOver = () => setCloseIconType("success");
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

        document.addEventListener('keydown', handleEscapeButtonClick);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscapeButtonClick);
            document.body.style.overflow = 'unset';
        };
    }, [handleClose]);

    return createPortal(
        <ModalOverlay onClose={handleClose}>
            <div style={{width, height}} className={styles.content_container} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.header_container} mb-5`}>
                    <div className={'text text_type_main-large'}>{title}</div>
                    <div
                        onMouseLeave={onCloseIconMouseLeave}
                        onMouseOver={onCloseIconMouseOver}
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
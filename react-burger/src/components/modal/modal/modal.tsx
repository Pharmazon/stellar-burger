import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {createPortal} from "react-dom";
import {ElementState} from "../../../utils/constants";

interface IModalProps {
    children: ReactNode
    width: number,
    height: number,
    onClose: () => void
}

const Modal = ({width, height, children, onClose}: IModalProps) => {

    const [closeIconType, setCloseIconType] = useState<ElementState>(ElementState.PRIMARY);

    const onCloseIconMouseOver = () => setCloseIconType(ElementState.SUCCESS);
    const onCloseIconMouseLeave = () => setCloseIconType(ElementState.PRIMARY);

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
            <div
                style={{width, height}}
                className={styles.window}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    id={'modal_close_btn'}
                    className={styles.close_button}
                    onMouseLeave={onCloseIconMouseLeave}
                    onMouseOver={onCloseIconMouseOver}
                >
                    <CloseIcon
                        type={closeIconType}
                        onClick={handleClose}
                    />
                </div>
                <div id={'modal_window_content'} className={styles.content}>
                    {children}
                </div>
            </div>
        </ModalOverlay>,
        document.getElementById('modals') as HTMLElement
    );
}

export default Modal;
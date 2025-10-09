import {useCallback, useState} from "react";

export const useModal = () => {

    const [isModalOpened, setIsModalOpened] = useState(false);

    const openModal = useCallback(() => {
        setIsModalOpened(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpened(false);
    }, []);

    return {
        isModalOpened,
        openModal,
        closeModal,
    };
};
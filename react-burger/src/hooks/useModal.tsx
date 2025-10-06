import {useCallback, useState} from "react";

// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук. Он следит за их вызовами
export const useModal = () => {

    const [isModalOpened, setIsModalOpened] = useState(false);

    // `useCallback` нужен для того, чтобы зафиксировать ссылку на функцию. Таким образом уменьшится кол-во перерисовок компонента, куда будет передана эта функция
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
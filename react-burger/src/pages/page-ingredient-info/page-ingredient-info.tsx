import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../services/store";
import React, {useEffect} from "react";
import styles from "./page-ingredient-info.module.css";
import {deselect, select} from "../../services/ingredient-details-slice";
import IngredientDetails from "../../components/modal/ingredient-details/ingredient-details";
import Modal from "../../components/modal/modal/modal";

const PageIngredientInfo = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {items} = useAppSelector((state) => state.burgerIngredients);
    const {ingredientDetails: selectedIngredient} = useAppSelector((state) => state.ingredientDetails);

    const ingredient = items.find((item) => item._id === id);
    const isModal = !!location.state?.background;

    const handleCloseModal = () => {
        dispatch(deselect());
        navigate(-1);
    }

    useEffect(() => {
        if (ingredient) {
            dispatch(select(ingredient));
        }
    }, [ingredient, dispatch]);

    if (!ingredient) {
        return <div>Ингредиент не найден</div>;
    }

    if (!selectedIngredient) {
        return <div>Ингредиент не выбран</div>;
    }

    if (isModal) {
        return (
            <Modal
                title="Детали ингредиента"
                onClose={handleCloseModal}
                width={720}
                height={539}
            >
                <IngredientDetails ingredient={selectedIngredient}/>
            </Modal>
        );
    }

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.block} mt-20`}>
                <p className={`${styles.header} text text_type_main-large`}>Детали ингредиента</p>
                <IngredientDetails ingredient={selectedIngredient}/>
            </div>
        </div>
    );
};

export default PageIngredientInfo;

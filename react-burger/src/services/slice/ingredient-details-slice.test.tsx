import ingredientDetailsReducer, {deselect, initialState, select} from './ingredient-details-slice';
import {IIngredient} from '../../types/ingredient';
import {IngredientSection} from "../../utils/constants";

const mockIngredient: IIngredient = {
    _id: 'ing123',
    name: 'Котлета',
    type: IngredientSection.MAIN,
    proteins: 10,
    fat: 5,
    carbohydrates: 0,
    calories: 150,
    price: 100,
    image: 'kotleta.png',
    image_mobile: 'kotleta_mobile.png',
    image_large: 'kotleta_large.png',
    __v: 0
};

describe('ingredient details reducer tests', () => {

    it('initialized with valid state', () => {
        const actualState = ingredientDetailsReducer(undefined, {type: 'unknown'});

        expect(actualState).toEqual(initialState);
    });

    it('select', () => {
        const action = select(mockIngredient);

        const actualState = ingredientDetailsReducer(initialState, action);

        expect(actualState.ingredientDetails).toEqual(mockIngredient);
    });

    it('deselect', () => {
        const prevState = {
            ingredientDetails: mockIngredient
        };
        const action = deselect();

        const actualState = ingredientDetailsReducer(prevState, action);

        expect(actualState.ingredientDetails).toBeNull();
    });
});
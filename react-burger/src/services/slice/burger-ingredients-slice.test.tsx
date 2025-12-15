import burgerIngredientsReducer, {fetchIngredients, initialState} from './burger-ingredients-slice';
import {ApiStatus, IngredientSection} from '../../utils/constants';
import {IIngredient} from '../../types/ingredient';
import {IIngredientResponse} from '../../types/ingredientResponse';

const mockIngredients: IIngredient[] = [
    {
        _id: 'ing1',
        name: 'Булка',
        type: IngredientSection.BUN,
        proteins: 5,
        fat: 2,
        carbohydrates: 30,
        calories: 200,
        price: 50,
        image: 'bun.png',
        image_mobile: 'bun_mobile.png',
        image_large: 'bun_large.png',
        __v: 0
    },
    {
        _id: 'ing2',
        name: 'Сыр',
        type: IngredientSection.MAIN,
        proteins: 8,
        fat: 6,
        carbohydrates: 1,
        calories: 100,
        price: 70,
        image: 'cheese.png',
        image_mobile: 'cheese_mobile.png',
        image_large: 'cheese_large.png',
        __v: 0
    }
];

const mockResponse: IIngredientResponse = {
    success: true,
    data: mockIngredients
};

describe('burger ingredients reducer tests', () => {

    it('initialized with valid state', () => {
        const actualState = burgerIngredientsReducer(undefined, {type: 'unknown'});

        expect(actualState).toEqual(initialState);
    });

    it('fetchIngredients.pending', () => {
        const action = fetchIngredients.pending('', undefined);

        const actualState = burgerIngredientsReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.LOADING);
        expect(actualState.error).toBeNull();
        expect(actualState.items).toEqual([]);
    });

    it('fetchIngredients.fulfilled', () => {
        const action = fetchIngredients.fulfilled(mockResponse, '', undefined);

        const actualState = burgerIngredientsReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.SUCCESS);
        expect(actualState.error).toBeNull();
        expect(actualState.items).toEqual(mockIngredients);
    });

    it('fetchIngredients.rejected with payload', () => {
        const errorMessage = 'Network Error';
        const action = fetchIngredients.rejected(new Error(errorMessage), '', undefined, errorMessage);

        const actualState = burgerIngredientsReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.FAIL);
        expect(actualState.error).toBe(errorMessage);
        expect(actualState.items).toEqual([]);
    });

    it('fetchIngredients.rejected without payload', () => {
        const action = fetchIngredients.rejected(new Error('test'), '', undefined, undefined);

        const actualState = burgerIngredientsReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.FAIL);
        expect(actualState.error).toBe('Неизвестная ошибка');
        expect(actualState.items).toEqual([]);
    });
});
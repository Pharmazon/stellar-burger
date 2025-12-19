import burgerConstructorReducer, {
    addBun,
    addIngredient,
    clear,
    initialState,
    moveIngredient,
    removeIngredient
} from './burger-constructor-slice';
import {IBurgerConstructorIngredient, IIngredient} from '../../types/ingredient';
import {IngredientSection} from "../../utils/constants";

const mockBun: IIngredient = {
    _id: 'bun1',
    name: 'Краторная булка',
    type: IngredientSection.BUN,
    proteins: 80,
    fat: 20,
    carbohydrates: 50,
    calories: 420,
    price: 1255,
    image: 'bun.png',
    image_mobile: 'bun_mobile.png',
    image_large: 'bun_large.png',
    __v: 0
};

const mockIngredient1: IBurgerConstructorIngredient = {
    num: 1,
    item: {...mockBun}
};

const mockIngredient2: IBurgerConstructorIngredient = {
    num: 2,
    item: {
        _id: 'ing2',
        name: 'Соус Spicy-X',
        type: IngredientSection.SAUCE,
        proteins: 2,
        fat: 1,
        carbohydrates: 4,
        calories: 30,
        price: 90,
        image: 'sauce.png',
        image_mobile: 'sauce_mobile.png',
        image_large: 'sauce_large.png',
        __v: 0
    }
};

const mockIngredient3: IBurgerConstructorIngredient = {
    num: 3,
    item: {
        _id: 'ing3',
        name: 'Сыр',
        type: IngredientSection.MAIN,
        proteins: 10,
        fat: 8,
        carbohydrates: 1,
        calories: 120,
        price: 150,
        image: 'cheese.png',
        image_mobile: 'cheese_mobile.png',
        image_large: 'cheese_large.png',
        __v: 0
    }
};

describe('burger constructor reducer tests', () => {

    it('initialized with valid state', () => {
        const actualState = burgerConstructorReducer(undefined, {type: 'unknown'});

        expect(actualState).toEqual(initialState);
    });

    it('clear', () => {
        const prevState = {
            ingredients: [mockIngredient1, mockIngredient2],
            selectedBun: mockBun
        };
        const action = clear();

        const actualState = burgerConstructorReducer(prevState, action);

        expect(actualState).toEqual(initialState);
    });

    it('addBun', () => {
        const action = addBun(mockBun);

        const actualState = burgerConstructorReducer(initialState, action);

        expect(actualState.selectedBun).toEqual(mockBun);
        expect(actualState.ingredients).toEqual([]);
    });

    it('addIngredient', () => {
        const action = addIngredient(mockIngredient1);

        const actualState = burgerConstructorReducer(initialState, action);

        expect(actualState.ingredients).toEqual([mockIngredient1]);
        expect(actualState.selectedBun).toBeNull();
    });

    it('removeIngredient', () => {
        const prevState = {
            ingredients: [mockIngredient1, mockIngredient2, mockIngredient3],
            selectedBun: null
        };
        const action = removeIngredient(2);

        const actualState = burgerConstructorReducer(prevState, action);

        expect(actualState.ingredients).toEqual([mockIngredient1, mockIngredient3]);
        expect(actualState.ingredients).not.toContainEqual(mockIngredient2);
    });

    it('moveIngredient', () => {
        const prevState = {
            ingredients: [mockIngredient1, mockIngredient2, mockIngredient3],
            selectedBun: null
        };
        const action = moveIngredient({from: 0, to: 2});

        const actualState = burgerConstructorReducer(prevState, action);

        // Ожидаем: [2, 3, 1] (индексы: 0 -> 2, остальные сдвигаются влево)
        expect(actualState.ingredients).toEqual([mockIngredient2, mockIngredient3, mockIngredient1]);
    });

    it('moveIngredient from higher to lower index', () => {
        const prevState = {
            ingredients: [mockIngredient1, mockIngredient2, mockIngredient3],
            selectedBun: null
        };
        const action = moveIngredient({from: 2, to: 0});

        const actualState = burgerConstructorReducer(prevState, action);

        expect(actualState.ingredients).toEqual([mockIngredient3, mockIngredient1, mockIngredient2]);
    });
});
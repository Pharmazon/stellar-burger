/// <reference types="cypress" />

import {IIngredientResponse} from "../../src/types/ingredientResponse";
import {HOME_PATH} from "../../src/utils/constants";

describe('E2E тест: открытие и закрытие модального окна ингредиента', () => {

    let ingredientsMock: IIngredientResponse;

    before(() => {
        cy.fixture<IIngredientResponse>('ingredients').then(data => ingredientsMock = data);
    });

    beforeEach(() => {
        cy.intercept('GET', '**/ingredients', {
            statusCode: 200,
            body: ingredientsMock,
        }).as('getIngredients');

        cy.visit(HOME_PATH);
        cy.wait('@getIngredients');
    });

    it('открывает и закрывает модальное окно по крестику', () => {
        cy.openIngredientModal(ingredientsMock.data[0]._id);
        cy.closeIngredientModal('cross');
    });

    it('открывает и закрывает модальное окно по клику на оверлей', () => {
        cy.openIngredientModal(ingredientsMock.data[0]._id);
        cy.closeIngredientModal('overlay');
    });

    it('открывает и закрывает модальное окно по кнопке esc', () => {
        cy.openIngredientModal(ingredientsMock.data[0]._id);
        cy.closeIngredientModal('esc');
    });
});

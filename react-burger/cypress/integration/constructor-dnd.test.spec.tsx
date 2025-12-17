/// <reference types="cypress" />

import {IIngredientResponse} from "../../src/types/ingredientResponse";
import {HOME_PATH, IngredientSection} from "../../src/utils/constants";

describe('E2E тест: drag&drop ингредиента в конструктор', () => {
    
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

    it('должен перетаскивать булку и начинку в конструктор', () => {
        const bunIngredientId = ingredientsMock.data[0]._id;
        const mainIngredientId = ingredientsMock.data[1]._id;

        // Переносим ингредиенты в конструктор
        cy.dragIngredientToConstructor(bunIngredientId, IngredientSection.BUN);
        cy.dragIngredientToConstructor(mainIngredientId, IngredientSection.MAIN);

        // Удаляем ингредиент
        cy.removeIngredientFromConstructor(mainIngredientId);
    });
});

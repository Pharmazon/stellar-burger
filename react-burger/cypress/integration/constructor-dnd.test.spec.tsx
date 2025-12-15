/// <reference types="cypress" />

import {IIngredientResponse} from "../../src/types/ingredientResponse";

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

        cy.visit('/');
        cy.wait('@getIngredients');
    });

    it('должен перетаскивать булку и начинку в конструктор', () => {
        const bunIngredient = ingredientsMock.data[0];
        const mainIngredient = ingredientsMock.data[1];

        // Перетаскиваем булку в зону top_bun_area и проверяем что она появилась в контейнере для булки
        cy.get(`#ingredient-${bunIngredient._id}`).should('exist').trigger('dragstart');
        cy.get('#top_bun_area').should('exist').trigger('drop').trigger('dragend');
        cy.contains('.constructor-element__text', bunIngredient.name).should('exist');

        // Перетаскиваем ингредиент в зону ingredients_area и проверяем что она появилась в контейнере для ингредиентов
        cy.get(`#ingredient-${mainIngredient._id}`).should('exist').trigger('dragstart');
        cy.get('#ingredients_area').should('exist').trigger('drop').trigger('dragend');
        cy.contains('.constructor-element__text', mainIngredient.name).should('exist');


        // Ищем добавленный ингредиент и удаляем его из конструктора
        const elementToDeleteId = `constructor_${mainIngredient._id}`;
        cy.get(`#${elementToDeleteId}`).within(() => {
            cy.get('.constructor-element__action').should('exist').click();
        });
        cy.get(`#${elementToDeleteId}`).should('not.exist');
    });
})

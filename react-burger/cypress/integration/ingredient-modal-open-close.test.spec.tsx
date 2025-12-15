/// <reference types="cypress" />

import {IIngredientResponse} from "../../src/types/ingredientResponse";

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

        cy.visit('/');
        cy.wait('@getIngredients');
    });

    function openModal(ingredientId: string) {
        cy.get(`#ingredient-${ingredientId}`).within(() => {
            cy.get('img').click();
        });
        // Проверяем открытие модального окна
        cy.get('#modal_window_overlay').should('exist');
        cy.get('#modal_window_content').should('exist');

        // Проверяем изменение URL (что открылась действительно информация об ингредиенте)
        cy.location('pathname').should('eq', `/ingredients/${ingredientsMock.data[0]._id}`);
    }

    function checkModalClosed() {
        // Проверяем, что модальное окно исчезло
        cy.get('#modal_window_overlay').should('not.exist');
        cy.get('#modal_window_content').should('not.exist');

        // Проверяем, что URL вернулся к корневому
        cy.location('pathname').should('eq', '/');
    }

    it('открывает и закрывает модальное окно по крестику', () => {
        openModal(ingredientsMock.data[0]._id);

        // Кликаем по кнопке закрытия
        cy.get('#modal_close_btn').click();
        checkModalClosed();
    });

    it('открывает и закрывает модальное окно по клику на оверлей', () => {
        openModal(ingredientsMock.data[0]._id);

        // Кликаем по оверлею
        cy.get('#modal_window_overlay').click({force: true});
        checkModalClosed();
    });

    it('открывает и закрывает модальное окно по кнопке esc', () => {
        openModal(ingredientsMock.data[0]._id);

        // Кликаем по кнопке esc
        cy.get('body').type('{esc}');
        checkModalClosed();
    });
});

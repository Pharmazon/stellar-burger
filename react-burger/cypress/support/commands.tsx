/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import {HOME_PATH, IngredientSection, LOGIN_PATH, PROFILE_PATH} from "../../src/utils/constants";
import {buildCyElement, buildCyParamElement, CySelector} from "../../src/utils/selectors";

// Цель: Пройти форму логина
Cypress.Commands.add('login', (email) => {
    cy.visit(LOGIN_PATH);
    cy.get(buildCyElement(CySelector.LOGIN_INPUT)).type(email);
    cy.get(buildCyElement(CySelector.PASSWORD_INPUT)).type('password');
    cy.get(buildCyElement(CySelector.LOGIN_BUTTON)).click();
    cy.wait('@loginRequest');

    cy.location('pathname').should('eq', HOME_PATH);
})

// Цель: Логаут
Cypress.Commands.add('logout', () => {
    cy.visit(PROFILE_PATH);
    cy.get(buildCyElement(CySelector.LOGOUT_LINK)).click();
    cy.wait('@logoutRequest');

    cy.location('pathname').should('eq', LOGIN_PATH);
})


// Цель: абстрагировать drag-and-drop ингредиента в нужную зону конструктора.
Cypress.Commands.add('dragIngredientToConstructor', (ingredientId: string, targetArea: IngredientSection) => {
    const targetSelector = targetArea === IngredientSection.BUN
        ? CySelector.TOP_BUN_AREA
        : CySelector.INGREDIENTS_AREA;

    cy.get(buildCyParamElement(CySelector.INGREDIENT_ID, ingredientId))
        .should('exist')
        .trigger('dragstart');

    cy.get(buildCyElement(targetSelector))
        .should('exist')
        .trigger('drop')
        .trigger('dragend');
});

// Цель: удалить ингредиент из конструктора.
Cypress.Commands.add('removeIngredientFromConstructor', (ingredientId: string) => {
    cy.get(buildCyParamElement(CySelector.CONSTRUCTOR_ID, ingredientId)).within(() => {
        cy.get('.constructor-element__action').click();
    });
    cy.get(buildCyParamElement(CySelector.CONSTRUCTOR_ID, ingredientId)).should('not.exist');
});

// Цель: открыть модальное окно с информацией об ингредиенте.
Cypress.Commands.add('openIngredientModal', (ingredientId: string) => {
    cy.get(buildCyParamElement(CySelector.INGREDIENT_ID, ingredientId)).within(() => {
        cy.get('img').click();
    });
    cy.get(buildCyElement(CySelector.MODAL_WINDOW_OVERLAY)).should('exist');
    cy.get(buildCyElement(CySelector.MODAL_WINDOW_CONTENT)).should('exist');
});

// Цель: закрыть модальное окно разными способами.
Cypress.Commands.add('closeIngredientModal', (method: 'cross' | 'overlay' | 'esc' = 'cross') => {
    switch (method) {
        case 'cross':
            cy.get(buildCyElement(CySelector.MODAL_CLOSE_BUTTON)).click();
            break;
        case 'overlay':
            cy.get(buildCyElement(CySelector.MODAL_WINDOW_OVERLAY)).click({force: true});
            break;
        case 'esc':
            cy.get('body').type('{esc}');
            break;
    }

    cy.get(buildCyElement(CySelector.MODAL_WINDOW_OVERLAY)).should('not.exist');
    cy.get(buildCyElement(CySelector.MODAL_WINDOW_CONTENT)).should('not.exist');
});

// Цель: нажать кнопку заказа, дождаться модального окна и проверить номер.
Cypress.Commands.add('placeOrderAndVerify', (orderNumber: number) => {
    cy.get(buildCyElement(CySelector.ORDER_BUTTON)).click({force: true});

    cy.get(buildCyElement(CySelector.MODAL_WINDOW_OVERLAY)).should('exist');
    cy.get(buildCyElement(CySelector.MODAL_WINDOW_CONTENT)).should('exist');
    cy.get(buildCyElement(CySelector.ORDER_NUMBER)).should('contain', orderNumber);

    cy.get(buildCyElement(CySelector.MODAL_CLOSE_BUTTON)).click();
    cy.get(buildCyElement(CySelector.MODAL_WINDOW_OVERLAY)).should('not.exist');
});

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string): Chainable<void>;

            logout(): Chainable<void>;

            dragIngredientToConstructor(ingredientId: string, targetArea: IngredientSection): Chainable<void>;

            removeIngredientFromConstructor(ingredientId: string): Chainable<void>;

            openIngredientModal(ingredientId: string): Chainable<void>;

            closeIngredientModal(method?: 'cross' | 'overlay' | 'esc'): Chainable<void>;

            placeOrderAndVerify(orderNumber: number): Chainable<void>;
        }
    }
}

export {};
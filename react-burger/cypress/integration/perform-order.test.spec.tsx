/// <reference types="cypress" />

import {IUserResponse} from "../../src/types/userResponse";
import {IIngredientResponse} from "../../src/types/ingredientResponse";
import {IOrderResponse} from "../../src/types/orderResponse";

describe('E2E тест: добавление ингредиентов и создание заказа', () => {

    let mockUser: IUserResponse;
    let ingredientsMock: IIngredientResponse;
    let orderMock: IOrderResponse;

    before(() => {
        cy.fixture<IUserResponse>('user').then(data => mockUser = data);
        cy.fixture<IIngredientResponse>('ingredients').then(data => ingredientsMock = data);
        cy.fixture<IOrderResponse>('order').then(data => orderMock = data);
    });

    beforeEach(() => {
        cy.intercept('GET', '**/ingredients', {
            statusCode: 200,
            body: ingredientsMock,
        }).as('getIngredients');

        cy.intercept('POST', '**/auth/login', {
            statusCode: 200,
            body: mockUser
        }).as('loginRequest');

        cy.intercept('POST', '**/orders', {
            statusCode: 200,
            body: orderMock
        }).as('createOrder');

        cy.visit('/');
        cy.wait('@getIngredients');
    });

    function login() {
        cy.visit('/login');
        cy.get('[data-test="login_input"]').type(mockUser.user.email);
        cy.get('[data-test="password_input"]').type('password');
        cy.get('[data-test="login_btn"]').click();
        cy.wait('@loginRequest');

        cy.location('pathname').should('eq', '/');
    }

    it('должен успешно залогиниться, оформить заказ и очистить конструктор', () => {
        const bunIngredient = ingredientsMock.data[0];
        const mainIngredient = ingredientsMock.data[1];

        login();

        // добавляем в конструктор
        cy.get(`#ingredient-${bunIngredient._id}`).should('exist').trigger('dragstart');
        cy.get('#top_bun_area').should('exist').trigger('drop').trigger('dragend');

        cy.get(`#ingredient-${mainIngredient._id}`).should('exist').trigger('dragstart');
        cy.get('#ingredients_area').should('exist').trigger('drop').trigger('dragend');

        cy.get('[data-test="order-btn"]').click({force: true});

        // Проверяем открытие модального окна
        cy.get('#modal_window_overlay').should('exist');
        cy.get('#modal_window_content').should('exist');

        cy.get('[data-test="order_number"]').should('contain', orderMock.order.number);

        cy.get('#modal_close_btn').click();

        cy.contains('.constructor-element__text', bunIngredient.name).should('not.exist');
        cy.contains('.constructor-element__text', mainIngredient.name).should('not.exist');
    });
})

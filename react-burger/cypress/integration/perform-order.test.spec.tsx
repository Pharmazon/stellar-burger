/// <reference types="cypress" />

import {IUserResponse} from "../../src/types/userResponse";
import {IIngredientResponse} from "../../src/types/ingredientResponse";
import {IOrderResponse} from "../../src/types/orderResponse";
import {HOME_PATH, IngredientSection} from "../../src/utils/constants";

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
            body: mockUser,
        }).as('loginRequest');

        cy.intercept('POST', '**/orders', {
            statusCode: 200,
            body: orderMock,
        }).as('createOrder');

        cy.intercept('POST', '**/logout', {
            statusCode: 200
        }).as('logoutRequest');
        
        cy.visit(HOME_PATH);
        cy.wait('@getIngredients');

        cy.login(mockUser.user.email);
    });

    it('должен оформить заказ и очистить конструктор', () => {
        const bunIngredientId = ingredientsMock.data[0]._id;
        const mainIngredientId = ingredientsMock.data[1]._id;
        
        // Переносим ингредиенты в конструктор
        cy.dragIngredientToConstructor(bunIngredientId, IngredientSection.BUN);
        cy.dragIngredientToConstructor(mainIngredientId, IngredientSection.MAIN);

        // Делаем заказ
        cy.placeOrderAndVerify(orderMock.order.number);
    });

    afterEach(() => {
        cy.logout();
    })
});
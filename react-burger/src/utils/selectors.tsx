export enum CySelector {
    LOGIN_INPUT = 'login_input',
    PASSWORD_INPUT = 'password_input',
    LOGIN_BUTTON = 'login_btn',
    LOGOUT_LINK = 'logout_link',
    ORDER_BUTTON = 'order-btn',
    ORDER_NUMBER = 'order_number',

    TOP_BUN_AREA = 'top_bun_area',
    INGREDIENTS_AREA = 'ingredients_area',

    MODAL_WINDOW_OVERLAY = 'modal_window_overlay',
    MODAL_WINDOW_CONTENT = 'modal_window_content',
    MODAL_CLOSE_BUTTON = 'modal_close_btn',

    CONSTRUCTOR_ID = 'constructor_:id',
    INGREDIENT_ID = 'ingredient-:id',
}

export const buildCyElement = (selector: CySelector): string => {
    return `[data-test="${selector}"]`;
}

export const buildSelector = (selector: CySelector, value: string): string => {
    return selector.toString().replace(':id', value)
}

export const buildCyParamElement = (selector: CySelector, value: string): string => {
    return `[data-test="${selector.toString().replace(':id', value)}"]`;
}
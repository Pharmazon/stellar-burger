export const BASE_URL = "https://norma.education-services.ru/api/";
export const BASE_WSS_URL = 'wss://norma.education-services.ru/';

export enum IngredientSection {
    BUN = 'bun',
    SAUCE = 'sauce',
    MAIN = 'main'
}

export enum CardPosition {
    TOP = 'top',
    BOTTOM = 'bottom'
}

export enum ApiStatus {
    INIT = 'init',
    LOADING = 'loading',
    SUCCESS = 'success',
    FAIL = 'fail'
}

export enum FeedOrderStatus {
    DONE = 'done',
    CREATED = 'created',
    PENDING = 'pending'
}

export enum ElementState {
    PRIMARY = "primary",
    SUCCESS = "success"
}

export const DND_BURGER_INGREDIENT = 'DND_BURGER_INGREDIENT';
export const DND_BURGER_BUN = 'DND_BURGER_BUN';
export const DND_BURGER_CARD = 'DND_BURGER_CARD';

export const FEED_MAX_VISIBLE_INGREDIENTS = 5;

export const IMAGE_ALT_TEXT_MAP = {
    "643d69a5c3f7b9001cfa093c": "Светящаяся булочка с кратерами как на Луне",
    "643d69a5c3f7b9001cfa0941": "Оранжевая котлета из цветка с Марса",
    "643d69a5c3f7b9001cfa093e": "Светящееся филе с полосками",
    "643d69a5c3f7b9001cfa0942": "Соус черненький с огоньком",
    "643d69a5c3f7b9001cfa0943": "Соус светящийся космический",
    "643d69a5c3f7b9001cfa093f": "Цельное мясо моллюсков",
    "643d69a5c3f7b9001cfa0940": "Отбивная из говядины, напоминающая метеорит",
    "643d69a5c3f7b9001cfa093d": "Светящаяся флуоресцентная булочка с кунжутиком",
    "643d69a5c3f7b9001cfa0944": "Соус желтенький с крапинками цвета желтого сыра",
    "643d69a5c3f7b9001cfa0945": "Соус красный с шипами экзотического создания",
    "643d69a5c3f7b9001cfa0946": "Светящиеся кольца из минералов хрустящие",
    "643d69a5c3f7b9001cfa0947": "Интересный плод, напоминающий плод какао, со сетящимся центром",
    "643d69a5c3f7b9001cfa0948": "Красные кристаллы как будто из жаркой печи, но сахар с Марса",
    "643d69a5c3f7b9001cfa0949": "Листья светящегося салата",
    "643d69a5c3f7b9001cfa094a": "Желтый сыр пластинками с плесенью в виде астероидов",
}

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const FORGOT_PASSWORD_PATH = '/forgot-password';
export const RESET_PASSWORD_PATH = '/reset-password';
export const PROFILE_PATH = '/profile';
export const PROFILE_ORDERS_PATH = '/profile/orders';
export const PROFILE_ORDERS_NUMBER_PATH = '/profile/orders/:number';
export const INGREDIENT_PATH = '/ingredients/:id';
export const LOGOUT_PATH = '/logout';
export const FEED_PATH = '/feed';
export const FEED_NUMBER_PATH = '/feed/:number';
export const ANY_PATH = '*';

export type TIngredientId = keyof typeof IMAGE_ALT_TEXT_MAP;
export type TNullableCardPosition = CardPosition | null;
export type TNullableIngredientSection = IngredientSection | null;
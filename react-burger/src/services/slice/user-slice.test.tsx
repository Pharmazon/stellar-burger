import userReducer, {
    clearForgotPassword,
    forgotPassword,
    getUserDetails,
    initialState,
    login,
    logout,
    register,
    updateUserDetails,
} from './user-slice';
import {ApiStatus} from '../../utils/constants';
import {IUser} from '../../types/user';
import {IUserResponse} from '../../types/userResponse';
import {IApiResponse} from '../../types/apiResponse';
import tokens from '../../utils/token';
import {IUpdateUserRequest} from "../../types/updateUserRequest";

jest.mock('../../utils/token', () => ({
    getRefreshToken: jest.fn(),
    getAccessToken: jest.fn(),
    addRefreshToken: jest.fn(),
    addAccessToken: jest.fn(),
    removeRefreshToken: jest.fn(),
    removeAccessToken: jest.fn(),
}));

const mockUser: IUser = {
    email: 'test@example.com',
    name: 'Test User',
};

const mockUserResponse: IUserResponse = {
    success: true,
    user: mockUser,
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
};

const mockApiResponse: IApiResponse = {
    success: true,
    message: 'OK',
};

describe('user reducer tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('initialized with valid state', () => {
        // Проверяем инициализацию без токенов
        (tokens.getRefreshToken as jest.Mock).mockReturnValue(null);
        (tokens.getAccessToken as jest.Mock).mockReturnValue(null);
        const state = userReducer(undefined, {type: 'unknown'});
        expect(state).toEqual({
            ...initialState,
            isLoggedIn: false,
        });

        // Проверяем инициализацию с токенами
        (tokens.getRefreshToken as jest.Mock).mockReturnValue('rt');
        (tokens.getAccessToken as jest.Mock).mockReturnValue('at');
        const state2 = userReducer(undefined, {type: 'unknown'});
        expect(state2).toEqual({
            ...initialState,
            isLoggedIn: false,
        });
    });

    it('clearForgotPassword', () => {
        const prevState = {
            ...initialState,
            isPasswordRestored: true,
        };
        const action = clearForgotPassword();

        const actualState = userReducer(prevState, action);

        expect(actualState.isPasswordRestored).toBe(false);
    });

    it('login.pending', () => {
        const action = login.pending('', {email: 'test@example.com', password: '123'});

        const actualState = userReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.LOADING);
        expect(actualState.error).toBeNull();
    });

    it('login.fulfilled', () => {
        const action = login.fulfilled(mockUserResponse, '', {
            email: 'test@example.com',
            password: '123',
        });

        const actualState = userReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.SUCCESS);
        expect(actualState.error).toBeNull();
        expect(actualState.user).toEqual(mockUser);
        expect(actualState.isLoggedIn).toBe(true);
    });

    it('login.rejected', () => {
        const errorMessage = 'Ошибка авторизации: Invalid credentials';
        const action = login.rejected(
            new Error('test'),
            '',
            {email: 'test@example.com', password: '123'},
            {message: errorMessage, name: 'unknown'}
        );

        const actualState = userReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.FAIL);
        expect(actualState.error).toBe(errorMessage);
        expect(actualState.user).toBeNull();
    });

    it('register.fulfilled', () => {
        const action = register.fulfilled(mockUserResponse, '', {
            email: 'test@example.com',
            password: '123',
            name: 'Test',
        });

        const actualState = userReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.SUCCESS);
        expect(actualState.user).toEqual(mockUser);
        expect(actualState.isLoggedIn).toBe(true);
    });

    it('register.rejected', () => {
        const errorMessage = 'Ошибка регистрации: Email already exists';
        const action = register.rejected(
            new Error('test'),
            '',
            {email: 'test@example.com', password: '123', name: 'Test'},
            {message: errorMessage, name: 'unknown'}
        );

        const actualState = userReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.FAIL);
        expect(actualState.error).toBe(errorMessage);
        expect(actualState.user).toBeNull();
        expect(actualState.isLoggedIn).toBe(false);
    });

    it('logout.fulfilled', () => {
        const prevState = {
            user: mockUser,
            status: ApiStatus.SUCCESS,
            error: null,
            isLoggedIn: true,
            isPasswordRestored: false,
        };
        const action = logout.fulfilled(mockApiResponse, '', undefined);

        const actualState = userReducer(prevState, action);

        expect(actualState.user).toBeNull();
        expect(actualState.status).toBe(ApiStatus.INIT);
        expect(actualState.error).toBeNull();
        expect(actualState.isLoggedIn).toBe(false);
    });

    it('getUserDetails.fulfilled', () => {
        const action = getUserDetails.fulfilled(mockUserResponse, '', undefined);

        const actualState = userReducer(initialState, action);

        expect(actualState.user).toEqual(mockUser);
        expect(actualState.isLoggedIn).toBe(true);
    });

    it('updateUserDetails.fulfilled', () => {
        const updateUserRequest: IUpdateUserRequest = {
            email: 'updated@example.com',
            name: 'Updated Name'
        };
        const action = updateUserDetails.fulfilled(mockUserResponse, '', updateUserRequest);

        const actualState = userReducer(initialState, action);

        expect(actualState.user).toEqual(mockUser);
        expect(actualState.isLoggedIn).toBe(true);
    });

    it('forgotPassword.fulfilled', () => {
        const action = forgotPassword.fulfilled(mockApiResponse, '', 'test@example.com');

        const actualState = userReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.SUCCESS);
        expect(actualState.isPasswordRestored).toBe(true);
        expect(actualState.isLoggedIn).toBe(false);
    });

    it('forgotPassword.rejected', () => {
        const errorMessage = 'Ошибка авторизации: Email not found';
        const action = forgotPassword.rejected(
            new Error('test'),
            '',
            'test@example.com',
            {message: errorMessage, name: 'unknown'}
        );

        const actualState = userReducer(initialState, action);

        expect(actualState.status).toBe(ApiStatus.FAIL);
        expect(actualState.error).toBe(errorMessage);
        expect(actualState.user).toBeNull();
        expect(actualState.isLoggedIn).toBe(false);
    });
});
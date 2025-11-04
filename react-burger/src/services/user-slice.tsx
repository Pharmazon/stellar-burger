import {User} from "../types/user";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserResponse} from "../types/userResponse";
import {performGetRequest, performPatchRequest, performPostRequest} from "../utils/request";
import {RegisterRequest} from "../types/registerRequest";
import {LoginRequest} from "../types/loginRequest";
import {ApiResponse} from "../types/apiResponse";
import tokens from "../utils/token";
import {UpdateUserRequest} from "../types/updateUserRequest";

export interface UserData {
    status: 'init' | 'loading' | 'success' | 'fail';
    error: string | null;
    user: User | null;
    isLoggedIn: boolean;
    isPasswordRestored: boolean;
}

const initialState: UserData = {
    user: null,
    status: 'init',
    error: null,
    isLoggedIn: !!(tokens.getRefreshToken() && tokens.getAccessToken()),
    isPasswordRestored: false
};

export const register = createAsyncThunk<UserResponse, RegisterRequest>(
    'user/register',
    async (registerData, thunkAPI) => {
        try {
            const response: UserResponse = await performPostRequest('auth/register', registerData);
            if (!response.user || !response.accessToken || !response.refreshToken) {
                return thunkAPI.rejectWithValue('Достаточные для регистрации данные не были получены с сервера');
            }

            tokens.addRefreshToken(response.refreshToken);
            tokens.addAccessToken(response.accessToken);

            return response;
        } catch (error: any) {
            const errorMessage = error.message
                ? `Ошибка регистрации: ${error.message}`
                : error.toString() || 'Неожиданная ошибка';
            return thunkAPI.rejectWithValue({message: errorMessage, name: 'unknown'});
        }
    });

export const login = createAsyncThunk<UserResponse, LoginRequest>(
    'user/login',
    async (loginData, thunkAPI) => {
        try {
            const response: UserResponse = await performPostRequest('auth/login', loginData);
            if (!response.user || !response.accessToken || !response.refreshToken) {
                return thunkAPI.rejectWithValue('Достаточные для авторизации данные не были получены с сервера');
            }

            tokens.addRefreshToken(response.refreshToken);
            tokens.addAccessToken(response.accessToken);

            return response;
        } catch (error: any) {
            const errorMessage = error.message
                ? `Ошибка авторизации: ${error.message}`
                : error.toString() || 'Неожиданная ошибка';
            return thunkAPI.rejectWithValue({message: errorMessage, name: 'unknown'});
        }
    }
);

export const forgotPassword = createAsyncThunk<ApiResponse, string>(
    'user/forgot/password',
    async (email, thunkAPI) => {
        try {
            const response: ApiResponse = await performPostRequest('password-reset', {
                email: email
            });

            if (!response.success) {
                throw new Error("Не удалось запросить код для восстановления пароля");
            }

            return response;
        } catch (error: any) {
            const errorMessage = error.message
                ? `Ошибка авторизации: ${error.message}`
                : error.toString() || 'Неожиданная ошибка';
            return thunkAPI.rejectWithValue({message: errorMessage, name: 'unknown'});
        }
    }
);

export const getUserDetails = createAsyncThunk<UserResponse>(
    'user/details/get',
    async (_, thunkAPI) => {
        try {
            return (await performGetRequest('auth/user')) as UserResponse;
        } catch (error: any) {
            const errorMessage = error.message
                ? `Ошибка получения пользователя: ${error.message}`
                : error.toString() || 'Неожиданная ошибка';
            return thunkAPI.rejectWithValue({
                message: errorMessage,
                name: 'unknown',
            });
        }
    }
);

export const updateUserDetails = createAsyncThunk<UserResponse, UpdateUserRequest>(
    'user/details/update',
    async (userData, thunkAPI) => {
        try {
            return await performPatchRequest('auth/user', userData) as UserResponse;
        } catch (error: any) {
            const errorMessage = error.message
                ? `Ошибка выхода из приложения: ${error.message}`
                : error.toString() || 'Неожиданная ошибка';
            return thunkAPI.rejectWithValue({message: errorMessage, name: 'unknown'});
        }
    });

export const logout = createAsyncThunk<ApiResponse>(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            const response = await performPostRequest('auth/logout', {token: tokens.getRefreshToken()});

            tokens.removeRefreshToken();
            tokens.removeAccessToken();

            return response;
        } catch (error: any) {
            const errorMessage = error.message
                ? `Ошибка выхода из приложения: ${error.message}`
                : error.toString() || 'Неожиданная ошибка';
            return thunkAPI.rejectWithValue({message: errorMessage, name: 'unknown',});
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearForgotPassword: (state: UserData) => {
            state.isPasswordRestored = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state: UserData) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state: UserData, action: PayloadAction<UserResponse>) => {
                state.status = 'success';
                state.error = null;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(login.rejected, (state: UserData, action: any) => {
                state.status = 'fail';
                state.error = action.payload.message;
                state.user = null;
            })
            .addCase(register.pending, (state: UserData) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(register.fulfilled, (state: UserData, action: PayloadAction<UserResponse>) => {
                state.status = 'success';
                state.error = null;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(register.rejected, (state: UserData, action: any) => {
                state.status = 'fail';
                state.error = action.payload.message;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(logout.pending, (state: UserData) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(logout.rejected, (state: UserData, action: any) => {
                state.status = 'fail';
                state.error = action.payload.message;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(logout.fulfilled, (state: UserData) => {
                state.user = null;
                state.status = 'init';
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(getUserDetails.pending, (state: UserData) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getUserDetails.fulfilled, (state: UserData, action: PayloadAction<UserResponse>) => {
                state.status = 'success';
                state.error = null;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(getUserDetails.rejected, (state: UserData, action: any) => {
                state.status = 'fail';
                state.error = action.payload.message;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(updateUserDetails.pending, (state: UserData) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateUserDetails.fulfilled, (state: UserData, action: PayloadAction<UserResponse>) => {
                state.status = 'success';
                state.error = null;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(updateUserDetails.rejected, (state: UserData, action: any) => {
                state.status = 'fail';
                state.error = action.payload.message;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(forgotPassword.pending, (state: UserData) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state: UserData) => {
                state.status = 'success';
                state.error = null;
                state.isPasswordRestored = true;
                state.isLoggedIn = false;
            })
            .addCase(forgotPassword.rejected, (state: UserData, action: any) => {
                state.status = 'fail';
                state.error = action.payload.message;
                state.user = null;
                state.isLoggedIn = false;
            })
    },
});

export const {clearForgotPassword} = userSlice.actions;
export default userSlice.reducer;
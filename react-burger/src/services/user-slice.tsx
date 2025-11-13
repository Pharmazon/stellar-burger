import {IUser} from "../types/user";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserResponse} from "../types/userResponse";
import {performGetRequest, performPatchRequest, performPostRequest} from "../utils/request";
import {IRegisterRequest} from "../types/registerRequest";
import {ILoginRequest} from "../types/loginRequest";
import {IApiResponse} from "../types/apiResponse";
import tokens from "../utils/token";
import {IUpdateUserRequest} from "../types/updateUserRequest";
import {Status} from "../utils/constants";

export interface IUserData {
    status: Status;
    error: string | null;
    user: IUser | null;
    isLoggedIn: boolean;
    isPasswordRestored: boolean;
}

const initialState: IUserData = {
    user: null,
    status: Status.INIT,
    error: null,
    isLoggedIn: !!(tokens.getRefreshToken() && tokens.getAccessToken()),
    isPasswordRestored: false
};

export const register = createAsyncThunk<IUserResponse, IRegisterRequest>(
    'user/register',
    async (registerData, thunkAPI) => {
        try {
            const response: IUserResponse = await performPostRequest('auth/register', registerData);
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

export const login = createAsyncThunk<IUserResponse, ILoginRequest>(
    'user/login',
    async (loginData, thunkAPI) => {
        try {
            const response: IUserResponse = await performPostRequest('auth/login', loginData);
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

export const forgotPassword = createAsyncThunk<IApiResponse, string>(
    'user/forgot/password',
    async (email, thunkAPI) => {
        try {
            const response: IApiResponse = await performPostRequest('password-reset', {
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

export const getUserDetails = createAsyncThunk<IUserResponse>(
    'user/details/get',
    async (_, thunkAPI) => {
        try {
            return (await performGetRequest('auth/user')) as IUserResponse;
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

export const updateUserDetails = createAsyncThunk<IUserResponse, IUpdateUserRequest>(
    'user/details/update',
    async (userData, thunkAPI) => {
        try {
            return await performPatchRequest('auth/user', userData) as IUserResponse;
        } catch (error: any) {
            const errorMessage = error.message
                ? `Ошибка выхода из приложения: ${error.message}`
                : error.toString() || 'Неожиданная ошибка';
            return thunkAPI.rejectWithValue({message: errorMessage, name: 'unknown'});
        }
    });

export const logout = createAsyncThunk<IApiResponse>(
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
        clearForgotPassword: (state: IUserData) => {
            state.isPasswordRestored = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state: IUserData) => {
                state.status = Status.LOADING;
                state.error = null;
            })
            .addCase(login.fulfilled, (state: IUserData, action: PayloadAction<IUserResponse>) => {
                state.status = Status.SUCCESS;
                state.error = null;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(login.rejected, (state: IUserData, action: any) => {
                state.status = Status.FAIL;
                state.error = action.payload.message;
                state.user = null;
            })
            .addCase(register.pending, (state: IUserData) => {
                state.status = Status.LOADING;
                state.error = null;
            })
            .addCase(register.fulfilled, (state: IUserData, action: PayloadAction<IUserResponse>) => {
                state.status = Status.SUCCESS;
                state.error = null;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(register.rejected, (state: IUserData, action: any) => {
                state.status = Status.FAIL;
                state.error = action.payload.message;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(logout.pending, (state: IUserData) => {
                state.status = Status.LOADING;
                state.error = null;
            })
            .addCase(logout.rejected, (state: IUserData, action: any) => {
                state.status = Status.FAIL;
                state.error = action.payload.message;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(logout.fulfilled, (state: IUserData) => {
                state.user = null;
                state.status = Status.INIT;
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(getUserDetails.pending, (state: IUserData) => {
                state.status = Status.LOADING;
                state.error = null;
            })
            .addCase(getUserDetails.fulfilled, (state: IUserData, action: PayloadAction<IUserResponse>) => {
                state.status = Status.SUCCESS;
                state.error = null;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(getUserDetails.rejected, (state: IUserData, action: any) => {
                state.status = Status.FAIL;
                state.error = action.payload.message;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(updateUserDetails.pending, (state: IUserData) => {
                state.status = Status.LOADING;
                state.error = null;
            })
            .addCase(updateUserDetails.fulfilled, (state: IUserData, action: PayloadAction<IUserResponse>) => {
                state.status = Status.SUCCESS;
                state.error = null;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(updateUserDetails.rejected, (state: IUserData, action: any) => {
                state.status = Status.FAIL;
                state.error = action.payload.message;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(forgotPassword.pending, (state: IUserData) => {
                state.status = Status.LOADING;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state: IUserData) => {
                state.status = Status.SUCCESS;
                state.error = null;
                state.isPasswordRestored = true;
                state.isLoggedIn = false;
            })
            .addCase(forgotPassword.rejected, (state: IUserData, action: any) => {
                state.status = Status.FAIL;
                state.error = action.payload.message;
                state.user = null;
                state.isLoggedIn = false;
            })
    },
});

export const {clearForgotPassword} = userSlice.actions;
export default userSlice.reducer;
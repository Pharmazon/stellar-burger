import {BASE_URL} from "./constants";
import {ApiResponse} from "../types/apiResponse";
import {TokenResponse} from "../types/tokenResponse";
import tokens from "./token";

const updateTokens = async (): Promise<boolean> => {
    const refreshToken = tokens.getRefreshToken();
    if (!refreshToken) {
        return false;
    }

    try {
        const response = await fetch(BASE_URL + 'auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: refreshToken}),
        });

        const refreshTokenResponse: TokenResponse = await response.json();
        if (!refreshTokenResponse.success) {
            return false;
        }

        tokens.addRefreshToken(refreshTokenResponse.refreshToken);
        tokens.addAccessToken(refreshTokenResponse.accessToken);

        return true;
    } catch (e) {
        return false;
    }
};

const checkSuccess = <T extends ApiResponse>(res: T): Promise<T> => {
    if (res && res.success) {
        return Promise.resolve<T>(res);
    }
    return Promise.reject(new Error(`Ответ не success: ${res}`));
};

const performRequest = async <T extends ApiResponse>(
    endpoint: string,
    options?: RequestInit
): Promise<T> => {

    const makeRequest = async (): Promise<T> => {
        const token = tokens.getAccessToken();

        const headers = {
            ...options?.headers,
            ...(token && {Authorization: token}),
        };

        const response = await fetch(BASE_URL + endpoint, {
            ...options,
            headers,
        });

        if (response.ok) {
            const data: T = await response.json();
            return checkSuccess(data);
        }

        if (response.status === 401) {
            const isUpdated = await updateTokens();
            if (isUpdated) {
                return makeRequest();
            }
        }

        const errorText = await response.text();
        throw new Error(`Ошибка ${response.status}: ${response.statusText} — ${errorText}`);
    }

    return makeRequest();
};

export const performGetRequest = async <T extends ApiResponse>(endpoint: string) => {
    return performRequest<T>(endpoint);
};

export const performPostRequest = async <T extends ApiResponse>(
    endpoint: string,
    body: any
): Promise<T> => {
    return performRequest<T>(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
};

export const performPatchRequest = async <T extends ApiResponse>(
    endpoint: string,
    body: any
): Promise<T> => {
    return performRequest<T>(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
};
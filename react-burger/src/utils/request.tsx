import {BASE_URL} from "./constants";
import {IApiResponse} from "../types/apiResponse";
import {ITokenResponse} from "../types/tokenResponse";
import tokens from "./token";

export const performGetRequest = async <T extends IApiResponse>(endpoint: string) => {
    return performRequest<T>(endpoint);
};

export const performPostRequest = async <T extends IApiResponse>(
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

export const performPatchRequest = async <T extends IApiResponse>(
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

export const updateTokens = async (): Promise<boolean> => {
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

        const refreshTokenResponse: ITokenResponse = await response.json();
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

const checkSuccess = <T extends IApiResponse>(res: T): Promise<T> => {
    if (res && res.success) {
        return Promise.resolve<T>(res);
    }
    return Promise.reject(new Error(`Ответ не success: ${res}`));
};

const performRequest = async <T extends IApiResponse>(
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
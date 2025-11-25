import Cookies from "js-cookie";

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

const addAccessToken = (token: string): void => {
    const expires = new Date(Date.now() + 20 * 60 * 1000); // 20 минут
    Cookies.set(ACCESS_TOKEN, token, {expires});
};

const addRefreshToken = (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN, token);
};

const getRefreshToken = (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN);
};

const getAccessToken = (): string | undefined => {
    return Cookies.get(ACCESS_TOKEN);
};

const removeRefreshToken = () => {
    localStorage.removeItem(REFRESH_TOKEN)
}

const removeAccessToken = (): void => {
    Cookies.remove(ACCESS_TOKEN)
}

const getCleanAccessToken = () => {
    let accessToken = getAccessToken();
    return accessToken?.startsWith('Bearer ')
        ? accessToken?.replace('Bearer ', '')
        : accessToken;
}

export default {
    addAccessToken,
    addRefreshToken,
    getAccessToken,
    getRefreshToken,
    removeAccessToken,
    removeRefreshToken,
    getCleanAccessToken
};
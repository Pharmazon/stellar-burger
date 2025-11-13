import {IApiResponse} from './apiResponse';

export interface ITokenResponse extends IApiResponse {
    accessToken: string;
    refreshToken: string;
}

import {IApiResponse} from "./apiResponse";
import {IUser} from "./user";

export interface IUserResponse extends IApiResponse {
    accessToken?: string;
    refreshToken?: string;
    user: IUser;
}
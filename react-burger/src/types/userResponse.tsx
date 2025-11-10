import {ApiResponse} from "./apiResponse";
import {User} from "./user";

export interface UserResponse extends ApiResponse {
    accessToken?: string;
    refreshToken?: string;
    user: User;
}
import {IApiResponse} from "./apiResponse";
import {IFeedOrder} from "./feedOrder";

export interface IFeedData extends IApiResponse {
    orders: IFeedOrder[];
    total?: number;
    totalToday?: number;
}

import {IApiResponse} from './apiResponse';

export interface IOrderResponse extends IApiResponse {
    name: string;
    order: IOrder;
}

export interface IOrder {
    number: number;
}

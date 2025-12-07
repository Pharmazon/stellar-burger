import {FeedOrderStatus} from "../utils/constants";

export interface IFeedOrder {
    ingredients: string[];
    _id: string;
    status: FeedOrderStatus;
    name: string;
    owner: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

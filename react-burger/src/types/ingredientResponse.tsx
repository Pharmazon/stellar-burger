import {IApiResponse} from "./apiResponse";
import {IIngredient} from "./ingredient";

export interface IIngredientResponse extends IApiResponse {
    data: Array<IIngredient>;
}
import {ApiResponse} from "./apiResponse";
import {Ingredient} from "./ingredient";

export interface IngredientResponse extends ApiResponse {
    data: Ingredient[];
}
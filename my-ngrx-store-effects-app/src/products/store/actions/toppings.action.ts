import { Action } from "@ngrx/store";
import { Topping } from "../../models/topping.model";

// toppings
export const LOAD_TOPPINGS = "[Products] Load Toppings";
export const LOAD_TOPPINGS_SUCCESS = "[Products] Load Toppings Success";
export const LOAD_TOPPINGS_FAIL = "[Products] Load Toppings Fail";
export const VISUALIZE_TOPPINGS = "[Products] Visualize Toppings";

export class LoadToppings implements Action {
  readonly type = LOAD_TOPPINGS;
}

export class LoadToppingsFail implements Action {
  readonly type = LOAD_TOPPINGS_FAIL;
  constructor(public payload: any) {}
}

export class LoadToppingsSuccess implements Action {
  readonly type = LOAD_TOPPINGS_SUCCESS;
  constructor(public payload: Topping[]) {}
}
export class VisualizeToppings implements Action {
  readonly type = VISUALIZE_TOPPINGS;
  constructor(public payload: number[]) {}
}

// action type
export type LoadToppingsAction =
  | LoadToppings
  | LoadToppingsFail
  | LoadToppingsSuccess
  | VisualizeToppings;

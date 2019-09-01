import * as fromToppings from "../actions/toppings.action";
import { Topping } from "../../models/topping.model";

export interface ToppingsState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: []
};

export function reducer(
  state = initialState,
  action: fromToppings.LoadToppingsAction
): ToppingsState {
  switch (action.type) {
    case fromToppings.VISUALIZE_TOPPINGS: {
      const selectedToppings = action.payload;
      return {
        ...state,
        selectedToppings
      };
    }
    case fromToppings.LOAD_TOPPINGS: {
      return { ...state, loading: true };
    }
    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;
      const entities = toppings.reduce(
        (entities: { [id: number]: Topping }, topping: Topping) => {
          return {
            ...entities,
            [topping.id]: topping
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        entities,
        loaded: true,
        loading: false
      };
    }
    case fromToppings.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
  }
  return state;
}

// these are NOT selectors. they're functions that will be used to compose selectors in toppings.selector.ts
// there should be one for each action type
export const getToppingEntitiesFromState = (state: ToppingsState) =>
  state.entities;
export const getToppingLoadedFromState = (state: ToppingsState) => state.loaded;
export const getToppingLoadingFromState = (state: ToppingsState) =>
  state.loading;
export const getSelectedToppingsFromState = (state: ToppingsState) =>
  state.selectedToppings;

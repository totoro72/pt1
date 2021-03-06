import { Actions, Effect } from "@ngrx/effects";
import { switchMap, map, tap, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { Injectable } from "@angular/core";
import * as fromRoot from "../../../app/store";
import * as pizzasActions from "../actions/pizzas.action";
import * as fromServies from "../../services";

// basically talks to service and get stuff and then dispatch success/fail actions

@Injectable()
export class PizzasEffects {
  constructor(
    // pizzaAction$: pizzasActions.PizzasAction, // todo what if this???
    private actions$: Actions,
    private pizzaService: fromServies.PizzasService
  ) {}

  // takes effect upon this action
  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzasActions.LOAD_PIZZAS).pipe(
    // switchmap lets us switch to a new observable
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        map(pizzas => new pizzasActions.LoadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzasActions.LoadPizzasFail(error)))
      );
    })
  );
  // an effect that listens to the createPizza action
  @Effect()
  createPizza$ = this.actions$.ofType(pizzasActions.CREATE_PIZZA).pipe(
    map((action: pizzasActions.CreatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService.createPizza(pizza).pipe(
        map(pizza => new pizzasActions.CreatePizzaSuccess(pizza)),
        catchError(error => of(new pizzasActions.CreatePizzaFail(error)))
      );
    })
  );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzasActions.UPDATE_PIZZA).pipe(
    map((action: pizzasActions.UpdatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService.updatePizza(pizza).pipe(
        map(pizza => new pizzasActions.UpdatePizzaSuccess(pizza)),
        catchError(error => of(new pizzasActions.UpdatePizzaFail(error)))
      );
    })
  );

  @Effect()
  removePizza$ = this.actions$.ofType(pizzasActions.REMOVE_PIZZA).pipe(
    map((action: pizzasActions.RemovePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService.removePizza(pizza).pipe(
        // the server won't give us the pizza back
        map(() => new pizzasActions.RemovePizzaSuccess(pizza)),
        catchError(error => of(new pizzasActions.RemovePizzaFail(error)))
      );
    })
  );

  /* navigation effects */
  // NOTE this action is also listened for in pizzas.reducer
  // the reducer will pick it up FIRST, then this effect follows afterwards
  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType(pizzasActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzasActions.CreatePizzaSuccess) => action.payload),
      map(pizza => new fromRoot.Go({ path: ["/products", pizza.id] }))
    );

  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(
      pizzasActions.UPDATE_PIZZA_SUCCESS,
      pizzasActions.REMOVE_PIZZA_SUCCESS
    )
    .pipe(map(action => new fromRoot.Go({ path: ["/products"] })));
}

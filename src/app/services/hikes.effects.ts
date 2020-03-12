import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  fetch,
  fetchFailure,
  fetchSuccess,
  fetchMarkLoading,
  fetchFromRemote,
  add,
  addSuccess,
  addFailure,
  remove,
  removeFailure,
  removeSuccess,
  removeLocal,
  removeFromRemote
} from "./hikes.actions";
import { of } from "rxjs";
import { map, mergeMap, concatMap, catchError, delay } from "rxjs/operators";
import { HikesService } from "./hikes.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class HikeEffects {
  constructor(
    private actions: Actions,
    private hikesService: HikesService,
    private snackBar: MatSnackBar
  ) {}

  fetch = createEffect(() =>
    this.actions.pipe(
      ofType(fetch),
      concatMap(() => [fetchMarkLoading(), fetchFromRemote()])
    )
  );

  fetchFromRemote = createEffect(() =>
    this.actions.pipe(
      ofType(fetchFromRemote),
      mergeMap(() =>
        this.hikesService.fetchHikes().pipe(
          delay(1000),
          map(hikes => fetchSuccess({ hikes })),
          catchError(err => {
            console.error(`Failed to load hikes`, err);
            this.snackBar.open("Failed to load hikes", null, {
              duration: 3000
            });
            return of(fetchFailure());
          })
        )
      )
    )
  );

  add = createEffect(() =>
    this.actions.pipe(
      ofType(add),
      mergeMap(({ hike, tempHikeId }) =>
        this.hikesService.addHike(hike).pipe(
          delay(1000),
          map(hike => addSuccess({ hike, tempHikeId })),
          catchError(err => {
            console.error(`Failed to add hike`, err);
            this.snackBar.open("Failed to add hike", null, {
              duration: 3000
            });
            return of(addFailure({ tempHikeId }));
          })
        )
      )
    )
  );

  remove = createEffect(() =>
    this.actions.pipe(
      ofType(remove),
      concatMap(({ hike }) => [
        removeLocal({ hikeId: hike._id }),
        removeFromRemote({ hike })
      ])
    )
  );

  removeLocal = createEffect(() =>
    this.actions.pipe(
      ofType(remove),
      map(({ hike }) => removeLocal({ hikeId: hike._id }))
    )
  );

  removeFromRemote = createEffect(() =>
    this.actions.pipe(
      ofType(removeFromRemote),
      delay(1000),
      mergeMap(({ hike }) =>
        this.hikesService.removeHike(hike._id).pipe(
          map(() => removeSuccess({ hikeId: hike._id })),
          catchError(err => {
            console.error(`Failed to remove hike`, err);
            this.snackBar.open("Failed to remove hike", null, {
              duration: 3000
            });
            return of(removeFailure({ hike }));
          })
        )
      )
    )
  );
}

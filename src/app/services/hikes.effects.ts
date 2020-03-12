import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  fetch,
  fetchFailure,
  fetchSuccess,
  add,
  addSuccess,
  addFailure,
  remove,
  removeFailure,
  removeSuccess
} from "./hikes.actions";
import { map, mergeMap, catchError, delay } from "rxjs/operators";
import { HikesService } from "./hikes.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class HikeEffects {
  constructor(
    private actions: Actions,
    private hikesService: HikesService,
    private snackBar: MatSnackBar
  ) {}

  fetchHikes = createEffect(() =>
    this.actions.pipe(
      ofType(fetch),
      mergeMap(() =>
        this.hikesService.fetchHikes().pipe(
          delay(5000),
          map(hikes => fetchSuccess({ hikes })),
          catchError(err => {
            console.error(`Failed to load hikes`, err);
            this.snackBar.open("Failed to load hikes", null, {
              duration: 3000
            });
            return () => fetchFailure();
          })
        )
      )
    )
  );

  addHike = createEffect(() =>
    this.actions.pipe(
      ofType(add),
      mergeMap(({ hike, tempHikeId }) =>
        this.hikesService.addHike(hike).pipe(
          delay(5000),
          map(hike => addSuccess({ hike })),
          catchError(err => {
            console.error(`Failed to add hike`, err);
            this.snackBar.open("Failed to add hike", null, {
              duration: 3000
            });
            return () => addFailure({ tempHikeId });
          })
        )
      )
    )
  );

  deleteHike = createEffect(() =>
    this.actions.pipe(
      ofType(remove),
      mergeMap(({ hikeId }) =>
        this.hikesService.removeHike(hikeId).pipe(
          delay(5000),
          map(() => removeSuccess({ hikeId })),
          catchError(err => {
            console.error(`Failed to remove hike`, err);
            this.snackBar.open("Failed to remove hike", null, {
              duration: 3000
            });
            return () => removeFailure({ hikeId });
          })
        )
      )
    )
  );
}

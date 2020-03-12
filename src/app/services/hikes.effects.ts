import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  fetch,
  fetchFailure,
  fetchSuccess,
  fetchStart,
  add,
  addSuccess,
  addFailure,
  remove,
  removeFailure,
  removeSuccess,
  removeLocal
} from "./hikes.actions";
import { of } from "rxjs";
import { map, mergeMap, mergeAll, catchError, delay } from "rxjs/operators";
import { HikesService } from "./hikes.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class HikeEffects {
  constructor(
    private actions: Actions,
    private hikesService: HikesService,
    private snackBar: MatSnackBar
  ) {}

  fetchHikesStart = createEffect(() =>
    this.actions.pipe(
      ofType(fetch),
      map(() => fetchStart())
    )
  );

  fetchHikes = createEffect(() =>
    this.actions.pipe(
      ofType(fetch),
      map(() => fetchStart()),
      delay(1000),
      map(() =>
        this.hikesService.fetchHikes().pipe(
          map(hikes => fetchSuccess({ hikes })),
          catchError(err => {
            console.error(`Failed to load hikes`, err);
            this.snackBar.open("Failed to load hikes", null, {
              duration: 3000
            });
            return of(fetchFailure());
          })
        )
      ),
      mergeAll()
    )
  );

  addHike = createEffect(() =>
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

  removeHikeLocal = createEffect(() =>
    this.actions.pipe(
      ofType(remove),
      mergeMap(({ hike }) =>
        this.hikesService.removeHike(hike._id).pipe(
          delay(1000),
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

  removeHike = createEffect(() =>
    this.actions.pipe(
      ofType(remove),
      map(({ hike }) => removeLocal({ hikeId: hike._id }))
    )
  );
}

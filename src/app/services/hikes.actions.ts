import { createAction, props } from "@ngrx/store";
import { IHike } from "./hikes.service";

export const add = createAction(
  "[Hike] Add",
  props<{ hike: IHike; tempHikeId: string }>()
);
export const addLocal = createAction(
  "[Hike] Add Local",
  props<{ hike: IHike; tempHikeId: string }>()
);
export const addSuccess = createAction(
  "[Hike] Add Success",
  props<{ hike: IHike; tempHikeId: string }>()
);
export const addFailure = createAction(
  "[Hike] Add Failure",
  props<{ tempHikeId: string }>()
);
export const fetch = createAction("[Hike] Fetch");
export const fetchStart = createAction("[Hike] Fetch Start");
export const fetchSuccess = createAction(
  "[Hike] Fetch Success",
  props<{ hikes: IHike[] }>()
);
export const fetchFailure = createAction("[Hike] Fetch Failure");
export const remove = createAction("[Hike] Remove", props<{ hike: IHike }>());
export const removeSuccess = createAction(
  "[Hike] Remove Success",
  props<{ hikeId: string }>()
);
export const removeFailure = createAction(
  "[Hike] Remove Failure",
  props<{ hike: IHike }>()
);
export const removeLocal = createAction(
  "[Hike] Remove Local",
  props<{ hikeId: string }>()
);

import { createSelector } from "@ngrx/store";
import { IHike } from "./hikes.service";

export interface HikesState {
  hikes: IHike[];
}

const selectHikesFromStore = (state: HikesState) => state.hikes;

export const selectHikes = createSelector(
  selectHikesFromStore,
  (hikes: IHike[]) => hikes
);

import { createSelector } from "@ngrx/store";
import { IHike } from "./hikes.service";

export interface HikesState {
  hikes: {
    list: IHike[];
    initialLoading: boolean;
    loading: boolean;
  };
}

const selectHikesListFromStore = (state: HikesState) => state.hikes.list;
const selectHikesInitialLoadingFromStore = (state: HikesState) =>
  state.hikes.initialLoading;
const selectHikesLoadingFromStore = (state: HikesState) => state.hikes.loading;

export const selectHikesList = createSelector(
  selectHikesListFromStore,
  (list: IHike[]) => list
);

export const selectHikesInitialLoading = createSelector(
  selectHikesInitialLoadingFromStore,
  (initialLoading: boolean) => initialLoading
);

export const selectHikesLoading = createSelector(
  selectHikesLoadingFromStore,
  (loading: boolean) => loading
);

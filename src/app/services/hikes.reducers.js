import { createReducer, on } from "@ngrx/store";
import {
  addSuccess,
  removeSuccess,
  fetchSuccess,
  addFailure,
  removeFailure
} from "./hikes.actions";

export const initialState = [];

const _hikeReducer = createReducer(
  initialState,
  on(addSuccess, (state, { hike }) => [...state, { ...hike }]),
  on(fetchSuccess, (state, { hikes }) => [...hikes]),
  on(removeSuccess, (state, { hikeId }) => [
    ...state.filter(h => h._id !== hikeId)
  ])
);

export function hikeReducer(state, action) {
  return _hikeReducer(state, action);
}

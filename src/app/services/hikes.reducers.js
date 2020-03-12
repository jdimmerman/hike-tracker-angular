import { createReducer, on } from "@ngrx/store";
import {
  addSuccess,
  addLocal,
  addFailure,
  removeLocal,
  removeFailure,
  fetchSuccess,
  fetchStart,
  fetchFailure
} from "./hikes.actions";

export const initialState = {
  list: [],
  initialLoading: true,
  loading: false
};

const _hikeReducer = createReducer(
  initialState,
  on(addSuccess, (state, { hike, tempHikeId }) => ({
    ...state,
    list: [...state.list.filter(h => h._tempId !== tempHikeId), { ...hike }]
  })),
  on(addLocal, (state, { hike, tempHikeId }) => ({
    ...state,
    list: [...state.list, { ...hike, _tempId: tempHikeId }]
  })),
  on(addFailure, (state, { tempHikeId }) => ({
    ...state,
    list: [...state.list.filter(h => h._tempId !== tempHikeId)]
  })),
  on(fetchStart, state => ({ ...state, loading: true })),
  on(fetchSuccess, (state, { hikes }) => ({
    ...state,
    list: [...hikes],
    initialLoading: false,
    loading: false
  })),
  on(fetchFailure, state => ({ ...state, loading: false })),
  on(removeLocal, (state, { hikeId }) => ({
    ...state,
    list: state.list.filter(h => h._id !== hikeId)
  })),
  on(removeFailure, (state, { hike }) => ({
    ...state,
    list: [...state.list, { ...hike }]
  }))
);

export function hikeReducer(state, action) {
  return _hikeReducer(state, action);
}

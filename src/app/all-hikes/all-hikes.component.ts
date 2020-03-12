import { Component, OnInit } from "@angular/core";
import { IHike } from "../services/hikes.service";
import { Observable, of } from "rxjs";
import {
  HikesState,
  selectHikesList,
  selectHikesInitialLoading,
  selectHikesLoading
} from "../services/hikes.selectors";
import { Store } from "@ngrx/store";
import {
  fetch,
  remove,
  fetchStart,
  removeLocal
} from "../services/hikes.actions";

@Component({
  selector: "app-all-hikes",
  templateUrl: "./all-hikes.component.html",
  styleUrls: ["./all-hikes.component.scss"]
})
export class AllHikesComponent implements OnInit {
  hikes: Observable<IHike[]>;
  initialLoading: boolean;
  loading: boolean;
  displayedColumns: string[] = [
    "name",
    "hikeDistanceMiles",
    "distanceFromBostonHours",
    "delete"
  ];

  constructor(private store: Store<HikesState>) {}

  ngOnInit(): void {
    this.store
      .select(state => selectHikesInitialLoading(state))
      .subscribe({
        next: v => (this.initialLoading = v)
      });
    this.store
      .select(state => selectHikesLoading(state))
      .subscribe({
        next: v => (this.loading = v)
      });
    this.hikes = this.store.select(state => selectHikesList(state));
  }

  refreshHikes(): void {
    this.store.dispatch(fetch());
  }

  deleteHike(hike: IHike): void {
    this.store.dispatch(remove({ hike }));
  }
}

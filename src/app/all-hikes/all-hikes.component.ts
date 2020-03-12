import { Component, OnInit } from "@angular/core";
import { IHike } from "../services/hikes.service";
import { Observable } from "rxjs";
import { HikesState } from "../services/hikes.selectors";
import { Store } from "@ngrx/store";
import { fetch, remove } from "../services/hikes.actions";

@Component({
  selector: "app-all-hikes",
  templateUrl: "./all-hikes.component.html",
  styleUrls: ["./all-hikes.component.scss"]
})
export class AllHikesComponent implements OnInit {
  hikes: Observable<IHike[]>;
  displayedColumns: string[] = [
    "name",
    "hikeDistanceMiles",
    "distanceFromBostonHours",
    "delete"
  ];

  constructor(private store: Store<HikesState>) {}

  ngOnInit(): void {
    this.hikes = this.store.select(state => state.hikes);
  }

  refreshHikes(): void {
    this.store.dispatch(fetch());
  }

  deleteHike(hikeId: string): void {
    this.store.dispatch(remove({ hikeId }));
  }
}

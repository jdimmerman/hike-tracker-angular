import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { HikesState } from "./services/hikes.selectors";
import { fetch } from "./services/hikes.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "hike-tracker-angular";

  constructor(private store: Store<HikesState>) {}

  ngOnInit(): void {
    this.store.dispatch(fetch());
  }
}

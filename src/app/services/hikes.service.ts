import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

export interface IHike {
  _id?: string | null;
  name: string;
  distanceFromBostonHours: number;
  hikeDistanceMiles: number;
}

@Injectable({
  providedIn: "root"
})
export class HikesService {
  rootUrl: string = "http://localhost:8081/api/hike";

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.fetchHikes();
    // deal with loading initial
  }

  fetchHikes(): Observable<IHike[]> {
    return this.http.get<IHike[]>(this.rootUrl);
  }

  addHike(hike: IHike): Observable<IHike> {
    return this.http.put<IHike>(this.rootUrl, hike);
  }

  removeHike(hikeId: string): Observable<Object> {
    return this.http.delete(`${this.rootUrl}/${hikeId}`);
  }
}

/*
const sleep = (ms: number) => {
  return new Promise((resolve): void => {
    setTimeout(resolve, ms);
  });
}
*/

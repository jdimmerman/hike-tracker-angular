import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v1 as uuidv1 } from 'uuid';

export interface IHike {
  _id?: number | null;
  name: string;
  distanceFromBostonHours: number;
  hikeDistanceMiles: number;
}

@Injectable({
  providedIn: 'root'
})
export class HikesService {
  rootUrl: string = 'http://localhost:8081/api/hike';
  private _hikes: BehaviorSubject<IHike[]> = new BehaviorSubject<IHike[]>([]);
  readonly hikes: Observable<IHike[]> = this._hikes.asObservable();
  private _loadingInitial: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly loadingInitial: Observable<boolean> = this._loadingInitial.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.fetchHikes(true);
  }

  async fetchHikes(initialLoad: boolean = false): Promise<void> {
    if (initialLoad) this._loadingInitial.next(true);
    const fetchedHikes = await this.http.get<IHike[]>(this.rootUrl).toPromise();
    this._hikes.next(fetchedHikes);
    if (initialLoad) this._loadingInitial.next(false);
  }

  async addHike(hike: IHike): Promise<void> {
    const tempId = uuidv1();
    this._hikes.next([
      ...this._hikes.value,
      {...hike, _id: tempId}
    ]);
    try {
      const newServerHike = await this.http.put<IHike>(this.rootUrl, hike).toPromise();
      this._hikes.next([
        ...this._hikes.value.filter((h) => h._id !==tempId),
        {...newServerHike},
      ]);
    } catch (err) {
      this.snackBar.open('Failed to add hike', null, {
        duration: 3000
      });
      console.error(`Failed to add hike with name '${name}'`, err);
      this._hikes.next([
        ...this._hikes.value.filter((h) => h._id !==tempId),
      ]);
    }
  }

  async deleteHike(hikeId: number): Promise<void> {
    const deletedHike = this._hikes.value.find((h) => h._id === hikeId);
    this._hikes.next([
      ...this._hikes.value.filter((h) => h._id !== hikeId)
    ]);
    try {
      await this.http.delete(`${this.rootUrl}/${hikeId}`).toPromise();
    } catch (err) {
      this.snackBar.open('Failed to delete hike', null, {
        duration: 3000
      });
      console.error(`Failed to delete hike with id '${hikeId}'`, err);
      if (deletedHike) {
        this._hikes.next([
          ...this._hikes.value,
          {...deletedHike},
        ]);
      }
    }
  }
}

/*
const sleep = (ms: number) => {
  return new Promise((resolve): void => {
    setTimeout(resolve, ms);
  });
}
*/

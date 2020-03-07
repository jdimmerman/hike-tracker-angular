import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IHike {
  id?: number | null;
  name: string;
  distanceFromBostonHours: number;
  hikeDistanceMiles: number;
}

@Injectable({
  providedIn: 'root'
})
export class HikesService {
  constructor(private http: HttpClient) {}
  rootUrl: string = 'http://localhost:8081/api/hike';

  getHikes(): Observable<IHike[]> {
    return this.http.get<IHike[]>(this.rootUrl);
  }

  addHike(hike: IHike): Observable<Object> {
    return this.http.put(this.rootUrl, hike);
  }

  deleteHike(hikeId: number): Observable<Object> {
    return this.http.delete(`${this.rootUrl}/${hikeId}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { HikesService, IHike } from '../hikes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-hikes',
  templateUrl: './all-hikes.component.html',
  styleUrls: ['./all-hikes.component.scss']
})
export class AllHikesComponent implements OnInit {
  hikes: Observable<IHike[]>;
  deleteHikeFailed: boolean = false;
  deleteHikeFailedTimeout: number;
  isDeleting: boolean = false;
  displayedColumns: string[] = ['name', 'hikeDistanceMiles', 'distanceFromBostonHours', 'delete'];

  constructor(private hikesService: HikesService) { }

  ngOnInit(): void {
    this.refreshHikes();
  }

  refreshHikes(): Observable<IHike[]> {
    const getHikesObservable = this.hikesService.getHikes();
    this.hikes = getHikesObservable;
    return getHikesObservable;
  }

  async deleteHike(hikeId: any): Promise<void> {
    clearTimeout(this.deleteHikeFailedTimeout);
    this.deleteHikeFailed = false;
    this.isDeleting = true;
    try {
      await this.hikesService.deleteHike(hikeId).toPromise();
      await this.refreshHikes().toPromise();
    } catch(err) {
      this.deleteHikeFailed = true;
      this.deleteHikeFailedTimeout = window.setTimeout(() => this.deleteHikeFailed = false, 5000);
    }
    setTimeout(() => this.isDeleting = false, 50);
  }
}

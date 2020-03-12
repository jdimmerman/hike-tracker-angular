import { Component, OnInit } from '@angular/core';
import { HikesService, IHike } from '../hikes.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-hikes',
  templateUrl: './all-hikes.component.html',
  styleUrls: ['./all-hikes.component.scss']
})
export class AllHikesComponent implements OnInit {
  hikes: Observable<IHike[]>;
  displayedColumns: string[] = ['name', 'hikeDistanceMiles', 'distanceFromBostonHours', 'delete'];
  loadingInitial: boolean;

  constructor(private hikesService: HikesService, private snackBar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    this.hikes = this.hikesService.hikes;
    this.hikesService.loadingInitial.subscribe({
      next: (v) => this.loadingInitial = v,
    });
    await this.refreshHikes();
  }

  async refreshHikes(): Promise<void> {
    await this.hikesService.fetchHikes();
  }

  async deleteHike(hikeId: any): Promise<void> {
    this.hikesService.deleteHike(hikeId);
  }
}

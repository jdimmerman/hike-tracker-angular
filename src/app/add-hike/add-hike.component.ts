import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HikesService, IHike } from '../hikes.service';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-hike',
  templateUrl: './add-hike.component.html',
  styleUrls: ['./add-hike.component.scss']
})
export class AddHikeComponent implements OnInit {
  addHikeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hikeDistanceMiles: new FormControl(0, [Validators.required, this.positiveNumber()]),
    distanceFromBostonHours: new FormControl(0, [Validators.required, this.positiveNumber()]),
  });
  isSubmitting: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private hikesService: HikesService,
    private router: Router,
  ) { }

  ngOnInit(): void { this.isSubmitting.next(false) }

  async addHike(): Promise<void> {
    const newHike: IHike = {
      name: this.addHikeForm.get('name').value,
      hikeDistanceMiles: this.addHikeForm.get('hikeDistanceMiles').value,
      distanceFromBostonHours: this.addHikeForm.get('distanceFromBostonHours').value,
    }
    this.isSubmitting.next(true)
    await this.hikesService.addHike(newHike);
    this.isSubmitting.next(false)
    this.router.navigateByUrl('/');
  }

  formControlHasError(formControlName: string, errorName: string) : boolean {
    return this.addHikeForm.get(formControlName).errors &&
      this.addHikeForm.get(formControlName).errors[errorName];
  }

  positiveNumber(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
      const notPositive: boolean = control.value <= 0;
      return notPositive ? {'notPositive': true} : null;
    };
  }
}

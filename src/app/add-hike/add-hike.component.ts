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

@Component({
  selector: 'app-add-hike',
  templateUrl: './add-hike.component.html',
  styleUrls: ['./add-hike.component.scss']
})
export class AddHikeComponent implements OnInit {
  isSubmitting: boolean = false;
  submitFailed: boolean = false;
  lastSubmitFailedTimeout: number;
  addHikeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hikeDistanceMiles: new FormControl(0, [Validators.required, this.positiveNumber()]),
    distanceFromBostonHours: new FormControl(0, [Validators.required, this.positiveNumber()]),
  });

  constructor(
    private hikesService: HikesService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  async addHike(): Promise<void> {
    clearTimeout(this.lastSubmitFailedTimeout);
    this.submitFailed = false;
    const newHike: IHike = {
      name: this.addHikeForm.get('name').value,
      hikeDistanceMiles: this.addHikeForm.get('hikeDistanceMiles').value,
      distanceFromBostonHours: this.addHikeForm.get('distanceFromBostonHours').value,
    }
    this.isSubmitting = true;
    try {
      await this.hikesService.addHike(newHike).toPromise();
      this.router.navigateByUrl('/');
    } catch(err) {
      this.submitFailed = true;
      this.lastSubmitFailedTimeout = window.setTimeout(() => this.submitFailed = false, 5000)
    }
    this.isSubmitting = false;
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

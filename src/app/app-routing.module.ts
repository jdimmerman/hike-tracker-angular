import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllHikesComponent } from './all-hikes/all-hikes.component';
import { AddHikeComponent } from './add-hike/add-hike.component';

const routes: Routes = [
   { path: '', component: AllHikesComponent },
   { path: 'add-hike', component: AddHikeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

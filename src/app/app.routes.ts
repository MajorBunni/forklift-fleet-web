import { Routes } from '@angular/router';
import { ForkliftMovementComponent } from './forklift-movement/forklift-movement.component';
import { ForkliftListComponent } from './forklift-list/forklift-list.component';

export const routes: Routes = [
  { path: '', component: ForkliftListComponent },
  { path: 'movement', component: ForkliftMovementComponent }
];

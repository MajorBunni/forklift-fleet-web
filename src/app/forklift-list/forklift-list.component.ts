import { DatePipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddForklift, Forklift } from '../../models/forklift.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForkliftService } from '../forklift/forklift.service';
import moment from 'moment';
import { RouterOutlet } from '@angular/router';
import { ForkliftList } from '../forklift/forklift.component';
import { ForkliftMovementComponent } from '../forklift-movement/forklift-movement.component';

@Component({
  selector: 'app-forklift-list',
  standalone: true,
  imports: [
    RouterOutlet, NgFor, ForkliftList,
    FormsModule, ReactiveFormsModule,
    ForkliftListComponent,
    ForkliftMovementComponent
  ],
  templateUrl: './forklift-list.component.html',
  providers: [ForkliftService],
})
export class ForkliftListComponent implements OnInit {
  datePipe = new DatePipe('en-GB')

  forklifts: Forklift[] = []
  forkliftsForm = new FormGroup({
    name: new FormControl<string>(''),
    modelNumber: new FormControl<string>(''),
    manufacturingDate: new FormControl<string>(''),
  })

  constructor(private forkliftService: ForkliftService) { }

  ngOnInit(): void {
    this.getForkliftsData()
    this.forkliftsForm.reset()
  }


  // Function to get the latest Forklift data from backend
  getForkliftsData(): void {
    this.forkliftService.getForklifts()
      .subscribe((data: Forklift[]) => {
        this.forklifts = data
      })
  }

  // Function for adding to the Forklift data in the backend
  addToForkliftsData(addForklift: AddForklift): void {
    this.forkliftService.addForklift(addForklift)
      .subscribe({
        next: () => {
          this.getForkliftsData()
          this.forkliftsForm.reset()
        }
      })
  }

  // Function to load the forklift data stored locally in a JSON file
  loadForkliftsFromJSON(): void {
    this.forkliftService.loadForklifts('assets/json/forkliftData.json')
      .subscribe((forkliftData: AddForklift[]) => {
        for (const forklift of forkliftData) {
          this.addToForkliftsData(forklift)
        }
      })
  }


  // Function to submit a form and add FOrklift data to backend
  onFormSubmit() {
    const formValues = this.forkliftsForm.value;

    if (formValues.name && formValues.modelNumber && formValues.manufacturingDate) {
      const makeDate = moment(new Date(formValues.manufacturingDate))

      const addForkliftRequest: AddForklift = {
        name: formValues.name,
        modelNumber: formValues.modelNumber,
        manufacturingDate: makeDate.format('YYYY-MM-DD[T]hh:mm:ss'),
      }

      this.addToForkliftsData(addForkliftRequest)
    }
  }
}

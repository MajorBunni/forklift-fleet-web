import { Component, Input } from "@angular/core";
import { Forklift } from "../../models/forklift.model";
import { DatePipe } from "@angular/common";
import moment from "moment";
import { ForkliftService } from "./forklift.service";

@Component({
  selector: 'forklift-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './forklift.component.html',
  providers: [ForkliftService],
})
export class ForkliftList {
  @Input() forklifts: Forklift[] = []
  @Input() getForkliftsData!: () => void

  constructor(private forkliftService: ForkliftService) {  }
  
  // Function to delete Forklift data from backend
  deleteForkliftData(id: string): void {
    this.forkliftService.deleteForklift(id)
      .subscribe({
        next: () => {
          this.getForkliftsData()
        }
      })
  }

  calculateAge(givenDate: Date) {
    const mDate = moment(givenDate)
    const now = moment()

    const years = now.diff(mDate, 'year')
    mDate.add(years, 'years')

    const months = now.diff(mDate, 'months')
    mDate.add(months, 'months')

    const days = now.diff(mDate, 'days')

    return {
      'years': years,
      'months': months,
      'days': days,
    }
  }
}
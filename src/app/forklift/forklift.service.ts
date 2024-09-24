import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddForklift, Forklift } from "../../models/forklift.model";

@Injectable({ providedIn: 'root' })
export class ForkliftService {
  private apiUrl = 'https://localhost:7081/api/Forklifts';

  constructor(private http: HttpClient) { }

  // Get all forklifts
  getForklifts(): Observable<Forklift[]> {
    return this.http.get<Forklift[]>(this.apiUrl);
  }

  // Add a new forklift
  addForklift(forklift: AddForklift): Observable<Forklift> {
    return this.http.post<Forklift>(this.apiUrl, forklift);
  }

  // Delete forklift with id
  deleteForklift(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Load Forklift data from a JSON file
  loadForklifts(jsonPath: string): Observable<AddForklift[]> {
    return this.http.get<AddForklift[]>(jsonPath)
  }
}
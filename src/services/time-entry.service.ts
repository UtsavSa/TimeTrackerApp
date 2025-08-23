import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeEntry } from '../models/time-entry.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimeEntryService {

  /* 
  
  This is used solely for localhost dev testing purposes.

  */

  //private readonly apiUrl = 'https://localhost:7224/api/timeentry';
  

  
  
  // prod setting

  private readonly api = (environment.apiUrl ?? '').replace(/\/+$/, '');
  private readonly apiUrl =  `${this.api}/api/timeentry`;
  constructor(private http: HttpClient) {}

  // ✅ Punch In (with JSON body)
  punchIn(taskName: string): Observable<TimeEntry> {
    return this.http.post<TimeEntry>(`${this.apiUrl}/punchin`, {
      taskName: taskName,
    });
  }

  // ✅ Punch Out (PUT request)
  punchOut(entryId: string): Observable<TimeEntry> {
    return this.http.put<TimeEntry>(`${this.apiUrl}/punchout/${entryId}`, {});
  }

  // ✅ Get all time entries (uses userId from token)
  getEntries(): Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>(this.apiUrl);
  }

  // ✅ Delete a single entry

  // time-entry.service.ts
  deleteEntry(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  deleteAll() {
    return this.http.delete<void>(`${this.apiUrl}/delete-all`);
  }

  // deleteEntry(entryId: string): Observable<boolean> {
  //   return this.http.delete<boolean>(`${this.apiUrl}/delete/${entryId}`);
  // }

  // ✅ Delete all entries
  // deleteAll(): Observable<{ deleted: number }> {
  //   return this.http.delete<{ deleted: number }>(`${this.apiUrl}/delete-all`);
  // }
}

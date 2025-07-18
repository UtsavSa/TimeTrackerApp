import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeEntry } from '../models/time-entry.model';

@Injectable({
  providedIn: 'root',
})
export class TimeEntryService {
  private readonly apiUrl = 'https://localhost:7224/api/timeentry';

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
  deleteEntry(entryId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${entryId}`);
  }

  // ✅ Delete all entries
  deleteAll(): Observable<{ deleted: number }> {
    return this.http.delete<{ deleted: number }>(`${this.apiUrl}/delete-all`);
  }
}

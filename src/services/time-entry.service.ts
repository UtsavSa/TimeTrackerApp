import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeEntry } from '../models/time-entry.model';

@Injectable({
  providedIn: 'root',
})
export class TimeEntryService {
  // 👇 Base URL pointing to your .NET API controller
  private readonly apiUrl = 'https://localhost:7224/api/timeentry';

  constructor(private http: HttpClient) {}

  /**
   * GET all time entries for a user
   * GET /api/timeentry?userId=...
   */
  getEntries(userId: string): Observable<TimeEntry[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<TimeEntry[]>(this.apiUrl, { params });
  }

  /**
   * POST to punch in a task
   * POST /api/timeentry/punchin?taskName=...&userId=...
   */
  punchIn(taskName: string, userId: string): Observable<TimeEntry> {
    const params = new HttpParams()
      .set('taskName', taskName)
      .set('userId', userId);

    return this.http.post<TimeEntry>(`${this.apiUrl}/punchin`, null, { params });
  }

  /**
   * POST to punch out of a task
   * POST /api/timeentry/punchout/{id}?userId=...
   */
  punchOut(entryId: string, userId: string): Observable<TimeEntry> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<TimeEntry>(`${this.apiUrl}/punchout/${entryId}`, null, { params });
  }

  // DELETE single entry
deleteEntry(entryId: string, userId: string) {
  return this.http.delete<boolean>(`${this.apiUrl}/delete/${entryId}?userId=${userId}`);
}

// DELETE all entries for the user
deleteAll(userId: string) {
  return this.http.delete<number>(`${this.apiUrl}/delete-all?userId=${userId}`);
}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardTask {
  id: string;
  name: string;
  description: string;
  storyPoints: number;
  hoursNeeded: number;
  hoursTaken: number;
  status: 'todo' | 'in-progress' | 'done';
}

@Injectable({
  providedIn: 'root',
})
export class DashboardTaskService {
  private readonly apiUrl = 'https://localhost:7224/api/dashboardtasks'; // ✅ FIXED endpoint

  constructor(private http: HttpClient) {}

  getAll(): Observable<DashboardTask[]> {
    return this.http.get<DashboardTask[]>(this.apiUrl);
  }

  create(task: Omit<DashboardTask, 'id'>): Observable<DashboardTask> {
    return this.http.post<DashboardTask>(this.apiUrl, task);
  }

  update(task: DashboardTask): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

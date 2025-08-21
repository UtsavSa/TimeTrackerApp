import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface DashboardTask {
  id: string;
  name: string;
  description: string;
  storyPoints: number;
  hoursNeeded: number;
  hoursTaken: number;
  status: 'todo' | 'in-progress' | 'done';
  userId?: string; // ✅ optional field
  sprintId?: string;
}

export type CreateTaskDto = Omit<DashboardTask, 'id' | 'userId'>; // ✅ define for POST
type AuthResponse = {token: string};

@Injectable({
  providedIn: 'root',
})
export class DashboardTaskService {
  //private readonly apiUrl = 'https://localhost:7224/api/dashboardtasks';
  //private readonly apiUrl = `${environment.apiUrl}/api/dashboardtasks`; // 👈 Use env

    //private baseUrl = 'https://localhost:7224/api/auth';
  private readonly api = (environment.apiUrl ?? '').replace(/\/+$/, '');
  //private readonly baseUrl = `${environment.apiUrl}/api/auth`; // ✅ Updated
  private readonly apiUrl =  `${this.api}/api/dashboardtasks`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<DashboardTask[]> {
    return this.http.get<DashboardTask[]>(this.apiUrl);
  }

  create(task: CreateTaskDto): Observable<DashboardTask> {
    return this.http.post<DashboardTask>(this.apiUrl, task);
  }

  update(task: DashboardTask): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBySprint(sprintId: string): Observable<DashboardTask[]> {
  return this.http.get<DashboardTask[]>(`${this.apiUrl}?sprintId=${sprintId}`);
}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sprint } from '../models/sprint.model';
import { CreateSprintDto } from '../models/create-sprint-dto.model';
import { environment } from '../environments/environment';
import { SprintProgress } from '../models/sprint-progress.model';



@Injectable({
  providedIn: 'root',
})
export class SprintService {

  /* 
  
  This is used solely for localhost dev testing purposes.

  */
  
  //private readonly apiUrl = 'https://localhost:7224/api/sprints';
  
  
  // this is the prod api n




  private readonly api = (environment.apiUrl ?? '').replace(/\/+$/, '');
  private readonly apiUrl =  `${this.api}/api/sprints`;
  
  constructor(private http: HttpClient) {}

  // Get all sprints where the current user is a participant
  getMySprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.apiUrl}/mine`);
  }

  // Create a new sprint
  createSprint(sprint: CreateSprintDto): Observable<Sprint> {
    return this.http.post<Sprint>(`${this.apiUrl}`, sprint);
  }

  // Delete a sprint by ID
  deleteSprint(sprintId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sprintId}`);
  }

  // Invite a user to a sprint via email
  inviteUser(sprintId: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${sprintId}/add-user`, { email });
  }

  // Get list of user emails in a sprint
  getSprintUsers(sprintId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${sprintId}/users`);
  }

  // NEW: get completed story points per sprint for the current user
  getMySprintProgress() {
    return this.http.get<SprintProgress[]>(`${this.apiUrl}/mine/progress`);
  }
}

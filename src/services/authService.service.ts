// src/app/services/authService.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto, RegisterDto } from '../models/auth/auth-dto.model'; // ✅ Import here
import { environment } from '../environments/environment';


type AuthResponse = {token: string};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* 
  
  This is used solely for localhost dev testing purposes.

  */

  private baseUrl = 'https://localhost:7224/api/auth';
  
  
  //private readonly api = (environment.apiUrl ?? '').replace(/\/+$/, '');
  

  //private readonly baseUrl =  `${this.api}/api/auth`;


  constructor(private http: HttpClient) {}

  register(dto: RegisterDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, dto);
  }

  login(dto: LoginDto): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, dto);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUserId(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['nameidentifier'] || payload['sub'] || null;
  } catch (e) {
    console.error('Failed to decode JWT', e);
    return null;
  }
}

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:8000/api';
  private userSubject: BehaviorSubject<any>|null = null;
  public user: Observable<any>|null = null;


  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, credentials).pipe(
      tap(response => {
        this.setToken(response.token);
        this.fetchUser().subscribe(); 
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  fetchUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get<any>(`${this.apiURL}/user`, { headers }).pipe(
      tap(user => {
        this.userSubject?.next(user); 
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  getUser() {
    if (!this.userSubject?.value) {
      this.fetchUser().subscribe(); 
    }
    return this.user;
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject?.next(null);
  }

}

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:8000/api';
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadToken();  
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          this.setToken(response.token);
          this.fetchUser().subscribe();  
        }
      }),
      catchError(error => throwError(() => error))
    );
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);  
    }
  }

  loadToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.fetchUser().subscribe(); 
      }
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');  
    }
    return null;
  }

  fetchUser(): Observable<any> {
    const token = this.getToken();
    if (!token) return of(null);  
    return this.http.get<any>(`${this.apiURL}/user`, { headers: { Authorization: `Bearer ${token}` } }).pipe(
      tap(user => {
        this.userSubject.next(user);  
      }),
      catchError(error => throwError(() => error))
    );
  }

  getUser(): Observable<any> {
    if (!this.userSubject.value) {
      this.fetchUser().subscribe();  
    }
    return this.userSubject.asObservable();  
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');  
    }
    this.userSubject.next(null);  
  }

  register(userDetails: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/register`, userDetails).pipe(
      tap(response => {
        if (response && response.token) {
          this.setToken(response.token);
          this.fetchUser().subscribe();  
        }
      }),
      catchError(error => throwError(() => error))
    );
  }
}

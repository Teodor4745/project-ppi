import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl = 'http://localhost:8000/api';

  constructor (private http: HttpClient,
              private authService: AuthService
            ) { }

  sendMessage(data?: any): Observable<any> {
    return this.http.post<any[]>(this.apiUrl + '/messages', data);
  }
}

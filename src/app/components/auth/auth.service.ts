import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { AuthResponse, User } from './interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:3000/api/auth';
  private http = inject(HttpClient);
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  currentUserSubject$ = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject$.asObservable();
  public isAuthenticated$ = this.currentUser$.pipe(map((user) => !!user));
  public isAdmin$ = this.currentUser$.pipe(map(user => user?.role === 'ADMIN'));

  constructor() { }

  login(loginForm: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/login`, loginForm).pipe(
      tap((response) => {
        this.setSession(response);
      }),
    );
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResult.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user));
    this.currentUserSubject$.next(authResult.user);
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject$.next(null);
  }
}

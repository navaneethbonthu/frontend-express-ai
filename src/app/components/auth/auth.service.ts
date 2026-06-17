import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { AuthResponse, User } from './interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private API = 'http://localhost:3000/api/auth';
  private API = '/api/auth';
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<User | null>(null);
  // isInitialized = signal(false);
  isAuthenticated = computed(() => this.currentUser() ? true : false)

  isAdmin = computed(() => {
    return this.currentUser()?.role === 'ADMIN' ? true : false
  })


  constructor() { }




  signup(credentials: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/signup`, credentials).pipe(
      switchMap(response => {
        this.currentUser.set(response.user);
        // REFRESH CSRF: Now that we have a userId, get the "Authenticated" token
        return this.getCsrfToken().pipe(map(() => response));
      })
    );
  }


  login(credentials: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/login`, credentials).pipe(
      switchMap(response => {
        this.currentUser.set(response.user);
        console.log('Login successful. Refreshing CSRF for session rotation...');

        // REFRESH CSRF: Crucial for v3.x getSessionIdentifier logic
        return this.getCsrfToken().pipe(map(() => response));
      })
    );
  }





  logout(): void {
    // 1. Immediately clear the local state (Signals/UI)
    this.currentUser.set(null);

    this.http.post(`${this.API}/logout`, {}).pipe(

      finalize(() => {
        // 3. Always redirect to login
        this.router.navigate(['/login']);
      })
    ).subscribe({
      next: () => console.log('Backend logout successful'),
      error: (err) => console.warn('Backend logout failed (likely expired), but local session cleared.', err)
    });
  }



  getCsrfToken(): Observable<any> {

    return this.http.get(`${this.API}/csrf-token`);
  }



  checkAuth(): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<User>(`${this.API}/me`)),
      tap(user => {
        // console.log('csrf - token call check auth')
        this.currentUser.set(user);
        console.log('Session restored and calling checkAuth method:', user.email);
      }),
      // catchError(() => {
      //   this.currentUser.set(null);
      //   return of(null);
      // })
    );
  }

  refreshAccessToken(): Observable<any> {
    return this.http.post(`${this.API}/refresh`, {}, { withCredentials: true }).pipe(
      // Important: refresh CSRF after rotating the session
      switchMap(() => this.getCsrfToken())
    );
  }
}




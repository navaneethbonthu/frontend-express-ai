import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
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
  isAuthenticated = computed(() => {
    return this.currentUser() ? true : false
  })

  isAdmin = computed(() => {
    return this.currentUser()?.role === 'ADMIN' ? true : false
  })


  constructor() { }




  signup(credentials: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/signup`, credentials).pipe(
      tap(response => {
        this.currentUser.set(response.user);
      })
    );
  }


  login(credentials: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/login`, credentials).pipe(
      tap(response => {
        // Browser automatically sets the cookie here.
        // We just update our application state.
        this.currentUser.set(response.user);
        console.log('Authservice login user', this.currentUser()?.email, this.currentUser()?.role);

      })
    );
  }





  logout(): void {

    this.http.post(`${this.API}/logout`, {}).subscribe({
      next: () => {
        this.currentUser.set(null);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed', error)
      }
    })



  }


  // checkAuth(): Observable<any> {
  //   return this.http.get<User>(`${this.API}/me`, {
  //     withCredentials: true // <--- FORCE IT HERE
  //   }).pipe(
  //     map(user => {
  //       this.currentUser.set(user);
  //       console.log('CheckAuth User', this.currentUser()?.role);
  //       console.log('CheckAuth User', this.currentUser()?.email, this.currentUser()?.name);

  //       return true;
  //     }),
  //     catchError(() => {
  //       // Error: We are NOT logged in (401 or Network error)
  //       this.currentUser.set(null);
  //       // this.isInitialized.set(true);
  //       // Return null so the app can still start up without crashing
  //       return of(null);
  //     })
  //   )
  // }

  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.API}/csrf-token`);
  }

  checkAuth(): Observable<any> {
    // First get CSRF token, then check current user
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<User>(`${this.API}/me`)),
      tap(user => this.currentUser.set(user)),
      catchError(() => {
        this.currentUser.set(null);
        return of(null);
      })
    );
  }
}

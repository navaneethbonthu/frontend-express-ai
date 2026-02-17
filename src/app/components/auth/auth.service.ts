import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject, tap } from 'rxjs';
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


  // currentUserSubject$ = new BehaviorSubject<User | null>(this.getUserFromStorage());
  // public currentUser$ = this.currentUserSubject$.asObservable();
  // public isAuthenticated$ = this.currentUser$.pipe(map((user) => !!user));
  // public isAdmin$ = this.currentUser$.pipe(map(user => user?.role === 'ADMIN'));


  currentUser = signal<User | null>(null)
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
      })
    );
  }



  // private setSession(authResult: AuthResponse): void {
  //   localStorage.setItem(this.TOKEN_KEY, authResult.token);
  //   localStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user));
  //   this.currentUserSubject$.next(authResult.user);
  // }

  // private getUserFromStorage(): User | null {
  //   const user = localStorage.getItem(this.USER_KEY);
  //   return user ? JSON.parse(user) : null;
  // }
  // getToken(): string | null {
  //   return localStorage.getItem(this.TOKEN_KEY);
  // }

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


    // localStorage.removeItem(this.TOKEN_KEY);
    // localStorage.removeItem(this.USER_KEY);
    // this.currentUserSubject$.next(null);
  }


  checkAuth(): Observable<any> {
    return this.http.post<User>(`${this.API}/me`, {}).pipe(
      map(user => {
        this.currentUser.set(user);
        return true;
      }),
      catchError(() => {
        this.currentUser.set(null);
        return of(true);
      })
    )
  }
}

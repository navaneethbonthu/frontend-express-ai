import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { AuthService } from './auth.service';
import { AuthResponse, User } from "./interface";
import { Router } from "@angular/router";

describe('AuthService', () => {
    let authService: AuthService;
    let httpTestingControler: HttpTestingController;
    // let routerspy: jasmine.SpyObj<Router>
    let routerspy = { navigate: vi.fn() }
    const mockUser: User = { id: '1', name: 'test', email: 'test@test.com', role: 'ADMIN', createdAt: '', updatedAt: '' };
    const mockAuthResponse: AuthResponse = { user: mockUser, token: 'fake-token' };

    beforeEach(() => {
        // routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: Router, useValue: routerspy }
            ]
        });
        authService = TestBed.inject(AuthService);
        httpTestingControler = TestBed.inject(HttpTestingController);
    });

    // afterEach(() => {
    //     httpTestingControler.verify();
    // })

    it('should calculate computed signals correctly based on currentUser', () => {
        expect(authService.currentUser()).toBeNull();
        expect(authService.isAuthenticated()).toBeFalsy();
        expect(authService.isAdmin()).toBeFalsy();

        authService.currentUser.set(mockUser)

        expect(authService.isAuthenticated()).toBeTruthy();
        expect(authService.isAdmin()).toBeTruthy();
    })


    it('should login, set user, and refresh CSRF token', () => {
        authService.login({ email: 'test@test.com', password: 'password' }).subscribe(response => {
            expect(response).toEqual(mockAuthResponse);
        });

        const loginReq = httpTestingControler.expectOne('/api/auth/login');
        expect(loginReq.request.method).toBe('POST'); // Same as Jasmine
        loginReq.flush(mockAuthResponse);

        const csrfReq = httpTestingControler.expectOne('/api/auth/csrf-token');
        expect(csrfReq.request.method).toBe('GET');
        csrfReq.flush({ token: 'new-csrf' });

        // Vitest has strict equality checks, .toEqual is deep equality
        expect(authService.currentUser()).toEqual(mockUser);
    });

    it('should logout, clear user, and navigate to login', () => {
        authService.currentUser.set(mockUser);

        authService.logout();

        const req = httpTestingControler.expectOne('/api/auth/logout');
        req.flush({});

        expect(authService.currentUser()).toBeNull();

        // Vitest syntax for checking spy calls
        expect(routerspy.navigate).toHaveBeenCalledWith(['/login']);
    });



});
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { AuthService } from './auth.service';
import { User } from "./interface";

describe('AuthService Permission Logic', () => {
    let service: AuthService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                provideHttpClient(),
                provideHttpClientTesting(), // Fakes the backend
            ]
        });

        service = TestBed.inject(AuthService)
    });


    it('should have isAdmin as false when no user is logged in', () => {
        expect(service.isAdmin()).toBe(false);
    })


    it('should return isAdmin true when user role is ADMIN', () => {
        // Arrange: Create a mock Admin user
        const adminUser: User = {
            id: '1',
            name: 'Admin User',
            email: 'admin@test.com',
            role: 'ADMIN',
            createdAt: '',
            updatedAt: ''
        };

        service.currentUser.set(adminUser);

        expect(service.isAdmin()).toBe(true)
    })


});
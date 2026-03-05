import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfile } from './user-profile';
import { signal } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

describe('UserProfile', () => {
  let component: UserProfile;
  let fixture: ComponentFixture<UserProfile>;

  // 1. Strongly type your mock for better IDE autocompletion
  // let mockUserService: jasmine.SpyObj<UserService>;
  let mockAuthService: any;


  // 2. Synchronous beforeEach (No async/await, no compileComponents)
  beforeEach(() => {
    // A. Initialize the mock
    // mockUserService = jasmine.createSpyObj('UserService', ['getUser']);
    // 1. Create the Mock Service (Mocking the Dependency)
    mockAuthService = {
      // We mock the signal with a fixed value
      currentUser: signal({
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'USER',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }),
      // We use vi.fn() to create a Vitest spy for the update method
      // updateProfile: jasmine.createSpy('updateProfile').and.returnValue(of({}))
      updateProfile: vi.fn().mockReturnValue(of({ name: 'Jane Doe', email: 'jane@example.com' }))
    }

    // 2. Configure TestBed with Dependency Injection
    TestBed.configureTestingModule({
      imports: [UserProfile, ReactiveFormsModule],
      providers: [
        // This is the key: We tell Angular to use our MOCK instead of the real service
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfile);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers ngOnInit
  });

  it('should initialize the form with user data from the AuthService signal', () => {
    // Assert: Check if the form took the value from our mock signal
    expect(component.profileForm.value.name).toBe('John Doe');
    expect(component.profileForm.value.email).toBe('john@example.com');
  });



  it('should have the save button disabled if the form is pristine', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const saveButton = compiled.querySelector('.btn-save') as HTMLButtonElement;

    // In Vitest, we check the DOM state
    expect(saveButton.disabled).toBe(true);
  });


  it('should create', () => {
    // We call detectChanges inside the specific test
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  // // #### Scenario A: `mockReturnValue()`(Equivalent to`returnValue`)
  // it('should mock API response', () => {

  //   // We TELL the spy: "Don't run the real code, just give back this mock object."
  //   // spyOn(authService, 'updateProfile').and.returnValue(of({ name: 'New Name' }));

  //   const spy = vi.spyOn(mockAuthService, 'updateProfile')
  //     .mockReturnValue(of({ name: 'Vitest User' }));

  //   component.onSubmit();

  //   expect(spy).toHaveBeenCalled();
  //   // The real http.patch logic inside updateProfile was SKIPPED.
  // });


  // // #### Scenario B: Standard`vi.spyOn()`(Equivalent to`callThrough`)

  // it('should track call and execute real code', () => {
  //   // In Vitest, vi.spyOn() calls through to the original implementation by default.
  //   // We spy on the component's own 'resetForm' method.
  //   // We want to verify it was called, BUT we actually want the form to be cleared!,
  //   // spyOn(component, 'resetForm').and.callThrough();
  //   const spy = vi.spyOn(component, 'resetForm');

  //   component.onSubmit();

  //   expect(spy).toHaveBeenCalled();
  //   // The real code inside resetForm() WAS executed.
  // });

});
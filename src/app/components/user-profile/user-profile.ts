import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {
  authService = inject(AuthService);
  private fb = inject(FormBuilder);

  // Status Signals
  isLoading = signal(false);
  message = signal<string | null>(null);
  isSuccess = signal(false);

  profileForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {
    const user = this.authService.currentUser();
    if (user) {
      this.profileForm.patchValue({
        name: user.name,
        email: user.email
      });
      this.profileForm.markAsPristine();
    }
  }

  isInvalid(controlName: string) {
    const control = this.profileForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading.set(true);
      this.message.set(null);

      //   this.authService.updateProfile(this.profileForm.value)
      //     .pipe(finalize(() => this.isLoading.set(false)))
      //     .subscribe({
      //       next: () => {
      //         this.isSuccess.set(true);
      //         this.message.set('Profile updated successfully!');
      //         this.profileForm.markAsPristine();
      //         // Clear success message after 3 seconds
      //         setTimeout(() => this.message.set(null), 3000);
      //       },
      //       error: (err) => {
      //         this.isSuccess.set(false);
      //         this.message.set(err.error?.message || 'Failed to update profile.');
      //       }
      //     });
    }
  }
}

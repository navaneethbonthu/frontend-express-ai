import { Component, inject, Input, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { FormFieldConfig, ValidatorConfig } from './interface';



@Component({
  selector: 'app-work-book',
  imports: [CommonModule, ReactiveFormsModule],
  template: `


   


  `,
  styleUrl: './work-book.scss',
})
export class WorkBook {













  // @Input({ required: true }) config: FormFieldConfig[] = [];

  // private fb = inject(FormBuilder);
  // form!: FormGroup;

  // ngOnInit(): void {
  //   this.form = this.createGroup();
  // }

  // private createGroup(): FormGroup {
  //   const group = this.fb.group({});

  //   this.config.forEach(field => {
  //     // Map JSON validators to real Angular ValidatorFns
  //     const controlValidators = field.validators ? mapValidators(field.validators) : [];

  //     // Add control to group
  //     group.addControl(
  //       field.name,
  //       this.fb.control(field.value || '', controlValidators)
  //     );
  //   });

  //   return group;
  // }

  // // Helper to get error message for a field
  // getErrorMessage(field: FormFieldConfig): string {
  //   const control = this.form.get(field.name);
  //   if (!control || !field.validators) return '';

  //   for (const v of field.validators) {
  //     if (control.hasError(v.type)) {
  //       return v.message;
  //     }
  //   }
  //   return '';
  // }

  // onSubmit() {
  //   if (this.form.valid) {
  //     console.log('Form Submitted:', this.form.value);
  //   } else {
  //     this.form.markAllAsTouched();
  //   }
  // }
}

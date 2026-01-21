import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { single } from 'rxjs';

@Component({
  selector: 'app-star-ratting',
  templateUrl: './star-ratting.html',
  styleUrl: './star-ratting.scss',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StarRatting),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => StarRatting),
      multi: true,
    },
  ],
})
export default class StarRatting implements ControlValueAccessor, Validator {
  rating = signal(0);

  @Input() set value(val: number) {
    this.rating.set(val);
  }
  @Input() readOnly = false;
  @Output() valueChange = new EventEmitter<number>();

  // Callbacks provided by Angular
  onChange = (value: number) => {};
  onTouched = () => {};

  writeValue(ratting: number): void {}

  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  validate(control: AbstractControl): any {}
  rate(val: number) {
    if (this.readOnly) return;

    this.rating.set(val); // Update UI
    this.onChange(val); // Notify Reactive Form (if exists)
    this.onTouched(); // Mark as touched for validation
    this.valueChange.emit(val); // Notify manual Output (if exists)
  }
}

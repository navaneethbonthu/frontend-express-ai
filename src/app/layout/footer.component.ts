import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('myInput', { static: false }) inputField!: ElementRef;

  inputFieldSignal = viewChild<ElementRef>('myInput');

  // @ViewChildren(CustomCheckboxComponent) checkboxes!: QueryList<CustomCheckboxComponent>;



  ngAfterViewInit(): void {

    this.inputField.nativeElement.focus()

    this.inputFieldSignal()?.nativeElement.focus();
  }

}

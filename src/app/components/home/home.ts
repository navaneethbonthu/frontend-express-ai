import { ChangeDetectionStrategy, Component, inject, numberAttribute, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeService } from "./home.service";
import { StorageService } from "../../services/storage.service";
import { AsyncPipe, CurrencyPipe, formatCurrency } from "@angular/common";
import { count, reduce, retry } from "rxjs";
import { resultMemoize } from "@ngrx/store";
import { mapToResolve } from "@angular/router";
import { MultiplePipe } from "../../pipes/multiple.pipe";

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  template: `
    <h1>Home Page</h1>
    
    
  `,
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  homeService = inject(HomeService);

  data: any = 'abce'

  ngOnInit(): void {

  }


}
















































import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeService } from "./home.service";
import { Subscription } from "rxjs";




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

  private homeService = inject(HomeService)


  ngOnInit(): void {


  }

  onScrollEventEmit() {





  }

}





















































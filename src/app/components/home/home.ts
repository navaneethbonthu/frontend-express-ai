import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {


  ngOnInit(): void {
    // Task 1
    const users = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 17 },
      { id: 3, name: 'Charlie', age: 30 },
    ];
    // 1. Filter out users under 18
    // 2. Map to get only the names
    const result = users
      .filter((user) => user.age >= 18)
      .map((user) => user.name);
    // LOG THE RESULT (Note: No quotes around result!)
    console.log('Final Result:', result);
  }
}

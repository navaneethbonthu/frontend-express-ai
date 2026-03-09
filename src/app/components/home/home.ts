import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {


  ngOnInit(): void {
    // const cart = [
    //   { name: "Laptop", price: 1000, qty: 1, inStock: true },
    //   { name: "Mouse", price: 50, qty: 2, inStock: true },
    //   { name: "Keyboard", price: 80, qty: 1, inStock: false },
    //   { name: "Monitor", price: 200, qty: 2, inStock: true },
    // ];

    // const result = cart.reduce((total, item) => {
    //   // if (item.inStock) {
    //   //   total + (item.price * item.qty)
    //   // }
    //   // return total;

    //   return item.inStock ? (total + (item.price * item.qty)) : total
    // }, 0)



    // const users = [
    //   { firstName: "John", lastName: "Doe", age: 25, isActive: true },
    //   { firstName: "Jane", lastName: "Smith", age: 17, isActive: true },
    //   { firstName: "Bob", lastName: "Johnson", age: 40, isActive: false },
    //   { firstName: "Alice", lastName: "Williams", age: 22, isActive: true },
    // ];

    // const result = users.filter((item) => item.isActive && item).map((item) => item.lastName + ',' + item.firstName)

    // const movies = [
    //   { title: "Inception", genres: ["Sci-Fi", "Action", "Thriller"] },
    //   { title: "The Matrix", genres: ["Sci-Fi", "Action"] },
    //   { title: "Parasite", genres: ["Drama", "Thriller"] },
    // ];


    // const faltArr = [... new Set(movies.flatMap((item) => item.genres))]

    // const votes = ["apple", "banana", "apple", "orange", "banana", "apple"];

    // const tally = votes.reduce((acc, fruit) => {
    //   acc[fruit] = (acc[fruit] || 0) + 1;
    //   return acc;
    // }, {} as any);


    // const students = [
    //   { name: "Alice", grade: "A" },
    //   { name: "Bob", grade: "B" },
    //   { name: "Charlie", grade: "A" },
    //   { name: "David", grade: "C" },
    //   { name: "Eve", grade: "B" },
    // ];


    // const result = students.reduce((acc, student) => {
    //   if (!acc[student.grade]) {
    //     acc[student.grade] = [];
    //   }
    //   acc[student.grade].push(student.name)
    // }, {} as any)


    // const products = [
    //   { name: "Product A", price: 30, rating: 4.5 },
    //   { name: "Product B", price: 20, rating: 4.8 },
    //   { name: "Product C", price: 40, rating: 4.5 },
    //   { name: "Product D", price: 15, rating: 4.8 },
    // ];


    // const result = [...products].sort((a, b) => {
    //   if (b.rating !== a.rating) {
    //     return b.rating - a.rating;
    //   }
    //   return a.price - b.price
    // })
    // const employees = [
    //   { id: "e1", name: "Alice", role: "Developer" },
    //   { id: "e2", name: "Bob", role: "Designer" },
    //   { id: "e3", name: "Charlie", role: "Manager" },
    // ];

    // const result = employees.reduce((acc, item) => {
    //   acc[item.id] = item;
    //   return acc;

    // }, {} as any)

    // const todos = [
    //   { id: 1, text: "Learn React", completed: true },
    //   { id: 2, text: "Master Array Methods", completed: false },
    //   { id: 3, text: "Build an App", completed: false },
    // ];
    // const targetId = 2;

    // const updatedTodos = todos.map(todo => {
    //   if (todo.id === targetId) {
    //     // Return a new object with the toggled status
    //     return { ...todo, completed: !todo.completed };
    //   }
    //   // Return the original object if it's not the target
    //   return todo;
    // });




    // const mondayAttendees = [101, 105, 204, 309, 412];
    // const tuesdayAttendees = [105, 204, 555, 618, 412];


    // const atendedBoth = mondayAttendees.filter((id) => tuesdayAttendees.includes(id))



    // const rawItems = [
    //   { name: "Item A", price: "10" },
    //   { name: "Item B", price: null },
    //   { name: "Item C", price: 20 },
    //   { name: "Item D" }, // Missing price
    //   { name: "Item E", price: "thirty" }, // Invalid number string
    //   { name: "Item F", price: 15 },
    // ];

    // const filteredPiriceArray = rawItems.map((item) => Number(item.price)).filter((price) => !isNaN(price) && price > 0)

    // const result = filteredPiriceArray.reduce((total, item) => {
    //   return total + item
    // }, 0)

    // const company = [
    //   {
    //     department: "Sales",
    //     employees: [{ name: "John", salary: 50000 }, { name: "Jane", salary: 60000 }]
    //   },
    //   {
    //     department: "Engineering",
    //     employees: [{ name: "Bob", salary: 90000 }, { name: "Alice", salary: 110000 }]
    //   },
    //   {
    //     department: "HR",
    //     employees: [{ name: "Dave", salary: 55000 }]
    //   }
    // ];


    // const filterdDepartment = company.find(dept => dept.department === "Engineering")?.employees
    // const result = filterdDepartment?.reduce((total, item) => {
    //   return item.salary + total;
    // }, 0)


    // const userPermissions = ["read_posts", "write_posts", "delete_posts"];

    // const requiredToView = ["read_posts", "write_posts"];
    // const adminPermissions = ["delete_posts", "manage_users", "view_analytics"];



    // // const result = requiredToView.every((item) => userPermissions.includes(item))

    // const result = userPermissions.some((item) => adminPermissions.includes(item))


    // const cars = [
    //   { make: "Honda", model: "Civic", price: 22000 },
    //   { make: "Toyota", model: "Camry", price: 26000 },
    //   { make: "Mercedes", model: "S-Class", price: 110000 },
    //   { make: "Ford", model: "Mustang", price: 35000 },
    // ];

    // const mostExpensiveCar = cars.reduce((expensiveCar, currentCar) => {
    //   return currentCar.price > expensiveCar.price ? currentCar : expensiveCar
    // })



    // const people = [
    //   { name: "Anna", age: 24 },
    //   { name: "Ben", age: 29 },
    //   { name: "Chris", age: 35 },
    //   { name: "Diana", age: 42 },
    //   { name: "Evan", age: 31 },
    // ];


    // const groupedByDecade = people.reduce((acc, preson) => {

    //   const decade = Math.floor(preson.age / 10) * 10;
    //   const key = `${decade}s`;

    //   if (!acc[key]) {
    //     acc[key] = [];
    //   }

    //   acc[key].push(preson.name)

    //   return acc;

    // }, {} as any)



    // const orders = [
    //   { orderId: 1, items: [{ id: "A", qty: 2 }, { id: "B", qty: 1 }] },
    //   { orderId: 2, items: [{ id: "A", qty: 3 }, { id: "C", qty: 4 }] },
    //   { orderId: 3, items: [{ id: "B", qty: 2 }] },
    // ];


    // const result = orders.flatMap((order) => order.items).reduce((acc, item) => {
    //   if (!acc[item.id]) {
    //     acc[item.id] = 0
    //   }
    //   acc[item.id] = acc[item.id] + item.qty
    //   // acc[item.id] = (acc[item.id] || 0) + item.qty;
    //   return acc;
    // }, {} as any)

    // const add5 = (num: number) => num + 5;
    // const multiply3 = (num: number) => num * 3;
    // const subtract2 = (num: number) => num - 2;

    // const operations = [add5, multiply3, subtract2];
    // const startingValue = 10;

    // const result = operations.reduce((acc, operation) => {
    //   return operation(acc);
    // }, startingValue)


    // const cart = [
    //   { id: 1, price: 10, quantity: 2 }, // cost: 20
    //   { id: 2, price: 5, quantity: 4 },  // cost: 20
    //   { id: 3, price: 15, quantity: 1 }, // cost: 15
    // ];

    // const result = cart.reduce((acc, product) => {
    //   acc.totalItem += product.quantity,
    //     acc.totalCost += product.quantity * product.price
    //   return acc
    // }, { totalItem: 0, totalCost: 0 } as any)

    // const rawConfig = {
    //   host: "localhost",
    //   port: 8080,
    //   username: "admin",
    //   password: null,
    //   timeout: undefined,
    //   retryLimit: 5
    // };


    // const result = Object.entries(rawConfig).reduce((acc, [key, value]) => {
    //   if (value) {
    //     acc[key] = value
    //   }
    //   return acc;
    // }, {} as any)

    // console.log('Final Result:', result)
  }
}

import { Component, OnInit } from '@angular/core';
import { count, filter } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {


  ngOnInit(): void {
    // const cars = [
    //   { make: "Honda", model: "Civic", price: 22000 },
    //   { make: "Toyota", model: "Camry", price: 26000 },
    //   { make: "Mercedes", model: "S-Class", price: 110000 },
    //   { make: "Ford", model: "Mustang", price: 35000 },
    // ];

    // const result = cars.reduce((acc, car) => {
    //   if (acc.price > car.price) {
    //     return acc;
    //   }
    //   return car;

    // })

    // const people = [
    //   { name: "Anna", age: 24 },
    //   { name: "Ben", age: 29 },
    //   { name: "Chris", age: 35 },
    //   { name: "Diana", age: 42 },
    //   { name: "Evan", age: 31 },
    // ];


    // const result = people.reduce((acc: any, person) => {
    //   const key = `${Math.floor(person.age / 10) * 10}s`;
    //   if (!acc[key]) {
    //     acc[key] = []
    //   }

    //   acc[key].push(person.name)
    //   return acc;



    // }, {})

    // const orders = [
    //   { orderId: 1, items: [{ id: "A", qty: 2 }, { id: "B", qty: 1 }] },
    //   { orderId: 2, items: [{ id: "A", qty: 3 }, { id: "C", qty: 4 }] },
    //   { orderId: 3, items: [{ id: "B", qty: 2 }] },
    // ];


    // const faltedArray = orders.map((order) => order.items).flat(1)

    // const result = faltedArray.reduce((acc: Record<string, number>, item) => {


    //   if (acc[item.id]) {
    //     acc[item.id] = acc[item.id] + item.qty;
    //   } else {
    //     acc[item.id] = item.qty;
    //   }

    //   return acc;
    // }, {} as Record<string, number>)



    // const add5 = (num: number) => num + 5;
    // const multiply3 = (num: number) => num * 3;
    // const subtract2 = (num: number) => num - 2;

    // const operations = [add5, multiply3, subtract2];
    // const startingValue = 10;


    // const result = operations.reduce((currentValue, currentFunction) => {
    //   return currentFunction(currentValue);
    // }, startingValue)


    // const cart = [
    //   { id: 1, price: 10, quantity: 2 }, // cost: 20
    //   { id: 2, price: 5, quantity: 4 },  // cost: 20
    //   { id: 3, price: 15, quantity: 1 }, // cost: 15
    // ];


    // const result = cart.reduce((acc, item) => {
    //   acc.totalItems = acc.totalItems + item.price;

    //   acc.totalCoast = acc.totalCoast + (item.quantity * item.price)

    //   // acc.totalItem = totalItem + item.quantity

    //   // acc[totalCoast] = totalCost + (item.price * item.quantity)

    //   return acc;


    // }, { totalItems: 0, totalCoast: 0 })



    // const expenses = [
    //   { item: 'Apples', category: 'Groceries', amount: 5 },
    //   { item: 'Train Ticket', category: 'Transport', amount: 25 },
    //   { item: 'Milk', category: 'Groceries', amount: 3 },
    //   { item: 'Bus Fare', category: 'Transport', amount: 5 },
    //   { item: 'Headphones', category: 'Electronics', amount: 50 }
    // ];


    // const result = expenses.reduce((acc: Record<string, number>, item) => {
    //   if (!acc[item.category]) {
    //     acc[item.category] = 0
    //   }
    //   // acc[item.category] = acc[item.amount] + item.amount
    //   acc[item.category] = acc[item.category] + item.amount;


    //   // acc[item.category] = (acc[item.category] || 0) + item.amount;

    //   return acc;
    // }, {})


    // const products = [
    //   { name: 'Laptop', price: 1200, rating: 4.5 },
    //   { name: 'Tablet', price: 400, rating: 4.5 },
    //   { name: 'Monitor', price: 300, rating: 4.8 },
    //   { name: 'Keyboard', price: 100, rating: 4.2 },
    //   { name: 'Mouse', price: 50, rating: 4.5 }
    // ];

    // const result = products.sort((a, b) => {
    //   if (a.rating === b.rating) {
    //     return b.price - a.price;
    //   }

    //   return b.rating - a.rating;
    // })


    // const posts = [
    //   { title: 'Learn JS', tags: ['javascript', 'web', 'programming'] },
    //   { title: 'Node.js Basics', tags: ['javascript', 'backend', 'node'] },
    //   { title: 'CSS Tips', tags: ['web', 'css', 'design'] },
    //   { title: 'Advanced JS', tags: ['javascript', 'programming'] }
    // ];

    // const result = posts.flatMap((post) => post.tags).reduce((acc: Record<string, number>, item) => {
    //   // if (!acc[item]) {
    //   //   acc[item] = 0
    //   // }
    //   // acc[item] = acc[item] + 1;

    //   acc[item] = (acc[item] || 0) + 1

    //   return acc;
    // }, {})


    // const company = [
    //   {
    //     department: 'Engineering',
    //     employees: [
    //       { name: 'Alice', tenure: 5 },
    //       { name: 'Bob', tenure: 2 }
    //     ]
    //   },
    //   {
    //     department: 'Sales',
    //     employees: [
    //       { name: 'Charlie', tenure: 4 },
    //       { name: 'David', tenure: 1 },
    //       { name: 'Eve', tenure: 7 }
    //     ]
    //   }
    // ];

    // // const result = company.flatMap((cmpObj) => cmpObj.employees.filter((emp) => emp.tenure > 3).map((emp) => `${emp.name} (${cmpObj.department})`))
    // const result = company.flatMap((cmpObj) => cmpObj.employees.filter((emp) => emp.tenure > 3))



    // const arr1 = [1, 2, 3, 4, 5];
    // const arr2 = [4, 5, 6, 7, 8];


    // const result = [...arr1.filter(x => !arr2.includes(x)), ...arr2.filter(Y => !arr1.includes(Y))];


    // const a = arr1.filter(x => !arr2.includes(x))
    // const b = arr2.filter(y => !arr1.includes(y))
    // console.log('Final Result:', [...a, ...b])



    // const result = arr1.filter(num => arr2.some(x => x !== num))

    // const cart = [
    //   { id: 1, price: 20, qty: 2, inStock: true, hasDiscount: false },
    //   { id: 2, price: 50, qty: 1, inStock: true, hasDiscount: true },
    //   { id: 3, price: 15, qty: 3, inStock: true, hasDiscount: false }
    // ];



    // const students = [
    //   { name: 'Alex', subjects: ['Math', 'Science'] },
    //   { name: 'Sam', subjects: ['History', 'Math'] },
    //   { name: 'Jordan', subjects: ['Science', 'History', 'Art'] }
    // ];


    // const subjectMap = students.reduce((acc, student) => {
    //   student.subjects.forEach((subject) => {
    //     // If the subject isn't in our accumulator yet, create it
    //     if (!acc[subject]) {
    //       acc[subject] = [];
    //     }
    //     // Add the student's name to that subject
    //     acc[subject].push(student.name);
    //   });
    //   return acc;
    // }, {} as any);

    // const result = Object.entries(subjectMap).map(([subject, students]) => ({
    //   subject,
    //   students
    // }));

    // const users = [
    //   { id: 1, name: 'Alice' },
    //   { id: 2, name: 'Bob' }
    // ];

    // const interests = [
    //   { userId: 1, interest: 'Coding' },
    //   { userId: 1, interest: 'Music' },
    //   { userId: 2, interest: 'Hiking' }
    // ];

    // const result = users.map(user => {
    //   const userIntersets = interests.filter(item => item.userId === user.id).map(item => item.interest)

    //   return { name: user.name, interests: userIntersets }

    // })

    // const students = [
    //   { name: 'Alex', subjects: ['Math', 'Science'] },
    //   { name: 'Sam', subjects: ['History', 'Math'] },
    //   { name: 'Jordan', subjects: ['Science', 'History', 'Art'] }
    // ];


    // const result = students.reduce((acc, student) => {
    //   student.subjects.forEach(subject => {
    //     if (!acc[subject]) {
    //       acc[subject] = []
    //     }
    //     acc[subject].push(student.name)
    //   })
    //   return acc;
    // }, {} as any)



    // const students = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    // const scores = [
    //   { studentId: 1, score: 90 },
    //   { studentId: 1, score: 80 },
    //   { studentId: 2, score: 70 },
    //   { studentId: 2, score: 90 }
    // ];
    // [
    //   { name: 'Alice', averageScore: 85 },
    //   { name: 'Bob', averageScore: 80 }
    // ]


    // const result = students.map(student => {
    //   const studentScores = scores.filter(score => score.studentId === student.id)
    //     .map(item => item.score)

    //   const avgScore = studentScores.length > 0
    //     ? studentScores.reduce((sum, current) => sum + current, 0) / studentScores.length
    //     : 0;
    //   return { name: student.name, avgscore: studentScores}
    // })

    // const students = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    // const scores = [
    //   { studentId: 1, score: 90 },
    //   { studentId: 1, score: 80 },
    //   { studentId: 2, score: 70 },
    //   { studentId: 2, score: 90 }
    // ];

    // const scoreData = scores.reduce((acc, { studentId, score }) => {
    //   if (!acc[studentId]) {
    //     acc[studentId] = { sum: 0, count: 0 }
    //   };
    //   acc[studentId].sum += score;
    //   acc[studentId].count += 1;
    //   return acc;
    // }, {} as any);

    // // 2. Map the students to the calculated averages
    // const result = students.map(student => ({
    //   name: student.name,
    //   averageScore: scoreData[student.id].sum / scoreData[student.id].count
    // }));

    // const projects = [
    //   { id: 101, title: 'Alpha' },
    //   { id: 102, title: 'Beta' }
    // ];

    // const employees = [
    //   { name: 'John', projectId: 101 },
    //   { name: 'Sarah', projectId: 102 },
    //   { name: 'Mike', projectId: 101 }
    // ];

    // [
    //   { name: 'John', project: 'Alpha' },
    //   { name: 'Sarah', project: 'Beta' },
    //   { name: 'Mike', project: 'Alpha' }
    // ]

    // const projectLookup = projects.reduce((acc, project) => {
    //   acc[project.id] = project.title
    //   return acc;
    // }, {} as any)

    // const result = employees.map(emp => ({
    //   name: emp.name,

    // }))


    // [
    //   { name: 'J.K. Rowling', books: ['Harry Potter', 'Fantastic Beasts'] },
    //   { name: 'George R.R. Martin', books: ['Game of Thrones'] },
    //   { name: 'Harper Lee', books: [] }
    // ]


    // const authors = [
    //   { id: 1, name: 'J.K. Rowling' },
    //   { id: 2, name: 'George R.R. Martin' },
    //   { id: 3, name: 'Harper Lee' }
    // ];

    // const books = [
    //   { title: 'Harry Potter', authorId: 1 },
    //   { title: 'Fantastic Beasts', authorId: 1 },
    //   { title: 'Game of Thrones', authorId: 2 }
    // ];


    // const result = books.map(book => {
    //   const bookAuthor = authors.find(author => author.id === book.authorId)
    //   return { title: book.title, author: bookAuthor?.name }
    // })


    // const result = authors.reduce((acc, author) => {
    //   const authBooks = books.filter((book) => book.authorId === author.id).map(item => item.title)

    //   if (!acc[author.name]) {
    //     acc[author.name] = []
    //   }
    //   acc[author.name].push(authBooks)
    //   return acc;
    // }, {} as any)

    // 1. Group book titles by authorId using reduce
    // const booksByAuthor = books.reduce((acc, book) => {
    //   if (!acc[book.authorId]) {
    //     acc[book.authorId] = [];
    //   }
    //   acc[book.authorId].push(book.title);
    //   return acc;
    // }, {} as any);

    // // 2. Map authors to the final structure
    // const result = authors.map(author => ({
    //   name: author.name,
    //   books: booksByAuthor[author.id] || [] // Use empty array if author has no books
    // }));
    // [
    //   { orderId: 1, totalPrice: 10 },
    //   { orderId: 2, totalPrice: 50 }
    // ]

    // const orders = [
    //   { orderId: 1, itemId: 10, qty: 2 },
    //   { orderId: 2, itemId: 20, qty: 1 }
    // ];

    // const items = [
    //   { id: 10, name: 'Widget', price: 5 },
    //   { id: 20, name: 'Gadget', price: 50 }
    // ];

    // // / 1. Create a lookup object for prices keyed by itemId
    // const itemPrices = items.reduce((acc, item) => {
    //   acc[item.id] = item.price;
    //   return acc;
    // }, {} as any);

    // const result = orders.map(order => {

    //   return {
    //     orderId: order.orderId,
    //     totalPrice: Number(itemPrices[order.itemId] * order.qty)
    //   }

    // })


    // [
    //   { title: 'JS Tips', tags: ['coding', 'javascript'] },
    //   { title: 'CSS Hacks', tags: ['css'] },
    //   { title: 'React Guide', tags: [] }
    // ]

    // const posts = [
    //   { id: 1, title: 'JS Tips' },
    //   { id: 2, title: 'CSS Hacks' },
    //   { id: 3, title: 'React Guide' }
    // ];

    // const postTags = [
    //   { postId: 1, tag: 'coding' },
    //   { postId: 1, tag: 'javascript' },
    //   { postId: 2, tag: 'css' }
    // ];

    // const tagsByPost = postTags.reduce((acc, { postId, tag }) => {
    //   if (!acc[postId]) {
    //     acc[postId] = []
    //   };
    //   acc[postId].push(tag);
    //   return acc;
    // }, {} as any);

    // // 2. Map posts to include the tags array
    // const result = posts.map(post => ({
    //   title: post.title,
    //   tags: tagsByPost[post.id] || [] // Fallback to empty array if no tags found
    // }));

    // [
    //   { teamName: 'Lions', members: ['Alice', 'Bob'], totalSalary: 110000 },
    //   { teamName: 'Tigers', members: ['Charlie'], totalSalary: 70000 }
    // ]
    // const teams = [
    //   { id: 1, teamName: 'Lions' },
    //   { id: 2, teamName: 'Tigers' }
    // ];

    // const players = [
    //   { name: 'Alice', teamId: 1, salary: 50000 },
    //   { name: 'Bob', teamId: 1, salary: 60000 },
    //   { name: 'Charlie', teamId: 2, salary: 70000 }
    // ];

    // const playersGroup = players.reduce((acc, player) => {
    //   if (!acc[player.teamId]) {
    //     // acc[player.teamId] = []
    //     acc[player.teamId] = { members: [], totalSalary: 0 };
    //   }
    //   acc[player.teamId].members.push(player.name)
    //   acc[player.teamId].totalSalary += player.salary;
    //   return acc;

    //   return acc;
    // }, {} as any)


    // const result = teams.map(team => ({
    //   teamName: team.teamName,
    //   members: playersGroup[team.id].members || [],
    //   totalSalary: playersGroup[team.id].totalSalary || 0
    // }))
    // [
    //   { name: 'Laptop', stock: 5 },
    //   { name: 'Mouse', stock: 0 },
    //   { name: 'Keyboard', stock: 10 }
    // ]

    // const products = [
    //   { id: 1, name: 'Laptop' },
    //   { id: 2, name: 'Mouse' },
    //   { id: 3, name: 'Keyboard' }
    // ];

    // const inventory = [
    //   { productId: 1, stock: 5 },
    //   { productId: 3, stock: 10 }
    // ];



    // const inventoryLookup = inventory.reduce((acc, item) => {
    //   acc[item.productId] = item.stock;
    //   return acc;
    // }, {} as any)

    // const result = products.map(product => (
    //   {
    //     product: product.name,
    //     stock: inventoryLookup[product.id] || 0
    //   }
    // ))



    // const departments = [
    //   { id: 1, name: 'HR' },
    //   { id: 2, name: 'IT' }
    // ];

    // const transactions = [
    //   { deptId: 1, amount: 100 },
    //   { deptId: 2, amount: 200 },
    //   { deptId: 1, amount: 50 },
    //   { deptId: 2, amount: 300 }
    // ];

    // [
    //   { name: 'HR', transactionCount: 2, totalRevenue: 150 },
    //   { name: 'IT', transactionCount: 2, totalRevenue: 500 }
    // ]
    // const transLookup = transactions.reduce((acc, item) => {
    //   if (!acc[item.deptId]) {
    //     acc[item.deptId] = { transactionCount: 0, totalRevenue: 0 }
    //   }
    //   acc[item.deptId].transactionCount = acc[item.deptId].transactionCount + 1;
    //   acc[item.deptId].totalRevenue = acc[item.deptId].totalRevenue + item.amount;
    //   return acc;
    // }, {} as any)


    // const departments = [
    //   { id: 1, name: 'HR' },
    //   { id: 2, name: 'IT' }
    // ];

    // const transactions = [
    //   { deptId: 1, amount: 100 },
    //   { deptId: 2, amount: 200 },
    //   { deptId: 1, amount: 50 },
    //   { deptId: 2, amount: 300 }
    // ];

    // [
    //   { name: 'HR', totalammount: 150 },
    //   { name: 'IT', totalammount: 500 }
    // ]

    // const transacLookup = transactions.reduce((acc, item) => {
    //   if (!acc[item.deptId]) {
    //     acc[item.deptId] = 0
    //   }
    //   acc[item.deptId] = acc[item.deptId] + item.amount;
    //   return acc;
    // }, {} as any)

    // const result = departments.map(department => ({
    //   name: department.name,
    //   totalamount: transacLookup[department.id]
    // }))


    // const schools = [
    //   {
    //     name: 'High School A',
    //     classes: [
    //       { students: [{ name: 'Alice' }, { name: 'Bob' }] },
    //       { students: [{ name: 'Charlie' }] }
    //     ]
    //   },
    //   {
    //     name: 'High School B',
    //     classes: [
    //       { students: [{ name: 'David' }] }
    //     ]
    //   }
    // ];
    // [
    //   { name: 'Alice', school: 'High School A' },
    //   { name: 'Bob', school: 'High School A' },
    //   { name: 'Charlie', school: 'High School A' },
    //   { name: 'David', school: 'High School B' }
    // ]
    // // const result = schools.flatMap(school =>
    // //   school.classes.flatMap(cls =>
    // //     cls.students.map(student => ({
    // //       name: student.name,
    // //       school: school.name
    // //     }))
    // //   )
    // // );
    // const schoolLookUp = schools.flatMap(school =>
    //   school.classes.flatMap(cls =>
    //     cls.students.map(stu =>
    //     ({
    //       name: stu.name,
    //       school: school.name
    //     })
    //     )
    //   )
    // )

    // const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];
    // const banned = [2, 3];

    // const result = users.map((user: any) => ({
    //   ...user, isBanned: banned.includes(user.id)
    // }))


    // const items = [{ name: 'Shirt', catId: 1 }, { name: 'Pants', catId: 2 }];
    // const categories = [{ id: 1, title: 'Clothing' }, { id: 2, title: 'Apparel' }];

    // [
    //   { name: 'Shirt', category: 'Clothing' },
    //   { name: 'Pants', category: 'Apparel' }
    // ]

    // const itemsLookup = items.reduce((acc, item) => {

    //   acc[item.catId] = item.name
    //   return acc;

    //   // if (!acc[item.catId]) {
    //   //   acc[item.catId] = 
    //   // }
    // }, {} as any)

    // const result = categories.map(cat => ({
    //   name: itemsLookup[cat.id],
    //   categorie: cat.title
    // }))

    // const authors = [{ name: 'Mark' }, { name: 'Jane' }];
    // const books = [
    //   { author: 'Mark', title: 'Book A' },
    //   { author: 'Mark', title: 'Book B' },
    //   { author: 'Jane', title: 'Book C' }
    // ];

    // [
    //   { name: 'Mark', bookCount: 2 },
    //   { name: 'Jane', bookCount: 1 }
    // ]

    // const booksLookup = books.reduce((acc, book) => {
    //   if (!acc[book.author]) {
    //     acc[book.author] = []
    //   }
    //   acc[book.author].push(book.title)
    //   return acc;
    // }, {} as any)

    // const result = authors.map(author => ({
    //   name: author.name,
    //   bookCount: booksLookup[author.name].length
    // }))

    // const reservations = [
    //   { room: 'A1', user: 'Sam' },
    //   { room: 'A2', user: 'Kim' },
    //   { room: 'B1', user: 'Joe' },
    //   { room: 'B2', user: 'Ann' }
    // ];

    // const roomStatuses = [
    //   { room: 'A1', status: 'available' },
    //   { room: 'A2', status: 'booked' },
    //   { room: 'B1', status: 'available' },
    //   { room: 'B2', status: 'maintenance' }
    // ];

    // [{ room: 'A1', user: 'Sam' }]

    // // 1. Create a lookup object for statuses to allow O(1) checking
    // const statusMap = roomStatuses.reduce((acc, item) => {
    //   acc[item.room] = item.status;
    //   return acc;
    // }, {} as any);

    // // 2. Filter reservations based on the status lookup
    // const result = reservations.filter(res =>
    //   statusMap[res.room] === 'available'
    // );

    // const students = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];
    // const attendance = [{ studentId: 1 }, { studentId: 3 }];
    // [
    //   { id: 1, name: 'Alice', status: 'present' },
    //   { id: 2, name: 'Bob', status: 'absent' },
    //   { id: 3, name: 'Charlie', status: 'present' }
    // ]




    // const attLookup = attendance.map(item => item.studentId)


    // const result = students.map((student) => ({
    //   ...student, status: attLookup.includes(student.id) ? "Present" : "Absent"
    // }))


    // const cart = [{ id: 101, qty: 2 }, { id: 102, qty: 5 }];
    // const priceCatalog = [{ id: 101, price: 10 }, { id: 102, price: 2 }];

    // [
    //   { id: 101, qty: 2, totalPrice: 20 },
    //   { id: 102, qty: 5, totalPrice: 10 }
    // ]

    // const priceCatalogLookup = priceCatalog.reduce((acc, catelog) => {

    //   acc[catelog.id] = catelog.price
    //   return acc;
    // }, {} as any)

    // const result = cart.map(cartItem => ({
    //   id: cartItem.id,
    //   qty: cartItem.qty,
    //   totalPric: priceCatalogLookup[cartItem.id] * cartItem.qty
    // }))

    // const cart = [{ id: 101, qty: 2 }, { id: 102, qty: 5 }];
    // const priceCatalog = [{ id: 101, price: 10 }, { id: 102, price: 2 }];

    // [
    //   { id: 101, qty: 2, totalPrice: 20 },
    //   { id: 102, qty: 5, totalPrice: 10 }
    // ]

    // const result = cart.map(cartItem => {
    //   const itemFounded = priceCatalog.find(catItem => catItem.id === cartItem.id)

    //   return {
    //     ...cartItem,
    //     totalPrice: cartItem.qty * itemFounded!.price
    //   };
    // })

    // {
    //   Red: ['Apple', 'Cherry'],
    //   Yellow: ['Banana']
    // // }
    // const fruits = [
    //   { name: 'Apple', color: 'Red' },
    //   { name: 'Banana', color: 'Yellow' },
    //   { name: 'Cherry', color: 'Red' }
    // ];

    // const result = fruits.reduce((acc, fruit) => {
    //   if (!acc[fruit.color]) {
    //     acc[fruit.color] = []
    //   }
    //   acc[fruit.color].push(fruit.name);
    //   return acc;
    // }, {} as any)

    // const activities = [
    //   { user: 'Alice', action: 'login' },
    //   { user: 'Bob', action: 'logout' },
    //   { user: 'Alice', action: 'login' },
    //   { user: 'Charlie', action: 'login' }
    // ];

    // ['login', 'logout']

    // const result = activities.map(item => item.action)

    const employees = [
      { name: 'Alice', salary: 5000 },
      { name: 'Bob', salary: 7000 },
      { name: 'Charlie', salary: 3000 }
    ];

    [{ name: 'Bob', salary: 7000 }]

    const avgSalary = employees.reduce((acc, emp) => emp.salary + acc, 0) / employees.length



    const result = employees.filter(emp => emp.salary > avgSalary)

    // console.log('Final Result:', [...result])
    console.log('Final Result:', result)
  }
}

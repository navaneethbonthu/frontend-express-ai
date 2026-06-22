import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeService } from "./home.service";
import { StorageService } from "../../services/storage.service";
import { AsyncPipe } from "@angular/common";



interface UserSettings {
  theme: 'light' | 'dark';
  fontSize: number;
}


@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, AsyncPipe],
  template: `
    <h1>Home Page</h1>
    
<div [class.dark-theme] = darkMode >

<button (click)=toggleTheme()> Switch to {{ darkMode ? 'Light' : 'Dark' }} Mode</button>

 <p>Current Theme stored: {{ (storage$ | async)?.theme || 'light' }}</p>

</div>


    
  `,
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {

  // isRed = signal<boolean>(false)
  homeService = inject(HomeService);
  storageService = inject(StorageService);

  theme : string = ""
  darkMode: boolean = false;


  storage$ = this.storageService.watchStorage<UserSettings>('user_settings');

 

  ngOnInit(): void {
    const saved = this.storageService.getItem<UserSettings>('user_settings')

    if (saved) {
      this.darkMode = saved.theme === 'dark'
    }


  }


  toggleTheme() {
    this.darkMode = !this.darkMode

    const newSettings: UserSettings = {
      theme: this.darkMode ? 'dark' : 'light',
      fontSize: 16
    }

    this.storageService.setItem<UserSettings>('user_settings', newSettings)

  }



 

 
}


  

  



 


    


 



// virtual scroll task

// <cdk-virtual-scroll-viewport - scroll - viewport itemSize = "50" class="viewport" >

//   <div * cdkVirtualFor= "let item of items;trackBy: trackById" class="log-item" >
//     <span>{{ item.message }}</span>
//       </div>
//       </cdk-virtual-scroll-viewport>

// private homeservice = inject(HomeService)

// items: LogEntry[] = this.homeservice.getLargeDateset()


// trackById(index: number, item: LogEntry) {
//   return item.id
// }

// getLargeDateset(): LogEntry[] {
//   return Array.from({ length: 5000 }, (_, i) => ({
//     id: i,
//     message: `Item of ${i}`,
//     timestamp: new Date(),
//   }))
// }


// infiitevie scroll


// <div appinfiniteScroll(scrollEvent)="onScrollEvent()" > </div>
//   <ul>
// @for (item of items; track $index) {
//   <li>{{ item }
// } </li>
//         }
// </ul>

// @if (isLoding) {
//   <div class="loader" > Loading more items...</div>
// }
// </div>

// getItems(page: number): Observable < string[] > {
//   return of(Array.from({ length: 10 }, (_, i) => `Item ${(page * 10) + i}`));
// }

//     private destroy$ = inject(DestroyRef)
// @Output() scrollEvent = new EventEmitter()

// ngOnInit(): void {
//   fromEvent(window, 'scroll').pipe(
//     throttleTime(200),
//     map(() => this.getBottomValue()),
//     filter((value) => value < 150),
//     takeUntilDestroyed(this.destroy$),
//   ).subscribe(() => {
//     this.scrollEvent.emit()
//   })
// }


//     private getBottomValue(): number {
//   // const scrollHeight = document.scrollingElement?.scrollHeight;

//   const scrollHeight = document.documentElement.scrollHeight;

//   const scrollTop = document.documentElement?.scrollTop || window.scrollY

//   return scrollHeight - (scrollTop + window.innerHeight)

// }


//  private scrollSubject = new Subject<void>()
//   private homeService = inject(HomeService);
// page = 1

// items = signal<string[]>([])
// isLoading = signal<boolean>(false)

// ngOnInit(): void {
//   this.scrollSubject.pipe(
//     tap(() => this.isLoading.set(true)),
//     exhaustMap(() => {
//       return this.homeService.getItems(this.page).pipe(
//         tap((newItems: string[]) => {
//           this.items.update((state) => [...state, ...newItems]);
//           this.page++;
//         }),
//         catchError(() => {
//           this.isLoading.set(false)
//           return EMPTY
//         }),
//         // 5. Turn off loading regardless of success or error
//         finalize(() => this.isLoading.set(false))
//       )
//     }),
//     takeUntilDestroyed()
//   ).subscribe()
// }

// onScrollEvent() {
//   this.scrollSubject.next()
// }




// Stock data polling task
  
// <div class="dashbord" * ngIf="viewModel$ | async as vm" >
//   <span * ngIf="vm.isPolling" > {{ vm.isPolling ? 'Polling - active' : 'tabs - hidden' }}</span>
//     <ul>
// @for (item of vm.stocks; track $index) {
//   <li>
//     {{ item.symbol }
// } , { { item.timestamp | date: 'mediumTime' } }, { { item.price | number : '1.2-2' } } , { { item.change | number : '1.2-2' } }
// </li>
//       }
// </ul>
//   </div>


// export interface stockUpdate {
//   symbol: string,
//   timestamp: Date,
//   price: number,
//   change: number,
// }


// export interface ViewModel {
//   stocks: stockUpdate[],
//   isPolling: boolean;
// }

// getStockPrices(): Observable < stockUpdate[] > {
//   return of([
//     { symbol: 'AAPL', price: 150 + Math.random() * 10, change: Math.random(), timestamp: new Date() },
//     { symbol: 'TSLA', price: 200 + Math.random() * 20, change: Math.random(), timestamp: new Date() },
//     { symbol: 'GOOGL', price: 2800 + Math.random() * 50, change: Math.random(), timestamp: new Date() },
//   ]).pipe(delay(500));
// }


//  private destroy = inject(DestroyRef);
//   private homeService = inject(HomeService)

//   // stocks$: Observable<stockUpdate[]> | null = null;

//   private visibility$ = fromEvent(document, 'visibilitychange').pipe(

//     map(() => document.visibilityState === 'visible'),

//     startWith(document.visibilityState === 'visible'),

//     distinctUntilChanged(),

//     // tap(visible => this.isPolling = visible)

//     shareReplay(1)

//   )


//   private stocks$: Observable<stockUpdate[]> = this.visibility$.pipe(
//     switchMap((isVisible) => isVisible ? timer(0, 5000) : EMPTY),

//     switchMap(() => this.homeService.getStockPrices().pipe(
//       catchError((err) => {
//         console.log('Error', err)
//         return EMPTY
//       })
//     )),
//     startWith([])
//   )
  

//   readonly viewModel$: Observable<ViewModel> = combineLatest({
//     stocks: this.stocks$,
//     isPolling: this.visibility$
//   })




  // Form Task

// export interface UserProfile {
//   firstName: string;
//   lastName: string;
//   email: string;
//   skills: string[]; // Add this

// }

//   /private fb = inject(NonNullableFormBuilder);
//   private homeService = inject(HomeService)
// saveStatus = signal<'Idle' | 'Saving...' | 'Saved' | 'Error'>('Idle');
//   private destroyRef = inject(DestroyRef)


// resumeForm = this.fb.group({
//   firstName: ['', [Validators.required, Validators.minLength(2)]],
//   lastName: ['', [Validators.required, Validators.minLength(2)]],
//   email: ['', [Validators.required, Validators.email]],
//   skills: this.fb.array([
//     this.fb.control('', [Validators.required, Validators.minLength(2)])
//   ]),
// })

// ngOnInit(): void {
//   this.resumeForm.valueChanges.pipe(
//     debounceTime(1000),
//     filter(() => this.resumeForm.valid),
//     map(() => this.resumeForm.getRawValue() as UserProfile),
//     distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
//     tap(() => this.saveStatus.set('Saving...')),
//     switchMap((formValues: UserProfile) => {
//       return this.homeService.saveData(formValues).pipe(
//         catchError(() => {
//           this.saveStatus.set('Error');
//           return of({ success: false });
//         })
//       );
//     }),
//     takeUntilDestroyed(this.destroyRef) // Good practice to prevent leaks
//   ).subscribe((response) => {
//     if (response.success) {
//       this.saveStatus.set('Saved');
//     }
//   });
// }


//   get skills(): FormArray < FormControl < string >> {
//   return this.resumeForm.controls.skills
// }


// addSkils() {
//   const newControl = this.fb.control('', [Validators.required, Validators.minLength(2)])
//   this.skills.push(newControl)
// }

// removeSkills(i: number) {
//   this.skills.removeAt(i)
// }

// clearSkills() {
//   this.skills.clear();
// }
// saveProfile(data: UserProfile): Observable < { success: boolean } > {
//   console.log('%c [API] Saving to server...', 'color: orange', data);

//   return of({ success: true }).pipe(
//     delay(5000),
//     tap(() => console.log('%c [API] Save Complete!', 'color: green'))
//   );
// }






  // task 5

  // < div appInfinitveScroll(scrolled) = onScroll()>
  //       <ul>
  //       @for (item of items; track $index) {
  //   <li>{{ item }
  // } </li>
  //             }
  // </ul>
  //   </div>

  //   < div * ngIf="loading" > Loading.....</div>


  // ngOnInit(): void {
  //   this.scrollTriggered$.pipe(
  //     tap(() => this.loading = true),
  //     exhaustMap(() => this.homeService.getItems(this.nextPage))
  //   ).subscribe({
  //     next: (newItems) => {
  //       this.items = [...this.items, ...newItems],
  //         this.nextPage++;
  //     },
  //     error: () => this.loading = false
  //   })
  // }

  // onScroll() {
  //   this.scrollTriggered$.next()
  // }


  // getItems(page: number) {
  //   const items = Array.from({ length: 10 }, (_, i) => `Items ${page * 10} + i`)
  //   return of(items).pipe(delay(1000))
  // }


  // @Output() scrolled = new EventEmitter<void>();

  // destroy$ = new Subject<void>();

  // ngOnInit(): void {

  //   fromEvent(window, 'scroll').pipe(
  //     throttleTime(200),
  //     map(() => this.getBottomValue()),
  //     filter(distance => distance < 150),
  //     takeUntil(this.destroy$),
  //   ).subscribe(() => {
  //     this.scrolled.emit()
  //   })



  // }

  // private getBottomValue() {
  //   const scrollHeight = document.documentElement.scrollHeight
  //   const scrollTop = window.screenY || document.documentElement.scrollTop;

  //   return scrollHeight - (scrollTop + window.innerHeight)
  // }

  // ngOnDestroy(): void {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }


  // Task 4

  // export interface Product {
  //   id: string,
  //   name: string,
  //   description: string,
  //   price: number
  // }

  // export interface CartItem extends Product {
  //   quantity: number,
  // } 

  // addtocart() {
  //   this.cartService.addToCart(this.product)
  // }

  // onManualChange(event: Event, productId: string) {
  //   const input = event.target as HTMLInputElement;
  //   const newQty = parseInt(input.value, 10);

  //   if (!isNaN(newQty)) {
  //     this.cartService.updateQuantity(productId, newQty);
  //   }
  // }

  //    <button (click)="addtocart()" > add to cart </button>

  // @for (item of cartService.cItems(); track $index) {
  //   <p>{{ item.name }
  // }, { { item.id } } </p>,
  //   < div class="qty-controls" >
  //     <!--DECREMENT: Current quantity minus 1 -- >
  //       <button (click)="cartService.updateQuantity(item.id, item.quantity - 1)" >
  //         -
  //         </button>

  //         < !--MANUAL INPUT: Set exact value-- >
  //           <input
  //                   type="number"
  // [value] = "item.quantity"
  //   (change) = "onManualChange($event, item.id)"

  //   />

  //   <!--INCREMENT: Current quantity plus 1 -- >
  //     <button (click)="cartService.updateQuantity(item.id, item.quantity + 1)" >
  //       +
  //       </button>
  //       </div>


  //     }

  // <div class="cart-summary" >
  //   <h3>Total Price: { { cartService.totalPrice() | currency } } </h3>
  //     < button(click)="cartService.clearCart()" > Clear All </button>
  //       </div>




  // private readonly _cartItems = signal<CartItem[]>([])
  // public readonly items = this._cartItems.asReadonly();

  // public totalPrice = computed(() => this.items().reduce((acc, item) => {
  //   return acc = acc + (item.quantity * item.price)
  // }, 0))

  // public totalItemsCount = computed(() => this.items().reduce((acc, item) => {
  //   return acc = acc + (item.quantity)
  // }, 0))



  // addToCart(product: Product) {
  //   // const existingItem = items.find((item) => item.id === product.id)
  //   // if (existingItem) {
  //   //     return items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : { ...item, quantity:  1 } )
  //   // }

  //   // return [...items, { ...product, quantity: 1 }]

  //   this._cartItems.update((items) => {
  //     const index = items.findIndex((item) => item.id === product.id);

  //     if (index !== -1) {
  //       const updatedItems = [...items];
  //       updatedItems[index] = {
  //         ...updatedItems[index],
  //         quantity: updatedItems[index].quantity + 1
  //       };
  //       return updatedItems;
  //     }
  //     return [...items, { ...product, quantity: 1 }]
  //   })
  // }

  // removeCartItem(productId: string) {
  //   this._cartItems.update((items) => {
  //     return items.filter((item) => item.id !== productId)
  //   })
  // }


  // updateQuantity(productId: string, quantity: number) {
  //   if (quantity <= 0) {
  //     this.removeCartItem(productId);
  //     return;
  //   }
  //   this._cartItems.update((items) => {
  //      item.id === productId ? { ...item, quantity:qty } : item
  //   })
  // }

  // clearCart(): void {
  //   this._cartItems.set([]);
  // }


  // task 3

  // <button * appHasRole="['admin',  'editor']" >
  // Delete Database
  //   </button>

  //   < !--Visible to admins OR editors-- >
  //     <div * appHasRole="['admin', 'editor']" >
  //       <p>Edit Article Content </p>
  //         </div>


  // homeService = inject(HomeService);
  // visible = false;
  // tempRef = inject(TemplateRef);
  // viewContainerRef = inject(ViewContainerRef);

  // @Input() set appHasRole(roles: string[]) {
  //   this.updateView(roles);
  // }

  // private updateView(roles: string[]) {

  //   const hasAccess = this.homeService.hasAccessRole(roles);

  //   if (hasAccess && !this.visible) {
  //     this.viewContainerRef.createEmbeddedView(this.tempRef);
  //     this.visible = true;
  //   } else if (!hasAccess && this.visible) {
  //     this.viewContainerRef.clear();
  //     this.visible = false;
  //   }


  // }

  // currentUserRoles = signal<string[]>(['editor']);

  // hasAccessRole(roles: string[]) {
  //   return this.currentUserRoles().some(role => roles.includes(role))
  // }






  // Task 2

  // template logic
  //  <h1>{{ selectedNode?.label }} , { { selectedNode?.id } } </h1>
  // @for (folder of treeData; track $index) {
  //   <app-tree - node[node]=" folder" > </app-tree-node>


  // treeData: TreeNode[] = []
  // private homeService = inject(HomeService);
  // selectedNode: TreeNode | null = null;

  // ngOnInit(): void {
  //   this.treeData = [
  //     {
  //       id: '1',
  //       label: 'Projects',
  //       isOpen: true,
  //       children: [
  //         {
  //           id: '1.1',
  //           label: 'Frontend',
  //           children: [
  //             { id: '1.1.1', label: 'index.html' },
  //             { id: '1.1.2', label: 'styles.css' }
  //           ]
  //         }, {
  //           id: '1.2',
  //           label: 'Backend',
  //           children: []
  //         }
  //       ]
  //     },
  //     {
  //       id: '2',
  //       label: 'Personal',
  //       children: [{ id: '2.1', label: 'Resume.pdf' }]

  //     }
  //   ]


  //   this.homeService.nodeSelectedObs$.subscribe((node: TreeNode) => {
  //     this.selectedNode = node
  //   })

  // }


  // treenode template logic

  //    <div class = "treenode" >
  //   <div class="label-container"(click) = "toggle()" >
  //     <span  class="label"(click) = "handelLabelClick(node)" > {{ node.label }}</span>
  //       < span  class="label-icon" * ngIf="node.children && node.children?.length" > {{ node.isOpen ? '<' : '>' }}</span>
  //         </div>
  //         </div>

  //         < div * ngIf="node.isOpen && node.children?.length" >
  //           @for (child of node.children; track $index) {
  //   <app-tree - node[node]="child" > </app-tree-node>
  // }
  // </div>


  // @Input() node!: TreeNode;

  // homeService = inject(HomeService);

  // ngOnInit(): void {

  // } 

  // toggle() {
  //   if (this.node.children) {

  //     this.node.isOpen = !this.node.isOpen
  //   }
  // }

  // handelLabelClick(node: TreeNode) {
  //   this.homeService.getSelectedNode(node)
  // }



  // private subject = new Subject();
  // nodeSelectedObs$: any = this.subject.asObservable()

  // getSelectedNode(node: TreeNode) {
  //   this.subject.next(node)
  // }





















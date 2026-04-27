import { Component, HOST_TAG_NAME, OnDestroy, OnInit, inject } from "@angular/core"
import { Subject, Observable, exhaustMap, forkJoin, catchError, of, BehaviorSubject, combineLatest, map, switchMap, tap, filter, debounceTime, distinctUntilChanged, EMPTY, takeUntil, first, startWith } from "rxjs"
import { HomeService } from "./home.service"

import { AsyncPipe, CurrencyPipe, JsonPipe, NgIf, NgForOf } from "@angular/common"
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { TreeNodeComponent } from "../tree-node/tree-node";
import { RepeatDirective } from "../../directives/infinitivescroll.directive";
import { email, validate } from "@angular/forms/signals";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";









@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, NgForOf, JsonPipe, AsyncPipe],
  template: `
   <div [formGroup]="resumeForm">
      <h3>Skills List</h3>
<div>
    <label>Full Name:</label>
    <input formControlName="fullName" type="text" />
  </div>

  <hr />
      <div formArrayName="skills">
        <div *ngFor="let skill of skills.controls; let i = index" class="skill-row">
          <input [formControl]="skill" placeholder="Enter skill (e.g. Angular)" />

          <button type="button" (click)="removeSkill(i)">Remove</button>
        </div>
      </div>

      <div class="actions">
        <button type="button" (click)="addSkills()">+ Add Skill</button>
        <!-- <button type="button" (click)="clearAllSkills()">Clear All</button> -->
        <!-- <button type="button" (click)="resetForm()">Reset to Initial</button> -->
      </div>

      <hr />
      <!-- <p>Total Skills Count: <strong>{{ skillCount$ | async }}</strong></p> -->
      <pre>{{ resumeForm.getRawValue() | json }}</pre>
      <pre>{{ skillCount$ | async }}</pre>
    </div>

    
 
  `,

  styleUrl: './home.scss',
})
export class Home {

  private fb = inject(NonNullableFormBuilder);


  resumeForm = this.fb.group({
    firstName: this.fb.control('', [Validators.required, Validators.min(3), Validators.max(20)]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    skills: this.fb.array<FormControl<string>>([
      this.fb.control('', [Validators.required])
    ])
  })


  get skills(): FormArray<FormControl<string>> {
    return this.resumeForm.controls.skills;
  }

  skillCount$: Observable<number> = this.skills.valueChanges.pipe(
    startWith(this.skills.value),
    tap(() => console.log(this.skills.value)),
    map(skills => skills.length)
  )


  addSkills(): void {

    const newControl = this.fb.control('', [Validators.required, Validators.min(3)])
    this.skills.push(newControl);

  }


  removeSkill(index: number) {
    this.skills.removeAt(index)
  }

  clearSkills() {
    this.skills.clear();
  }


  saveSkills() {
    if (this.resumeForm.valid) {
      const data = this.resumeForm.getRawValue()
    } else {

    }
  }




  // Form Task

  // <form[formGroup]="resumeForm" >
  // <div formArrayName='skills' >


  //   <div * ngFor="let skill of skills.controls; let i = index" >

  //     <input[formControl]='skill' placeholder = "e.g. Angular, RxJS, TypeScript" >

  //       <button type="button"(click) = "removeSkill(i)"[disabled] = "skills.length === 1" >
  //         Remove
  //         </button>

  //         < button type = "button"(click) = "skill.reset()" > Undo </>

  //           </div>

  //           < div class="actions" >
  //             <button type="button"(click) = "addSkill()" > + Add Skill </button>
  //               < button type = "button"(click) = "clearAllSkills()" class="danger" > Clear All </>
  //                 < button type = "button"(click) = "saveSkills()" > Submit Skills </>
  //                   </div>
  //                   </div>
  //                   </form>

  //                   < div class="preview" >
  //                     <strong>Data to send: </strong>
  //                       < pre > {{ resumeForm.getRawValue() | json }}</>
  //                         </div>



  // private fb = inject(NonNullableFormBuilder);

  // resumeForm = this.fb.group({
  //   skills: this.fb.array<FormControl<string>>([
  //     this.fb.control('', [Validators.required, Validators.min(3), Validators.max(20)])
  //   ])
  // })

  // get skills() {
  //   return this.resumeForm.controls.skills;
  // }

  // addSkill(): void {
  //   const newSkill = this.fb.control('', Validators.required);
  //   this.skills.push(newSkill);
  // }


  // removeSkill(index: number): void {
  //   if (this.skills.length > 0) {
  //     this.skills.removeAt(index);
  //   }
  // }


  // clearAllSkills(): void {
  //   this.skills.clear();
  //   this.addSkill()
  // }


  // saveSkills(): void {
  //   if (this.resumeForm.valid) {
  //     const finalData: string[] = this.resumeForm.getRawValue().skills
  //     console.log('Sending skills to API:', finalData);
  //   } else {
  //     console.error('Form is invalid');
  //   }
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














  // Task 1

  // template logic

  //  <input[formControl]="searchControl" placeholder = "search here..." >
  // <div * ngIf="isLoading" > Loding....</div>


  //   < ul * ngIf="results$ | async as results" >
  //     li * ngFor="let item of results" > {{ item.name }}</li>
  //    </ul>

  // service logic 

  // apiUrl = ''

  // private http = inject(HttpClient)


  // search(term: string): Observable<any[]> {

  //   if (!term.trim()) {
  //     return of([])
  //   }

  //   const params = new HttpParams().set('q', term)

  //   return this.http.get<any[]>(`${this.apiUrl}`, { params })

  // }

  // component Logic


  // searchControl = new FormControl('');

  // results$!: Observable<any>;

  // isLoading: boolean = false;

  // constructor(private homeService: HomeService) { }


  // ngOnInit(): void {
  //   this.results$ = this.searchControl.valueChanges.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),

  //     tap((term) => {
  //       if (term!.length >= 3) {
  //         this.isLoading = true;
  //       }
  //     }),


  //     switchMap(term => {
  //       if (term!.length <= 3) {
  //         return of([]);
  //       }

  //       return this.homeService.search(term!).pipe(
  //         tap(() => {
  //           this.isLoading = false;
  //         }),

  //         catchError(() => {
  //           this.isLoading = false;
  //           // show toast
  //           return EMPTY
  //         })
  //       )
  //     })

  //   )
  // }


}






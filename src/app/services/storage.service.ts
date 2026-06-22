import { DestroyRef, inject, Injectable } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { filter, fromEvent, map, Observable, Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class StorageService {


    storageChanges$ = new Subject();
    destroy$ = inject(DestroyRef)

    constructor() {
       
        fromEvent<StorageEvent>(window, 'storage')
            .pipe(
                // 2. Automatically stop listening when the service is destroyed
                takeUntilDestroyed(this.destroy$)
            )
            .subscribe((event) => {
                if (event.key) {
                    this.storageChanges$.next(event.key);
                }
            });
    }



    setItem<T>(key: string, value: T): void {

        localStorage.setItem(key, JSON.stringify(value))
        this.storageChanges$.next(key)

    }

    getItem<T>(key: string): T | null {
        const data = localStorage.getItem(key)

        if (!data) {
            return null
        }

        try {
            return JSON.parse(data) as T
        } catch (e) {
            return null;
        }

    }

    watchStorage<T>(key: string): Observable<T | null> {

        return this.storageChanges$.asObservable().pipe(
            filter((changedKey) => changedKey === key),
            map(() => this.getItem<T>(key))
        )

    }





}



// import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
// import { ReactiveFormsModule } from "@angular/forms";
// import { HomeService } from "./home.service";
// import { StorageService } from "../../services/storage.service";
// import { AsyncPipe } from "@angular/common";



// interface UserSettings {
//     theme: 'light' | 'dark';
//     fontSize: number;
// }


// @Component({
//     selector: 'app-home',
//     imports: [ReactiveFormsModule, AsyncPipe],
//     template: `
//     <h1>Home Page</h1>
    
// <div [class.dark-theme] = darkMode >

// <button (click)=toggleTheme()> Switch to {{ darkMode ? 'Light' : 'Dark' }} Mode</button>

//  <p>Current Theme stored: {{ (storage$ | async)?.theme || 'light' }}</p>

// </div>


    
//   `,
//     styleUrl: './home.scss',
//     changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class Home implements OnInit {

//     // isRed = signal<boolean>(false)
//     homeService = inject(HomeService);
//     storageService = inject(StorageService);

//     theme: string = ""
//     darkMode: boolean = false;


//     storage$ = this.storageService.watchStorage<UserSettings>('user_settings');



//     ngOnInit(): void {
//         const saved = this.storageService.getItem<UserSettings>('user_settings')

//         if (saved) {
//             this.darkMode = saved.theme === 'dark'
//         }


//     }


//     toggleTheme() {
//         this.darkMode = !this.darkMode

//         const newSettings: UserSettings = {
//             theme: this.darkMode ? 'dark' : 'light',
//             fontSize: 16
//         }

//         this.storageService.setItem<UserSettings>('user_settings', newSettings)

//     }






// }




import { HttpClient, HttpContext, HttpContextToken, HttpParams } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core"
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { Observable, of, delay, tap, throwError, catchError, EMPTY, debounceTime, distinctUntilChanged, switchMap, timestamp } from "rxjs"
import { LogEntry } from "./interface";



@Injectable({
    providedIn: 'root',
})

export class HomeService {



    saveLike(postid: string, like: boolean): Observable<{ success: boolean }> {
        console.log("[API] setting like to", like)

        return of({ success: true }).pipe(
            delay(2000),
            switchMap(() => {
                return Math.random() < 0.3 ? throwError(() => 'Server Error: could not save like') : of({ success: true })
            })
        )
    }




}
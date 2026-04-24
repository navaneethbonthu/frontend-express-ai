import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http"
import { computed, DestroyRef, inject, Injectable, OnInit, signal } from "@angular/core"
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { State } from "@ngrx/store";
import { Observable, of, delay, Subject, BehaviorSubject, switchMap, map, catchError, throwError, single, EMPTY, debounceTime, distinctUntilChanged, tap, take } from "rxjs"

@Injectable({
    providedIn: 'root',
})

export class HomeService {

}
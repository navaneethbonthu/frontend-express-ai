import { Directive, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subject, fromEvent, throttleTime, distinctUntilChanged, map, filter, takeUntil } from "rxjs";



@Directive({
    selector: '[appInfinitiveScroll]'
})

export class InfinitiveScrollDirective {






}
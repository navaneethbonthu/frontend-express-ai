import { Injectable } from "@angular/core"
import { Observable, of, delay, Subject, BehaviorSubject } from "rxjs"

@Injectable({
    providedIn: 'root',
})

export class HomeService {


    private subject = new BehaviorSubject('intialMessae');

    public subjectObs: Observable<any> = this.subject.asObservable();


    udpateMessage(text: string) {
        this.subject.next(text);
    }



}
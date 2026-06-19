import { computed, Injectable, signal } from "@angular/core";
import { delay, Observable, of, throwError, timestamp } from "rxjs";

// 2. Service (Keep it simple for the compiler)

// export interface FormData {
//     name: 
// }
@Injectable({ providedIn: 'root' })
export class HomeService {


    saveFormData(formData: any): Observable<any> {

        console.log('Saving to server...', formData);
        // Simulate API call


        if (Math.random() > 0.3) {
            console.log('Saved Successfully...');
            return of({ status: 'success', timestamp: new Date() }).pipe(delay(1000));
        } else {
            console.log('Failed to save');
            return throwError(() => new Error('Server Error')).pipe(delay(1000));
        }
    }




}
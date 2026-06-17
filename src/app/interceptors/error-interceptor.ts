import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";



export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {


            // INDUSTRY STANDARD: Skip 401s
            // We don't want to show "Server Error" or "Unauthorized" popups
            // if the authInterceptor is currently trying to fix the problem!
            if (error.status === 401) {
                return throwError(() => error);
            }

            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
                // Client-side network error
                errorMessage = `Network Error: ${error.error.message}`;
            } else {
                switch (error.status) {
                    case 401: errorMessage = 'Unauthorized , Token expired. Please login again.'; break;
                    case 403: errorMessage = 'Forbiden , You do not have permission.'; break;
                    case 404: errorMessage = 'Not Found , Resource not found.'; break;
                    case 500: errorMessage = 'Internal Server Error.'; break;
                    default: errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

                }
            }

            return throwError(() => new Error(errorMessage))
        })
    )

}
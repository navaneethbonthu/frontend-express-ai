import { ErrorHandler } from "@angular/core";



export class GlobalErrorHandler implements ErrorHandler {
    zone: any;
    handleError(error: any): void {
        console.log('Caught by Global Handler:', error)

        const message = error.message ? error.message : error.toString()

        // 3. UI updates must run inside NgZone to ensure change detection triggers
        this.zone.run(() => {
            // this.notifier.showError(message || 'An unexpected error occurred.');
        });


    }
}
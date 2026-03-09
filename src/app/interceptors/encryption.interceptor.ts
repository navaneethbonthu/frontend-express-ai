import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { EncryptionService } from '../services/encryption.service';

export const encryptionInterceptor: HttpInterceptorFn = (req, next) => {
    const encryptionService = inject(EncryptionService);
    console.log("encptyed req before", req.body)

    let request = req;

    // 1. DECRYPT OUTGOING REQUEST
    if (['POST', 'PUT', 'PATCH', 'GET'].includes(req.method) && req.body) {
        request = req.clone({
            body: { data: encryptionService.encrypt(req.body) }

        });
        console.log("encptyed req after", encryptionService.encrypt(req.body))
    }

    // 2. ENCRYPT INCOMING RESPONSE
    return next(request).pipe(
        map((event) => {
            if (event instanceof HttpResponse) {
                // Bypass TS strictness by casting to 'any'
                const body = event.body as any;

                // If the backend sent encrypted data, decrypt it
                if (body && body.data) {
                    const decryptedBody = encryptionService.decrypt(body.data);
                    // Give the clean data to the Angular Component
                    return event.clone({ body: decryptedBody });
                }
            }
            return event;
        })
    );
};
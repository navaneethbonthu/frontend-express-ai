import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { EncryptionService } from '../services/encryption.service';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';

export const encryptionInterceptor: HttpInterceptorFn = (req, next) => {
    const encryptionService = inject(EncryptionService);

    let request = req;

    // 1. Encrypt Outgoing
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
        request = req.clone({
            // Change to encryptedData
            body: { encryptedData: encryptionService.encrypt(req.body) }
        });
    }

    // 2. Decrypt Incoming
    return next(request).pipe(
        map((event) => {
            if (event instanceof HttpResponse) {
                const body = event.body as any;

                // Change to check for encryptedData
                if (body && body.encryptedData) {
                    const decryptedBody = encryptionService.decrypt(body.encryptedData);
                    return event.clone({ body: decryptedBody });
                }
            }
            return event;
        })
    );
};
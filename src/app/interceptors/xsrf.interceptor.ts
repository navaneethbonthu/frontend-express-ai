import { HttpInterceptorFn } from '@angular/common/http';

export const xsrfInterceptor: HttpInterceptorFn = (req, next) => {
    // 1. Only add header to 'mutating' methods
    const forbiddenMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];

    if (forbiddenMethods.includes(req.method)) {
        // 2. Manually read the cookie
        const name = 'XSRF-TOKEN=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        let token = '';

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                token = c.substring(name.length, c.length);
            }
        }

        // 3. If token found, clone request and add header
        if (token) {
            req = req.clone({
                setHeaders: {
                    'x-xsrf-token': token
                }
            });
        }
    }

    return next(req);
};
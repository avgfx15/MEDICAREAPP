import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userAuthService: UserAuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    /* TODO document why this constructor is empty */
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwt = this.userAuthService.getSingleCookie('jwt');
    this.userAuthService.getUserData();
    if (jwt) {
      req = req.clone({
        setHeaders: { cookies: jwt },
      });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        setHeaders: { 'Content-Type': 'application/json' },
      });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event --->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/signin']);
        }
        if (error.status === 400) {
          alert(error.error);
        }
        return throwError(error);
      })
    );
  }
}

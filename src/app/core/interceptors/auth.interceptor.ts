import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const loggedInUser = sessionStorage.getItem('loggedInUser');
    
    // Clone the request and add the authorization header if token is available
    if (loggedInUser) {
      const token = environment.ACCESS_TOKEN;
      request = request.clone({
        setHeaders: {
          accept:'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}

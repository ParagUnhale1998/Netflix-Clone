import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const loggedInUser = sessionStorage.getItem('loggedInUser');
    
    // Clone the request and add the authorization header if token is available
    if (loggedInUser) {
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDhiM2RiMDcyNzQyODU0OWYwZTc3MWE1MjhjNzE0YyIsInN1YiI6IjY2M2U1NTZjNTY2MTI4MGQ3ZGZiMzdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f3wD2arnCMw_AWGKpD6xvXOPA-kFI9h3pCNuPCrQj78'
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

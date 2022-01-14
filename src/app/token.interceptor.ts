import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");
    const code = localStorage.getItem("code");
    if(token && code){
  
      const cloned = request.clone({
        headers: request.headers.set("X-Auth-Token",token)
      });
      return next.handle(cloned);
    }
    else{
      return next.handle(request);
    }
  }
}
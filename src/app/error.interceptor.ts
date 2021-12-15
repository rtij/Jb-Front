import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(catchError((error : HttpErrorResponse)=>
    {
      // if(error.error=="bad request"){
      //   this.authService.getLogout();
      //   this.authService.logout();
      // }
      return throwError(error.error);
    }
    ))
  }
}

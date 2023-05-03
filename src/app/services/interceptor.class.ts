import { Injectable, NgModule } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  data:any;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   if (localStorage.getItem('accessToken') === null) {
      this.data = '';
    } else {
      this.data = localStorage.getItem('accessToken');
    }
    // add a custom header
    const customReq = request.clone({
      headers: request.headers.set('Logistics', this.data)
    });

    // pass on the modified request object
    return next.handle(customReq);
  }
}

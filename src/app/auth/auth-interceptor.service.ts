import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userSubject } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = userSubject.value
    if(!user) return next.handle(req)
    const modifiedReq = req.clone({params: new HttpParams().set('auth',user.token)})
    return next.handle(modifiedReq)
  }

}

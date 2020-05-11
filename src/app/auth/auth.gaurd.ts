import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userSubject } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class AuthGaurd implements CanActivate  {

  constructor(private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return userSubject.pipe(
      take(1), // unsubscribe after recieved one value
      map(user =>  {
      const isAuth = !!user
      return isAuth ? true : this.router.createUrlTree(['/auth'])
    } ))
  }

}

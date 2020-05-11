import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?: boolean //optional
}


export const userSubject = new BehaviorSubject<User>(null);

@Injectable({providedIn:'root'})
export class AuthService {

  apiKey = 'AIzaSyC7x33v8Ych6pDFX_M4mCza3pabcmu1Gn0'
  api = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp'
  logInApi = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'

  private timer : any
  private userDataKey = 'userData'

  /**
   * The BehaviorSubject has the characteristic that it stores the “current” value.
   * This means that you can always directly get the last emitted value from the BehaviorSubject.
  */


  constructor(private http: HttpClient,private router: Router){}


  signup(email:string,password:string){
    return this.http.post<AuthResponseData>(`${this.api}?key=${this.apiKey}`,{
      email,password,returnSecureToken:true
    }).pipe(catchError(this.handleError), tap(this.saveUser.bind(this)))

  }

  login(email:string,password:string){
    return this.http.post<AuthResponseData>(`${this.logInApi}?key=${this.apiKey}`,{
      email,password,returnSecureToken:true
    }).pipe(catchError(this.handleError), tap(this.saveUser.bind(this)))
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured!'
    if(!errorRes.error || !errorRes.error.error)
      return throwError(errorMessage)
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS' : errorMessage = 'Email already exists'; break
      case 'EMAIL_NOT_FOUND' : errorMessage = 'Email not found'; break
      case 'INVALID_PASSWORD' : errorMessage = 'Invalid password'; break
      case 'USER_DISABLED' : errorMessage = 'User has been diabled'
    }
    return throwError(errorMessage)
  }

  autoLogout(expirationDuration: number){
    // this.timer = setTimeout( ()=> this.logout(),3000)
    this.timer = setTimeout( ()=> this.logout(),expirationDuration)
  }

  private saveUser(data: AuthResponseData){
    const expiresDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
    const user = new User(data.email,data.localId,data.idToken,expiresDate)
    userSubject.next(user);
    this.autoLogout(+data.expiresIn * 1000)
    localStorage.setItem(this.userDataKey,JSON.stringify(user))
  }

  autoLogin() {
    const savedUserData = localStorage.getItem(this.userDataKey)
    if(!savedUserData) return;
    const userData = JSON.parse(savedUserData)
    const user = User.formJSON(userData)

    if(user.token) { // it will run olny if it is a valid token
      userSubject.next(user)
      const exiprationDate =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(exiprationDate)
    }

  }


  logout(){
    userSubject.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem(this.userDataKey)
    if(this.timer) clearTimeout(this.timer)
    this.timer = null
    //localStorage.clear() //clear all the data
  }

}

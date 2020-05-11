import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl:'./auth.component.html'
})
export class  AuthComponent {

  constructor(private authSerice: AuthService, private router: Router){}

  isLoginMode = true;
  isLoading = false;
  error:string = null

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm){
    if(form.invalid) return
    this.isLoading = true

    const email = form.value.email
    const password = form.value.password
    let authObs: Observable<AuthResponseData>;

    authObs = this.isLoginMode
    ? this.authSerice.login(email,password)
    : this.authSerice.signup(email,password)

    authObs.subscribe(
      resData =>  this.onSuccess(resData),
      errorMessage  =>  this.onError(errorMessage)
    );

  }

  private onSuccess(response: AuthResponseData){
    console.log(response)
    this.isLoading = false
    this.router.navigate(['./recipes'])
  }

  private onError(errorMessage: string){
    this.error = errorMessage
    this.isLoading = false
  }

}

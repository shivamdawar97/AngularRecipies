import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component'
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl:'./auth.component.html'
})
export class  AuthComponent implements OnDestroy{

  constructor(private authSerice: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver){}

  isLoginMode = true
  isLoading = false

  //finds the first occurence of that directive in the dom
  @ViewChild(PlaceholderDirective,{static:false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription

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

    this.showErrorAlert(errorMessage);
    this.isLoading = false
  }

  private showErrorAlert(errorMessage:string){

    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    //next thing we clear anything that might have been rendered before
    hostViewContainerRef.clear();

    //This create a new component in that place
    const compRef = hostViewContainerRef.createComponent(alertCmpFactory);
    compRef.instance.message = errorMessage;
    this.closeSub = compRef.instance.close.subscribe(()=> {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })

  }

  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe()
    }
  }


}

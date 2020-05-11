import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService, userSubject } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated = false
  private userSubs: Subscription

  constructor(private storageService:DataStorageService, private authService:AuthService){}

  ngOnInit(): void {
    // this.userSubs= this.authService.userSubject.subscribe( user => this.changeAuthStatus(user) )
     this.userSubs= userSubject.subscribe( user => this.changeAuthStatus(user) )
  }

  onSaveData(){
    this.storageService.storeRecipes()
  }

  onDataFetch(){
    this.storageService.fetchRecipes().subscribe()
  }

  private changeAuthStatus(user: User){
    this.isAuthenticated =   !user ? false : true //!!user
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe()
  }


}

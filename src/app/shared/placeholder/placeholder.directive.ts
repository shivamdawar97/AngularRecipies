import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector:'[appPlaceholder]'
})
export class PlaceholderDirective {
  constructor(public viewContainerRef:ViewContainerRef){
      // gives the access to the reference to a pointer  at the place where this directive is used

  }
}

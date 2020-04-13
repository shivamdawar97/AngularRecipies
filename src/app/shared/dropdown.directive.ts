import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {

  // Bind the class property of that element whcih is using this
  @HostBinding('class.open.show') isOpen = false;

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen
    console.log('clicked')
  }
}

import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  @ViewChild('f',{static:false}) slForm: NgForm
  subscription: Subscription
  editMode = false
  editedItemIndex: number
  editedItem: Ingredient

  constructor(private slService: ShoppingListService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
   this.subscription =  this.slService.startEditing.subscribe(
     (index) => {
       this.editedItemIndex = index
       this.editMode = true
       this.editedItem = this.slService.getIngredient(index)
       this.slForm.setValue({
         name: this.editedItem.name,
         amount: this.editedItem.amount,
       })
     }
   )
  }

  onAddItem(form: NgForm){
    const value = form.value
    const newIngredient = new Ingredient(value.name,value.amount)
    if(this.editMode) this.slService.updateIngredient(this.editedItemIndex,newIngredient)
    else this.slService.onIngredientAdded(newIngredient)
    this.editMode = false
    form.reset()
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }
}

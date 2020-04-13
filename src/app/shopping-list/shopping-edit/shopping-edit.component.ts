import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput',{static:true}) nameInput: ElementRef
  @ViewChild('amountInput') amountInput: ElementRef

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){
    const ingName = this.nameInput.nativeElement.value
    const ingAmount = this.amountInput.nativeElement.value
    const newIngredient = new Ingredient(ingName,ingAmount)
    this.slService.onIngredientAdded(newIngredient)
  }

}

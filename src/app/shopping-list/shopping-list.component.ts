import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[]
  private igChangesd: Subscription
  constructor(private shoppingListService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.igChangesd.unsubscribe()
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.igChangesd = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[] ) => this.ingredients = ingredients
    )
  }

  onEditItem(i: number){
      this.shoppingListService.startEditing.next(i)
  }
}

import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>()

  private recipes: Recipe[] = [
    new Recipe(
      'Briyani',
      'Chciken Briyani',
      'https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg',
      [
        new Ingredient('Meat',1),
        new Ingredient('French Fries',20),
      ]),
    new Recipe(
      'Anda',
      'Anda Briyani',
      'https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg',
      [
        new Ingredient('Jirra',1),
        new Ingredient('Meat',1),
        new Ingredient('Jaipatri',20),
      ])
  ]
  constructor(private slService: ShoppingListService){}

  getRecipes() {
    return this.recipes.slice()
  }

  addIngredientsToShoping(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients)
  }

}

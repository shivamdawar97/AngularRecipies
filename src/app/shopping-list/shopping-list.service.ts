import { Ingredient } from '../shared/ingredient.model';
import {  Subject } from 'rxjs';

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>()
  startEditing = new Subject<number>()

  private ingredients: Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatos',8)
  ]

  getIngredients() {
    return this.ingredients.slice()
  }

  getIngredient(index) {
    return this.ingredients[index]
  }

  onIngredientAdded(ingredient:Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    //for(let ing of ingredients) this.onIngredientAdded(ing)
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

}

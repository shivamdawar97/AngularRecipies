import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map,tap } from 'rxjs/operators'


@Injectable({
  providedIn:'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,private recipeService:RecipeService){}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes()
    this.http.put('https://ng-complete1.firebaseio.com/recipes.json',recipes).subscribe(response => console.log(response))

  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://ng-complete1.firebaseio.com/recipes.json').pipe(
     map( recipes => recipes.map(recipe => { return {...recipe, ingredients: recipe.ingredients?? [] }})),
     tap( recipes => this.recipeService.setRecipes(recipes) )
    )
  }

  fetchRecipesAlternate() {
    // return userSubject.pipe(take(1), exhaustMap( user =>
    //    this.http.get<Recipe[]>('https://ng-complete1.firebaseio.com/recipes.json', {
    //      params: new HttpParams().set('auth',user.token)
    //    })
    // ),
    // map( recipes => recipes.map(recipe => { return {...recipe, ingredients: recipe.ingredients?? [] }})),
    // tap( recipes => this.recipeService.setRecipes(recipes) ))

    // exhaustMap waits for the first observable to complete, which will happen after we took the latest user.
    // with 'tap' we can do some pre coding befrore passing it to subscribe without altering the data
    // using 'take' we say that the no of times we wanr to recieve value, no need to unsubscribe

  }

}

import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Chai','Test is test reciep',
    'https://upload.wikimedia.org/wikipedia/commons/9/91/Long_Beach_Tea_Recipe.jpg')
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

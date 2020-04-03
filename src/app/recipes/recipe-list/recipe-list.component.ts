import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipes: Recipe[] = [
    new Recipe('Briyani','Chciken Briyani','https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg'),
    new Recipe('Briyani','Chciken Briyani','https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg')
  ]

  constr
  constructor() { }

  ngOnInit(): void {
  }

}

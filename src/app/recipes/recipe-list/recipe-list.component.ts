import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  recipes: Recipe[]
  subscripttion: Subscription

  constructor(private recipeService: RecipeService,private router: Router,private activatedRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.subscripttion.unsubscribe()
  }

  ngOnInit(): void {

    this.recipes = this.recipeService.getRecipes()
    this.subscripttion= this.recipeService.recipesChanged.subscribe(recipes => this.recipes=recipes)
  }

  onNewClicked(){
    this.router.navigate(['new'], {relativeTo: this.activatedRoute})
  }

}

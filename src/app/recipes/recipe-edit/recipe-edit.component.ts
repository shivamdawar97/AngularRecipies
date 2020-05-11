import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validator, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,private service: RecipeService, private router: Router) { }
  id: number
  editMode = false
  recipeForm: FormGroup

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = +params['id']
      this.editMode = params['id'] != null
      this.initForm()
    })
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  private initForm() {
    let recipeName = ''
    let imagePath = ''
    let desc = ''
    let recipeIngredients =  new FormArray([])

    if(this.editMode) {
      const recipe = this.service.getRecipe(this.id)
      recipeName = recipe.name
      imagePath = recipe.imagePath
      desc = recipe.description
      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
           console.log(ingredient)
           recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name,Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }))
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(imagePath, Validators.required),
      'description' : new FormControl(desc, Validators.required),
      'ingredients' : recipeIngredients
    })
  }

  onSubmit() {
    // const value = this.recipeForm.value
    // const newRecipe = new Recipe(
    // value['name'],
    // value['description'],
    // value['imagePath'],
    // value['ingredients']);
    if(this.editMode) this.service.updateRecipe(this.id,this.recipeForm.value)
    else this.service.addRecipe(this.recipeForm.value)
    this.onCancel()
  }

  onAddIngredient() {
    (<FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('',Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  get controls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
    //*ngFor="let ingredientCtrl of controls; let i = index"
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onAllIngredientsRemoved(){
    (<FormArray>this.recipeForm.get('ingredients')).clear()
  }

}

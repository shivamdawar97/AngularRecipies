import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch:'full' },

  // load on when the path visited
  // { path: 'recipes', loadChildren:'./recipes/recipies.module#RecipiesModule'  }
  { path: 'recipes', loadChildren: () => import('./recipes/recipies.module').then(m => m.RecipiesModule)  },
  { path:'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
  {
    path:'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

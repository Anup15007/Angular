import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from './categories/categories.component';
import {CategoryDashboardComponent} from './category-dashboard/category-dashboard.component';
import {CategoryDetailComponent} from './category-detail/category-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/category-dashboard', pathMatch: 'full' },
  {path: 'categories' , component: CategoriesComponent},
  {path: 'category-dashboard' , component: CategoryDashboardComponent},
  { path: 'category/:id', component: CategoryDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

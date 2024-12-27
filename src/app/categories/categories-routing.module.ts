import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent }, // Default route: Category list
  { path: 'add', component: CategoryFormComponent }, // Route for adding a category
  { path: 'edit/:id', component: CategoryFormComponent }, // Route for editing a category
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}

import { Routes } from '@angular/router';
import {CategoryComponent} from "./categories/category.component";
import {TaskComponent} from "./tasks/task.component";
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'categories', component: CategoryComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
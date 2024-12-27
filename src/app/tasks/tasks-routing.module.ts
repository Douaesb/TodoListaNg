import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';

const routes: Routes = [
  { path: '', component: TaskListComponent }, // Default route: Task list
  { path: 'add', component: TaskFormComponent }, // Route for adding a task
  { path: 'edit/:id', component: TaskFormComponent }, // Route for editing a task
  { path: 'dashboard', component: TaskDashboardComponent }, // Route for task dashboard
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    TaskListComponent, // Import standalone components
    TaskFormComponent, // Import standalone components
    TaskDashboardComponent, // Import standalone components
  ],
})
export class TasksModule {}

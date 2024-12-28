import {Component} from '@angular/core';
import {TasksModel} from "../models/task.model";
import {TaskService} from "../services/task.service";
import {TaskListComponent} from "./task-list/task-list.component";
import {TaskFormComponent} from "./task-form/task-form.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    TaskListComponent,
    TaskFormComponent,
    NgIf
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent  {
  tasks: TasksModel[] = [];
  showFormPopup = false;
  taskToEdit: TasksModel | null = null;

  constructor(private readonly taskService: TaskService) {
    this.fetchTasks()
  }


  fetchTasks() {
    this.tasks = this.taskService.getTasks()
  }


  addTask() {
    this.showFormPopup = true;
    this.taskToEdit = null;
  }


  editTask(task: TasksModel) {
    this.showFormPopup = true;
    this.taskToEdit = task;
  }

  deleteTask(task: TasksModel) {
      this.taskService.deleteTask(task)
      this.fetchTasks();    
  }

  handleFormSubmitted() {
    this.showFormPopup = false;
    this.fetchTasks();
  }

}
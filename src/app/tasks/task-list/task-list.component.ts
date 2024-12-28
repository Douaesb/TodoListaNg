import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksModel } from "../../models/task.model";
import { TaskService } from "../../services/task.service";
import { TaskSearchPipe } from '../../shared/task-filter.pipe';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    FormsModule,
    TaskSearchPipe,
    NgClass,
    CommonModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class TaskListComponent implements OnInit {
  @Input() tasks: TasksModel[] = [];
  @Output() editTaskEvent = new EventEmitter<TasksModel>();
  @Output() deleteTaskEvent = new EventEmitter<TasksModel>();

  searchText: string = '';

    showModal: boolean = false; 
    selectedTask: TasksModel | null = null; 
    
  constructor(private readonly taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  editTask(task: TasksModel) {
    this.editTaskEvent.emit(task);
  }


   confirmDelete(task: TasksModel) {
      this.selectedTask = task; 
      this.showModal = true; 
    }
  
    closeModal() {
      this.showModal = false; 
      this.selectedTask = null; 
    }
  
    deleteTask(task: TasksModel | null) {
      if (task) {
        console.log('Delete clicked for task:', task); // Add this log to debug
        this.deleteTaskEvent.emit(task);
      }
      this.closeModal();
    }
}
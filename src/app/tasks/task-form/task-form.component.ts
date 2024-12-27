import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TasksModel } from "../../models/task.model";
import { TaskService } from '../../services/task.service';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Input() taskToEdit: TasksModel | null = null;
  @Output() formSubmitted = new EventEmitter<void>();

  title = '';
  description = '';
  dueDate = '';
  priority: 'high' | 'medium' | 'low' = 'medium';
  status: 'completed' | 'in-progress' | 'not-started' = 'not-started';
  categoryId = 0;
  submitted = false;
  taskExists = false;

  titleMaxLength = 100;
  descriptionMaxLength = 500;
  dateErrorMessage = '';
  titleErrorMessage = '';
  descriptionErrorMessage = '';
  dueDateErrorMessage = '';
  priorityErrorMessage = '';
  statusErrorMessage = '';

  categories: { id: number; name: string }[] = []; 

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {

    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
    } else {
      this.categories = [
        { id: 1, name: 'Work' },
        { id: 2, name: 'Personal' },
        { id: 3, name: 'Study' }
      ];
    }


    if (this.taskToEdit) {
      this.title = this.taskToEdit.title || '';
      this.description = this.taskToEdit.description || '';
      this.dueDate = this.taskToEdit.dueDate || '';
      this.priority = this.taskToEdit.priority || 'medium';
      this.status = this.taskToEdit.status || 'not-started';
      this.categoryId = this.taskToEdit.categoryId || 0;
    }
  }

  onSubmit(): void {
    this.submitted = true;

    // Reset error messages
    this.titleErrorMessage = '';
    this.descriptionErrorMessage = '';
    this.dueDateErrorMessage = '';
    this.priorityErrorMessage = '';
    this.statusErrorMessage = '';

    // Validation
    let isValid = true;

    // Title validation
    if (this.title.trim().length === 0) {
      this.titleErrorMessage = 'Title is required';
      isValid = false;
    } else if (this.title.trim().length > this.titleMaxLength) {
      this.titleErrorMessage = `Title cannot exceed ${this.titleMaxLength} characters`;
      isValid = false;
    }

    // Description validation
    if (this.description.trim().length > this.descriptionMaxLength) {
      this.descriptionErrorMessage = `Description cannot exceed ${this.descriptionMaxLength} characters`;
      isValid = false;
    }

    if (!this.dueDate.trim()) {
      this.dueDateErrorMessage = 'Due date is required';
      isValid = false;
    }

    // Due date validation: Check if the due date is in the past
    if (this.dueDate && new Date(this.dueDate) < new Date()) {
      this.dueDateErrorMessage = "Due date can't be in the past!";
      isValid = false;
    }
    if (!this.priority) {
      this.priorityErrorMessage = 'Priority is required';
      isValid = false;
    }

    // Status validation
    if (!this.status) {
      this.statusErrorMessage = 'Status is required';
      isValid = false;
    }

    // If any validation failed, stop the form submission
    if (!isValid) {
      return;
    }

    // If editing an existing task, update it
    if (this.taskToEdit) {
      this.updateTask();
    } else {
      this.addTask();
    }

    // Reset the form and emit the formSubmitted event
    this.resetForm();
    this.formSubmitted.emit();
  }

  private updateTask(): void {
    const updatedTask: TasksModel = {
      ...this.taskToEdit!,
      title: this.title.trim(),
      description: this.description.trim(),
      dueDate: this.dueDate.trim(),
      priority: this.priority,
      status: this.status,
      categoryId: this.categoryId,
    };
    this.taskService.updateTask(updatedTask);
  }

  private addTask(): void {
    const newTask: TasksModel = {
      id: this.generateUniqueId(),
      title: this.title.trim(),
      description: this.description.trim(),
      dueDate: this.dueDate.trim(),
      priority: this.priority,
      status: this.status,
      categoryId: this.categoryId,
    };
    this.taskService.addTask(newTask);
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
    this.dueDate = '';
    this.priority = 'medium';
    this.status = 'not-started';
    this.categoryId = 0;
    this.submitted = false;
  }

  private generateUniqueId(): number {
    const tasks = this.taskService.getTasks();
    return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  }
}
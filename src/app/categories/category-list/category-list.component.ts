import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/category.model';
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Output() editCategoryEvent = new EventEmitter<Category>();
  @Output() deleteCategoryEvent = new EventEmitter<Category>();

  showModal: boolean = false; 
  selectedCategory: Category | null = null; 

  editCategory(category: Category) {
    this.editCategoryEvent.emit(category);
  }

  confirmDelete(category: Category) {
    this.selectedCategory = category; 
    this.showModal = true; 
  }

  closeModal() {
    this.showModal = false; 
    this.selectedCategory = null; 
  }

  deleteCategory(category: Category | null) {
    if (category) {
      console.log('Deleting category:', category.name); // Debug log
      this.deleteCategoryEvent.emit(category);
    }
    this.closeModal();
  }
  
}
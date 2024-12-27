import { Component } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoriesService } from '../services/category.service';
import {NgIf} from "@angular/common";
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    RouterModule,
    CategoryListComponent,
    CategoryFormComponent,
    NgIf,
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categories: Category[] = [];
  showFormPopup = false;
  categoryToEdit: Category | null = null;

  constructor(private readonly categoriesService: CategoriesService) {
    this.loadCategories();
  }

  loadCategories() {
    this.categories = this.categoriesService.getCategories();
  }

  addCategory() {
    this.categoryToEdit = null;
    this.showFormPopup = true;
  }

  editCategory(category: Category) {
    this.categoryToEdit = category;
    this.showFormPopup = true;
  }


  deleteCategory(category: Category) {
    if (confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
      this.categoriesService.deleteCategory(category.id);
      this.loadCategories();
    }
  }


  handleFormSubmitted() {
    this.loadCategories();
    this.showFormPopup = false;
  }
}
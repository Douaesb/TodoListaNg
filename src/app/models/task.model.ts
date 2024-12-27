import {Category} from "./categories.model";

export interface TasksModel {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "completed" | "in-progress" | "not-started";
  categoryId: number;
  category?: Category; 
}
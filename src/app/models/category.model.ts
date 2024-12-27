import {TasksModel} from "./task.model";

export interface Category {
  id: number;
  name: string;
  color?: string;
  tasks: TasksModel[];
}
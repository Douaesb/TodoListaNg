import { Pipe, PipeTransform } from '@angular/core';
import {TasksModel} from "../models/task.model";

@Pipe({
  name: 'taskSearch',
  standalone: true,
  pure: false
})
export class TaskSearchPipe  implements PipeTransform {

  transform(tasks: TasksModel[], searchText: string): TasksModel[] {
    if (!searchText) {
      return tasks;
    }
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchText.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchText.toLowerCase()))
    );
  }

}
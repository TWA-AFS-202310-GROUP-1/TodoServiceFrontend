import { Component } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {
  items: ToDoItem[] = [
    {
      id: 1,
      title: "buy milk",
      description: "buy some milk",
      isDone: false
    },
    {
      id: 2,
      title: "buy bread",
      description: "buy some bread",
      isDone: false
    }
  ]
}

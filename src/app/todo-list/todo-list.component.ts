import { Component } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  items: ToDoItem[] = [
    {
      id: 1,
    title: 'xianke',
    description: 'xianke2',
    isDone: false
    },
    {
      id: 12,
    title: 'xianke33',
    description: 'xianke332',
    isDone: false
    }
  ]
}

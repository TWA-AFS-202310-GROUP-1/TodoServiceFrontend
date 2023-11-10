import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToDoItem } from 'src/model/ToDoItem';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent {
  items: ToDoItem[] = [
    {
      id: 1,
      title: 'food',
      description: 'buy milk',
      isDone: false,
    },
    {
      id: 2,
      title: 'food',
      description: 'buy eggs',
      isDone: false,
    },
  ];
}

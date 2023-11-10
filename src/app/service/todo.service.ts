import { Injectable } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

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

  getAll() {
    return this.items;
  }

  create(title: string, description: string) {
    this.items.push({
      id: this.items.length + 1,
      title: title,
      description: description,
      isDone: false,
    });
  }

  markDone(index: number) {
    const item = this.items.find((x) => x.id == index);
    if (item) {
      item.isDone = true;
    }
  }
}

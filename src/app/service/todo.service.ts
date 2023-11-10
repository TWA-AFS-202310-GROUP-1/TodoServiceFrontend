import { Injectable } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
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
  constructor() { }

  getAll(){
    return this.items
  }
}

import { Injectable } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  items: ToDoItem[] = [
    {
      id: 1,
      title: 'buy milk',
      description: 'shop',
      isDone: false,
    },
    {
      id: 2,
      title: 'buy bread',
      description: 'market',
      isDone: false,
    }
  ]

  constructor() { }

  getAll(){
    return this.items;
  }

  create(title: string, description: string){
    this.items.push({
      id: this.items.length + 1,
      title: title,
      description: description,
      isDone: false
    })
  }

  markDone(id: number){
    const curItem = this.items.find(item => item.id = id)
    if(curItem){
      curItem.isDone = true
    }
  }

}

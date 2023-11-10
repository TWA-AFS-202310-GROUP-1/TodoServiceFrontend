import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TodohttpService {

  constructor(private httpClient: HttpClient) { }

  getAll()
  {
    return this.httpClient.get<ToDoItem[]>('https://localhost:44309/ToDoItem')
  }

  create(title: string, description: string)
  {
    return this.httpClient.post('https://localhost:44309/ToDoItem', {
      title: title,
      description: description,
      isDone: false
    })
  }

  markDone(item:ToDoItem) {
    return this.httpClient.put('https://localhost:44309/ToDoItem', {
      id: item.id,
      title: item.title,
      description: item.description,
      isDone: item.isDone
    })
  }
}


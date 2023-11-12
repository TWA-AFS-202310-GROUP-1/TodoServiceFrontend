import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoHTTPService {

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<ToDoItem[]>('https://localhost:5001/ToDoItem')
  }

  create(title: string, description:string){
    return this.httpClient.post('https://localhost:5001/ToDoItem',{
      title: title,
      description: description,
      isDone: false
    })
  }

  update(id: number, item: ToDoItem) {
    return this.httpClient.put<ToDoItem>(
      'https://localhost:5001/ToDoItem/' + id, item
    );
  }
}

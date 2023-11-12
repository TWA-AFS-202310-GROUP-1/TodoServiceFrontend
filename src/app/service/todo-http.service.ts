import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoHTTPService {

  constructor(private httpClient: HttpClient) { }
  url = 'https://localhost:5001/ToDoItem/';

  getAll(){
    return this.httpClient.get<ToDoItem[]>(this.url)
  }

  create(title: string, description:string){
    return this.httpClient.post<ToDoItem>(this.url,{
      title: title,
      description: description,
      isDone: false
    })
  }

  update(id: number, item: ToDoItem) {
    return this.httpClient.put<ToDoItem>(
      `${this.url}+${id}`, item
    );
  }

  getItemById(id: number) {
    return this.httpClient.get<ToDoItem>(`${this.url}+${id}`
    );
  }

  delete(id: number) {
    return this.httpClient.delete<ToDoItem>(
      `${this.url}+${id}`
    );
  }

  
}

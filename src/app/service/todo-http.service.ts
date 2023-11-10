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
}

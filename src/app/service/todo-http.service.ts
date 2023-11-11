import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { ToDoItem } from 'src/model/ToDoItem';

@Injectable({
  providedIn: 'root',
})
export class TodoHttpService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<ToDoItem[]>('https://localhost:44309/ToDoItem');
  }

  create(title: string, description: string) {
    return this.httpClient.post('https://localhost:44309/ToDoItem', {
      title: title,
      description: description,
      isDone: false,
    });
  }

  update(id: number,updatedValues: { title?: string, description?: string, isDone?: boolean }) {
    return this.getById(id).pipe(
      switchMap((toDoItem)=>{
      return this.httpClient.put('https://localhost:44309/ToDoItem/' + id, {
          id: id,
          title: updatedValues.title !== undefined ? updatedValues.title : toDoItem.title,
          description: updatedValues.description !== undefined ? updatedValues.description : toDoItem.description,
          isDone: updatedValues.isDone !== undefined ? updatedValues.isDone : toDoItem.isDone,
        });
    })
    )
  }

  getById(id: number) {
    return this.httpClient.get<ToDoItem>(
      'https://localhost:44309/ToDoItem/' + id
    );
  }
}

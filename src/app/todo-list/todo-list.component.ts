import { Component } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';
import { TodoService } from '../service/todo.service';
import { Router } from '@angular/router';
import { TodoHTTPService } from '../service/todo-http.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  items: ToDoItem[] = []

  constructor(
    private router: Router,
    private todoHTTPService: TodoHTTPService
  ){}

  ngOnInit(){
    this.refreshList()
  }
  refreshList() {
    this.todoHTTPService
      .getAll()
      .subscribe((todoItems) => (this.items = todoItems));
  }

  onMarkDone(id: number, item:ToDoItem){
    item.isDone = true
    this.todoHTTPService.update(id, item).subscribe()    
  }
  onGoToDetail(id: number){
    this.router.navigateByUrl(`/detail/${id}`)
  }
  onDelete(id: number) {
    this.todoHTTPService.delete(id).subscribe(() => {
      this.refreshList();
    });
  }
}

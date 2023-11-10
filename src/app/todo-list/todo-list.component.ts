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
    private todoService: TodoService,
    private router: Router,
    private todoHTTPService: TodoHTTPService
  ){}

  ngOnInit(){
    //this.items = this.todoService.getAll()
    this.todoHTTPService.getAll().subscribe(todoItems=>
      {
      this.items = todoItems
    })
  }

  onMarkDone(id: number){
    this.todoService.markDone(id)
  }

  onGoToDetail(id: number){
    this.router.navigateByUrl(`/detail/${id}`)
  }
}

import { Component, OnInit } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';
import { TodoService } from '../service/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  items: ToDoItem[] = []

  constructor(private todoServie: TodoService, private router: Router){}

  ngOnInit(){
    this.items = this.todoServie.getAll()
  }

  onMarkDone(id: number){
    this.todoServie.markDone(id)
  }

  onGoToDetail(id: number){
    this.router.navigateByUrl(`/detail/${id}`)
  }
}

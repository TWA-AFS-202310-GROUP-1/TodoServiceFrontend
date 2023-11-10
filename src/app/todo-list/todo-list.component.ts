import { Component } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';
import { TodoService } from '../service/todo.service';
import { Router } from '@angular/router';
import { TodohttpService } from '../service/todohttp.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  items: ToDoItem[] = []
  
  constructor(private todoService : TodoService, 
    private router:Router,
    private todoHttpService: TodohttpService) {
    
  }

  ngOnInit() {
    // this.items = this.todoService.getAll()
    this.todoHttpService.getAll().subscribe(todoItems =>{
      this.items = todoItems
    })

  }
  onMarkDone(id: number){
    this.todoService.markDone(id)
  }
  onGotoDetail(id: number){
    this.router.navigateByUrl(`/detail/${id}`)
  }
}

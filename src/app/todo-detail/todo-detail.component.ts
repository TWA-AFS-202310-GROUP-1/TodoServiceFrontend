import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDoItem } from 'src/model/ToDoItem';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent {
  constructor(private activatedRoute: ActivatedRoute,
    private todoService: TodoService){}

  item: ToDoItem | undefined

  ngOnInit(){
    const id = this.activatedRoute.snapshot.paramMap.get('detailId')
    this.item = this.todoService.getItemById(Number(id))
  }
}

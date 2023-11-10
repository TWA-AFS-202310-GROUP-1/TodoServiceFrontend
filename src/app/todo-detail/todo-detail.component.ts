import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../service/todo.service';
import { ToDoItem } from 'src/model/ToDoItem';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent {
  item: ToDoItem | undefined

  constructor(private activatedRoute: ActivatedRoute, private todoService: TodoService){}
  
  ngOnInit(){
    const id = this.activatedRoute.snapshot.paramMap.get('detailId')
    this.item = this.todoService.getItemById(Number(id))
  }

}

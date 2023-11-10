import { Component } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';
import { TodoService } from '../service/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent {
  items: ToDoItem[] = [];

  constructor(private todoService: TodoService,
    private router: Router){}
  
  ngOnInit(){
    this.items = this.todoService.getAll()
  }

  onMarkDone(id: number){
    this.todoService.markDone(id)
  }

  onGotoDetail(id: number){
    this.router.navigateByUrl(`/detail/${id}`)
  }
}

import { Component } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';
import { Router } from '@angular/router';
import { TodohttpService } from '../service/todohttp.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  items: ToDoItem[] = [];

  constructor(
    private router: Router,
    private todoHttpService: TodohttpService
  ) {}

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.todoHttpService.getAll().subscribe((todoItems) => {
      this.items = todoItems;
    });
  }
  onMarkDone(item: ToDoItem) {
    this.todoHttpService.markDone(item).subscribe(()=>{
      this.refreshList();
    });
  }
  onGotoDetail(id: number) {
    this.router.navigateByUrl(`/detail/${id}`);
  }
  onDelete(id: number) {
    this.todoHttpService.delete(id).subscribe(() => {
      this.refreshList();
    });
  }
}

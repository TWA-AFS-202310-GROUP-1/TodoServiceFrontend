import { Component, EventEmitter, Output } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';
import { Router } from '@angular/router';
import { TodoHttpService } from '../service/todo-http.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  items: ToDoItem[] = [];
  constructor(
    private router: Router,
    private todoHttpService: TodoHttpService
  ) {}

  ngOnInit() {
    this.refreshList();
  }

  OnMarkDone(id: number) {
    this.todoHttpService.update(id, { isDone: true }).subscribe(() => {
      this.refreshList();
    });
  }

  refreshList() {
    this.todoHttpService.getAll().subscribe((todoItems) => {
      this.items = todoItems;
    });
  }

  onGoToDetail(id: number) {
    this.router.navigateByUrl(`/detail/${id}`);
  }

  onDelete(id: number) {
    this.todoHttpService.delete(id).subscribe(() => {
      this.refreshList();
    });
  }
}

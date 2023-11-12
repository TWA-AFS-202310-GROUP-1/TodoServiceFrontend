import {  Component } from '@angular/core';
import { ToDoItem } from 'src/model/ToDoItem';
import { Router } from '@angular/router';
import { TodoHttpService } from '../service/todo-http.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent {
  items: ToDoItem[] = [];

  constructor(
    private todoHttpService: TodoHttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.todoHttpService
      .getAll()
      .subscribe((todoItems) => (this.items = todoItems));
  }

  onMarkDone(id: number, item: ToDoItem) {
    console.log('-------------------' + item.id);
    item.isDone = true;
    this.todoHttpService.update(id, item).subscribe(() => {
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

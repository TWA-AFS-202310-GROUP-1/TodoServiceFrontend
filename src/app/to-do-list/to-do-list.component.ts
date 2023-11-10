import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToDoItem } from 'src/model/ToDoItem';
import { TodoService } from '../service/todo.service';
import { Router } from '@angular/router';
import { TodohttpService } from '../service/todohttp.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent {
  items: ToDoItem[] = [];

  constructor(
    private todoService: TodoService,
    private router: Router,
    private todoHttpService: TodohttpService
  ) {}
  ngOnInit() {
    this.todoHttpService.getAll().subscribe((todoItems) => {
      this.items = todoItems;
    });
  }

  onMarkDone(index: number) {
    this.todoHttpService.markDone(this.items[index]).subscribe(() => {
      this.refreshList();
    });
  }

  onGoToDetail(id: number) {
    this.router.navigateByUrl(`/detail/${id}`);
  }

  refreshList() {
    this.todoHttpService.getAll().subscribe((todoItems) => {
      this.items = todoItems;
    });
  }
}

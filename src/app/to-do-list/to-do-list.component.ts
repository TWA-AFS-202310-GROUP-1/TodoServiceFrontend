import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToDoItem } from 'src/model/ToDoItem';
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
    private router: Router,
    private todoHttpService: TodohttpService
  ) {}

  refreshList() {
    this.todoHttpService.getAll().subscribe((todoItems) => {
      this.items = todoItems;
    });
  }

  ngOnInit() {
    this.refreshList();
  }

  onMarkDone(item: ToDoItem) {
    this.todoHttpService.markDone(item).subscribe(() => {
      this.refreshList();
    });
  }

  onGoToDetail(id: number) {
    this.router.navigateByUrl(`/detail/${id}`);
  }

  onDelete(id: number) {
    this.todoHttpService.deleteItemById(id).subscribe(() => {
      this.refreshList();
    });
  }
}

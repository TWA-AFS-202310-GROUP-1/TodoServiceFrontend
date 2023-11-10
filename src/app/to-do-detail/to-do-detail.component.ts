import { Component } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { ActivatedRoute } from '@angular/router';
import { ToDoItem } from 'src/model/ToDoItem';

@Component({
  selector: 'app-to-do-detail',
  templateUrl: './to-do-detail.component.html',
  styleUrls: ['./to-do-detail.component.css'],
})
export class ToDoDetailComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService
  ) {}

  item: ToDoItem | undefined;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('detailId');
    console.log(id);

    this.item = this.todoService.getItemById(Number(id));
  }
}

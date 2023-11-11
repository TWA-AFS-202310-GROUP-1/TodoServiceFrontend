import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDoItem } from 'src/model/ToDoItem';
import { TodoService } from '../service/todo.service';
import { TodoHttpService } from '../service/todo-http.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent {
  item: ToDoItem | undefined;
  isShow = false;
  constructor(
    private activatedRouter: ActivatedRoute,
    // private todoService: TodoService,
    private todoHttpService: TodoHttpService,
    private formBuilder: FormBuilder
  ) {}

  todoChangeForm = this.formBuilder.group({
    title: '',
    description: '',
  });

  ngOnInit() {
    this.refreshDetail();
  }

  refreshDetail() {
    const id = this.activatedRouter.snapshot.paramMap.get('detailId');
    console.log(id);
    this.todoHttpService.getById(Number(id)).subscribe((todoItem) => {
      this.item = todoItem;
    });
  }
  showTable() {
    this.isShow = true;
  }

  onSumbit() {
    const formValues = this.todoChangeForm.value;
    const id = this.activatedRouter.snapshot.paramMap.get('detailId');
    if (formValues.title && formValues.description) {
      this.todoHttpService
        .update(Number(id), {
          title: formValues.title,
          description: formValues.description,
        })
        .subscribe(() => {
          this.todoChangeForm.reset();
          this.refreshDetail();
        });
    }
  }
}

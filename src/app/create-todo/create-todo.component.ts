import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { TodohttpService } from '../service/todohttp.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css'],
})
export class CreateTodoComponent {
  @Output() created = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private todoHttpService: TodohttpService
  ) {}

  todoForm = this.formBuilder.group({
    title: '',
    description: '',
  });

  onSubmit() {
    const formValues = this.todoForm.value;
    if (formValues.title && formValues.description) {
      this.todoHttpService
        .create(formValues.title, formValues.description)
        .subscribe(() => {
          this.todoForm.reset();
          this.created.emit();
        });
    }
    console.log(formValues);
  }
}

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-create-to-do',
  templateUrl: './create-to-do.component.html',
  styleUrls: ['./create-to-do.component.css'],
})
export class CreateToDoComponent {
  constructor(private formBuilder: FormBuilder,
    private todoService: TodoService) {}

  todoForm = this.formBuilder.group({
    title: '',
    description: '',
  });

  onSubmit() {
    const formValues = this.todoForm.value;
    if (formValues.title && formValues.description){
      this.todoService.create(formValues.title, formValues.description)
    }
    this.todoForm.reset()
  }
}

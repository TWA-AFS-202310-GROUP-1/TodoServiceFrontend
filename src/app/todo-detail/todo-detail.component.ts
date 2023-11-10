import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../service/todo.service';
import { ToDoItem } from 'src/model/ToDoItem';
import { TodoHttpService } from '../service/todo-http.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent {
  item: ToDoItem | undefined

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private todoHttpService: TodoHttpService){}
  
  todoDetailForm = this.formBuilder.group({
    title: '',
    description: '',
  })

  ngOnInit(){
    const id = this.activatedRoute.snapshot.paramMap.get('detailId')
    this.todoHttpService.getItemById(Number(id)).subscribe(data => {
      this.item = data
      this.todoDetailForm.setValue(
        {
          title: this.item.title, 
          description: this.item.description
        })
    })
  }

  onUpdate(){
    const formValues = this.todoDetailForm.value
    if(formValues.title && formValues.description && this.item){
      this.todoHttpService.update({id: this.item.id, title: formValues.title, description: formValues.description, isDone: this.item.isDone})
      .subscribe()
    }
  }

}

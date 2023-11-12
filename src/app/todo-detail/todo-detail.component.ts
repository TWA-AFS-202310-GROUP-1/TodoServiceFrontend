import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoItem } from 'src/model/ToDoItem';
import { TodoService } from '../service/todo.service';
import { FormBuilder } from '@angular/forms';
import { TodohttpService } from '../service/todohttp.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent {
  item: ToDoItem | undefined;
  todoForm = this.formBuilder.group({
    title: '',
    description: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private todoHttpService: TodohttpService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activateRouter.snapshot.paramMap.get('detailId');
    console.log(id);
    this.todoHttpService.getItemById(Number(id)).subscribe(item =>{
      this.item = item;
    });
    this.todoForm = this.formBuilder.group({
      title: [this.item ? this.item.title : ''],
      description: [this.item ? this.item.description : ''],
    });
  }

  onUpdate() {
    const formValues = this.todoForm.value;
    if (this.item) {
      if (formValues.title) {
        this.item.title = formValues.title;
      }
      if (formValues.description) {
        this.item.description = formValues.description;
      }

      this.todoHttpService.update(this.item).subscribe(() => {
        this.router.navigateByUrl(`/detail/${this.item?.id}`);
      });
    }
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoItem } from 'src/model/ToDoItem';
import { TodohttpService } from '../service/todohttp.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-to-do-detail',
  templateUrl: './to-do-detail.component.html',
  styleUrls: ['./to-do-detail.component.css'],
})
export class ToDoDetailComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private todoHttpService: TodohttpService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  item: ToDoItem | undefined;

  todoForm: FormGroup = this.formBuilder.group({})


  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('detailId');
    console.log(id);

    this.todoHttpService.getItemById(Number(id)).subscribe((item) => {
      this.item = item;

      this.todoForm = this.formBuilder.group({
        title: item.title,
        description: item.description,
      });

    });
  }

  onSubmit() {
    const formValues = this.todoForm.value;
    if(this.item){
      if (formValues.title && formValues.description) {
        this.todoHttpService
          .update({
            id:this.item.id,
            title:formValues.title,
            description:formValues.description,
            isDone:this.item.isDone})
          .subscribe(() => {
            this.todoForm.reset();
            this.router.navigateByUrl("");
          });
      }
    }
    console.log(formValues);
  }
}

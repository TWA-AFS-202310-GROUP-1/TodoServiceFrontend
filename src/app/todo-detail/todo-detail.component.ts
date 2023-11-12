import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../service/todo.service';
import { ToDoItem } from 'src/model/ToDoItem';
import { TodoHTTPService } from '../service/todo-http.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent {
  item: ToDoItem | undefined;
  itemTitle: string = '';
  itemDescription: string = '';
  itemId: string | null = '';
  constructor(
    private activatedRoute:ActivatedRoute,
    private todoHTTPservice: TodoHTTPService
    ){}
    ngOnInit() {
      this.itemId = this.activatedRoute.snapshot.paramMap.get('detailId');
      this.todoHTTPservice.getItemById(Number(this.itemId)).subscribe((i) => {
        (this.item = i),
          (this.itemDescription = i.description),
          (this.itemTitle = i.title);
      });
    }

    onSave(){
      if (this.item){
        this.item.description = this.itemDescription
        this.item.title = this.itemTitle
        this.todoHTTPservice.update(Number(this.itemId), this.item).subscribe()
      }
    }
}

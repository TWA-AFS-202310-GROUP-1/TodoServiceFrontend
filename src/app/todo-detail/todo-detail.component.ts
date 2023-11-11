import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDoItem } from 'src/model/ToDoItem';
import { TodoService } from '../service/todo.service';
import { TodoHttpService } from '../service/todo-http.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent {
  constructor(private activatedRoute: ActivatedRoute,
    private todoService: TodoService,
    private todoHttpservice: TodoHttpService){}

  item: ToDoItem | undefined
  itemTitle : string = ''
  itemDescription : string = ''
  itemId : string | null = ''


  ngOnInit(){
    this.itemId = this.activatedRoute.snapshot.paramMap.get('detailId')
    this.todoHttpservice.getItemById(Number(this.itemId)).subscribe(i => {this.item = i,
      this.itemDescription = i.description,
      this.itemTitle = i.title
    })
  }

  onSave(){
    if (this.item){
      this.item.description = this.itemDescription
      this.item.title = this.itemTitle
      this.todoHttpservice.update(Number(this.itemId), this.item).subscribe()
    }
   
  }
}

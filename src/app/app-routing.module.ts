import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';

const routes: Routes = [
  { path: '', component: ToDoListComponent },
  { path: 'detail/:detailId', component: TodoDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

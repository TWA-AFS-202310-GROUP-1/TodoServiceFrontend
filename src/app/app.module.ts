import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { CreateToDoComponent } from './create-to-do/create-to-do.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    CreateToDoComponent,
    TodoDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
//requires forms module for adding a new todo
import { FormsModule } from '@angular/forms';
//requires http for api calls
import { HttpClientModule } from '@angular/common/http';
//components and methods
import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoItemService } from './shared/todo-items.service';
import { EditComponent } from './edit/edit.component';

@NgModule({ 
  declarations: [
    AppComponent,
    TodosComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TodoItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
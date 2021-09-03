import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//requires forms module for adding a new todo
import { FormsModule } from '@angular/forms';
//requires http for api calls
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';

@NgModule({ 
  //where all components are declared for use in the app
  declarations: [
    AppComponent,
    TodosComponent
  ],
  //where all imported modules are loaded for use in the app
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

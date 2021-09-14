import { TodoItems } from './todo-items.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IfStmt } from '@angular/compiler';

//Front end CRUD methods
@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  formData: TodoItems = new TodoItems();
  readonly baseURL = 'http://localhost:4200/api';
  readonly APIUrl = 'http://localhost:5000/api';
  list: any;
  
  constructor(private http: HttpClient) { }

  getTodoList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/todoitems');
  }

  addTodo(val: any) {
    return this.http.post(this.APIUrl + '/todoitems', val);
  }

  updateTodo(name: string, val: any) {
    return this.http.put(this.APIUrl + '/todoitems/' + name, val);
  }

  deleteTodo(name: any) {
    return this.http.delete(this.APIUrl + `/todoitems/${name}`);
  }

  //Populates existing records into list property.
  refreshList() {
    return this.http.get(this.APIUrl + '/todoitems');
  }

  //Random api call (this one is not using async/await)
  apiCall() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}
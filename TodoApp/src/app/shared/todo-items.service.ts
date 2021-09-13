import { TodoItems } from './todo-items.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IfStmt } from '@angular/compiler';

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
    return this.http.post<any>(this.APIUrl + '/todoitems', val);
  }

  updateTodo(val: any) {
    return this.http.put<any>(this.APIUrl + '/todoitems', val);
  }

  deleteTodo(val: any) {
    return this.http.delete<any>(this.APIUrl + '/todoitems' + val);
  }

  postTodoItems() {
    console.log("posting: ", this.baseURL, this.formData)
    return this.http.post(this.baseURL, this.formData);
  }
  putTodoItems() {
    return this.http.put(`${this.baseURL}/${this.formData.Id}`, this.formData);
  }
  deleteTodoItems(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  //populates existing records into list property.
  refreshList() {
    return this.http.get(this.APIUrl + '/todoitems');
  }

  //specific api call (this one is not using async/await)
  apiCall() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}
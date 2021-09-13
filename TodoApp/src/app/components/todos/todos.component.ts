import { Component, OnInit } from '@angular/core';
import { TodoItems } from '../../shared/todo-items.model';
import { TodoItemService } from '../../shared/todo-items.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  //component props to pass 
  title = "todo-items";
  id = "todo-list";

  //imports todo class as a Type
  todos: TodoItems[] = [];
  randomData: any = {};
  inputTodo: string = "";
  inputTodoSecret: string = "";

  constructor(private api: TodoItemService, private randomApi: TodoItemService) {  }

  //on component mount
  ngOnInit(): void {
    this.api.refreshList().subscribe((data: any) =>  {
      this.todos = data;
    });
    this.randomApi.apiCall().subscribe((data: any) => {
      this.randomData = data;
    });
  }

  // Toggles a todo to the completed state
  toggleDone(id: number) {
    this.todos.map((value, i) => {
      //validate id of todo item
      if (i === id) {
        value.isComplete = "true";
      }
    });
  }

  // Deletes an item from the list
  deleteTodo(id: number) {
    this.todos = this.todos.filter((value, i) => i !== id);
  }

  // Deletes all todos from list
  deleteAll() {
    this.todos = [];
  }

  // Pushes a new todo to the list, clears form
  addTodo() {
    if (this.inputTodo === "") {
      return null;
    } else {

      this.todos.push({
        Id: NaN, //Id is indexed by SqlClient table
        TodoName: this.inputTodo,
        isComplete: "false",
        TodoSecret: this.inputTodoSecret
      });

      //clear input after submit
      this.inputTodo = "";
      return "pushed to list";
    }
  }

  // Populates todos with random stuff from random API
  populateList() {
    this.deleteAll();
    for (let i = 0; i < 3; i++) {
      let random = this.randomInt();

      this.todos.push({
        Id: NaN, //Id is indexed by SqlClient table
        TodoName: this.randomData[this.randomInt()].title,
        isComplete: "false",
        TodoSecret: ""
      });
      
    }
  }

  randomInt() {
    return Math.floor(Math.random() * 100);
  }
}

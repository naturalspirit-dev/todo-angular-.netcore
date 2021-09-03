import { Component, OnInit } from '@angular/core';
import { Todo } from './../../models/todo';
import { GetApiService } from 'src/app/get-api.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  //component props to pass 
  title = "todos";
  id = "todo-list";

  //imports todo class as a Type
  todos: Todo[];
  data: any;

  inputTodo: string = "";

  constructor(private api:GetApiService) { 
    this.todos = [];
    this.data = {};
  }

  //on component mount
  ngOnInit(): void {
    this.api.apiCall().subscribe((data) => {
      this.data = data;
    });
    this.todos = [
      {
        content: 'First todo',
        completed: false
      },
      {
        content: 'Second todo',
        completed: false 
      }
    ]
  }

  // Toggles a todo to the completed state
  toggleDone(id: number) {
    this.todos.map((value, i) => {
      //validate id of todo item
      if (i === id) {
        value.completed = !value.completed;
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
        content: this.inputTodo,
        completed: false
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
      console.log("inserting: ", this.data[this.randomInt()].title)
      let random = this.randomInt();
      console.log("\n random int: ", random)
      console.log("\n i: ", i)

      this.todos.push({
        content: this.data[this.randomInt()].title,
        completed: false
      });
      
    }
  }

  randomInt() {
    return Math.floor(Math.random() * 100);
  }
}

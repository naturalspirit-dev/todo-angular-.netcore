import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoItems } from '../shared/todo-items.model';
import { TodoItemService } from '../shared/todo-items.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  //Recieve props with @Input()
  @Input() display = false; 
  @Input() todoName = false; 
  @Input() todos: TodoItems[] = [];
  //Pass back props with @Output()
  @Output() hideSubmit = new EventEmitter<boolean>();
  //One-way bound
  inputTodo: string = "";
  todoSecret: string = "";
  secret: boolean = false;
  todo: any;

  constructor(private api: TodoItemService) { }

  ngOnInit(): void { }

  //Call put request and edit a todo item
  editTodo(oldName: any, secret: any) {
    this.hideSubmit.emit(!this.hideSubmit);
    if (this.inputTodo !== "") {
      let todo = { "TodoName": this.inputTodo, "TodoSecret": secret };
      this.api.updateTodo(oldName, todo).subscribe((data: any) => {
        this.todos.map((item) => {
          if (item.TodoName === oldName) {
            item.TodoName = this.inputTodo;
          }
        });
      });
    } else {
      alert("Please provide a todo value");
    }
  }

  //Delete perminately
  deleteFromDB(oldName: any) {
    this.api.deleteTodo(oldName).subscribe((data: any) => { });
    this.todos = this.todos.filter((value) => value.TodoName !== oldName);
    this.hideSubmit.emit(!this.hideSubmit);
    alert("Todo has been deleted from the database");
  }
  
  toggleSecret() {
    this.secret = !this.secret;
  }
}

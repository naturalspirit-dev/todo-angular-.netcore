import { Component, OnInit, Input } from '@angular/core';
import { TodoItemService } from '../shared/todo-items.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() display = false; // decorate the property with @Input()
  @Input() todoName = false; // decorate the property with @Input()
  inputTodo: string = "";
  todoSecret: string = "";
  secret: boolean = false;
  todo: any;


  constructor(private api: TodoItemService) { }

  ngOnInit(): void { }

  editTodo(oldName: any, secret: any) {
    console.log(oldName)
    console.log(this.inputTodo)
    console.log(secret)
    if (this.inputTodo !== "") {
      let todo = { "TodoName": this.inputTodo, "TodoSecret": secret };
      this.api.updateTodo(oldName, todo).subscribe((data: any) => {
        alert(data.toString());
      });
    } else {
      alert("Please provide a todo value");
    }
  }

  toggleSecret() {
    this.secret = !this.secret;
  }

}

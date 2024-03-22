import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoListService } from './todo-list.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{
 

  todos$!: Observable<Todo[]>;

  constructor(
    private todoListService: TodoListService,
    private nzMessageService: NzMessageService
  ) {}


  ngOnInit(): void {
    this.todos$ = this.todoListService.findAll();
  }
  
  changeStatus(todo: Todo) {
    console.log("TODO ITEM: " + todo)
    this.todoListService.update(todo)
    .subscribe((result) => {
      this.todos$ = this.todoListService.findAll();
      console.log("DISZ TODOS: " + this.todos$)
    });
    this.nzMessageService.info('Changed Status');
  }

  deleteTodo(todo: Todo) {
    this.todoListService.delete(todo.id).subscribe(
      ()=> {
        this.todos$ = this.todoListService.findAll();
      }
    );
    this.nzMessageService.warning('Todo deleted with id: ' + todo.id)
  }

  cancel(): void {
    this.nzMessageService.info('Click cancelled');
  }

}

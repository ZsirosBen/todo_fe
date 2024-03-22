import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

@Injectable ({  
  providedIn: 'root'  
})  
export class TodoListService {

  private resourceUrl = 'http://localhost:8080/todos';

  constructor(private http: HttpClient) { }

  create(todo: Todo) {
    const copy = this.convert(todo);
    return this.http.post<Todo>(this.resourceUrl, todo)
  }

  update(todo: Todo) {
    const copy = this.convert(todo);
    return this.http.put<Todo>(`${this.resourceUrl}/${todo.id}`, copy)
  }

  find(id: number): Observable<Todo>  {
    return this.http.get<Todo>(`${this.resourceUrl}/${id}`);
  }

  findAll(): Observable<Todo[]>  {
    return this.http.get<Todo[]>(this.resourceUrl);
  }


  delete(id: number | undefined): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }


  private convert(todo: Todo): Todo {
    const copy: Todo = Object.assign({}, todo);
    return copy;
  }
}

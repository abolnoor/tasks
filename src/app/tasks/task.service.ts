import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from './task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`/api/tasks`);
  }

  getTask(id: number | string): Observable<Task> {
    console.log('id', id);
    return this.http.get<Task>(`/api/tasks/${id}`);
  }

  /* getTask(id: number | string) {
    return this.getTasks().pipe(
      map((tasks: Task[]) => tasks.find(task => task.id === +id))
    );
  } */
}

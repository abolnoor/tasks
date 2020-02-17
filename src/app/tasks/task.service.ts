import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from './task';
import { TasksData } from './tasks-data';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  allData = TasksData;
  constructor(private http: HttpClient) { }

  getData() {
    return this.allData;
  }
  addData(data) {
    this.allData.push(data);
  }
  genID() {
    return this.allData.length ?  Math.max(...this.allData.map(x => x.id)) + 1 : 1;
  }

  getTasks(): Observable<any[]> {
    return this.http.get<Task[]>(`/api/tasks`);
  }

  getTask(id: number | string): Observable<any> {
    console.log('id', id);
    return this.http.get<Task>(`/api/tasks/${id}`);
  }

  createTask(data): Observable<any> {
    console.log(data);
    return this.http.post<Task>(`/api/tasks`, data, httpOptions);
  }

  /* getTask(id: number | string) {
    return this.getTasks().pipe(
      map((tasks: Task[]) => tasks.find(task => task.id === +id))
    );
  } */
}

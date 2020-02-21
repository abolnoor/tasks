import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, find, tap, filter } from 'rxjs/operators';
import { Task } from './task';
import { TasksData } from './tasks-data';
import { CategoriesData } from './categories-data';
import { Category } from './category';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private allCategories = of(CategoriesData);
  private allTasks = of(TasksData);

  constructor(private http: HttpClient) {
    // this.initTasksData();
  }

  private initTasksData() {
    this.allCategories.subscribe(cats => {
      this.allTasks.pipe(map(tasks => {
        return tasks.map(task => {
          task.categories = task.categories.map(catid => {
            return cats.find(cat => catid === cat.id);
          });
          return task;
        });
      }));
    });
  }

  getTasksData() {
    return this.allTasks;
  }
  findTaskData(id: number | string) {
    let t: Task;
    this.allTasks.pipe(
      map(tasks => {
        t = tasks.find(task => id === task.id);
      })
    );
    return t;
  }
  getCategoriesData() {
    return this.allCategories;
  }
  addTaskData(data) {
    console.log('addTaskData', data);
    this.allCategories.subscribe(cats => {
      this.allTasks.pipe(map(tasks => {
        // data.id = tasks.length > 0 ? Math.max(...tasks.map(x => x.id)) + 1 : 1;
        data.categories = data.categories.map((cid: number) => {
          return cats.find(cat => cid === cat.id);
        });
        tasks.push(data);
        return tasks;
      }));
    });
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`/api/tasks`);
  }

  getTask(id: number | string): Observable<any> {
    console.log('id', id);
    return this.http.get<any>(`/api/tasks/${id}`);
  }

  createTask(data): Observable<any> {
    console.log(data);
    return this.http.post<Task>(`/api/tasks`, data, httpOptions);
  }

}

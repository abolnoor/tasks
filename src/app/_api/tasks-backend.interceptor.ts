import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TasksData } from '../tasks/tasks-data';
import { map } from 'rxjs/operators';
import { Task } from '../tasks/task';

@Injectable()
export class TasksBackendInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("bbbbb", request);

    switch (true) {
      case request.url.endsWith('/api/tasks') && request.method === 'GET':
        return of(new HttpResponse(
          { status: 200, body: TasksData }
        ));
        break;
      case request.url.match(/\/api\/tasks\/\d+$/) && request.method === 'GET':
        const id = request.url.match(/\/api\/tasks\/(\d+)$/)[1];
        return of(new HttpResponse(
          { status: 200, body: TasksData.find(task => task.id === +id)
           }
        ));

        break;
      default:
        return next.handle(request);
        break;
    }
  }
}

export const TasksBackendInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TasksBackendInterceptor, multi: true },
];

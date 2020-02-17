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
import { TaskService } from '../tasks/task.service';

// const tData = TasksData;
@Injectable()
export class TasksBackendInterceptor implements HttpInterceptor {
  constructor(private tserv: TaskService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('bbbbb', request);

    switch (true) {
      case request.url.endsWith('/api/tasks') && request.method === 'GET':
        return of(new HttpResponse(
          { status: 200, body: this.tserv.getData() }
        ));
        break;
      case request.url.endsWith('/api/tasks') && request.method === 'POST':
        const newBody = request.body;
        newBody.created = new Date().toDateString();
        newBody.id = this.tserv.genID();
        // const newReq = request.clone({ body: newBody });
        this.tserv.addData(newBody);
        return of(new HttpResponse(
          { status: 200, body: newBody }
        ));
        // return next.handle(newReq);

        break;
      case request.url.match(/\/api\/tasks\/\d+$/) && request.method === 'GET':
        const id = request.url.match(/\/api\/tasks\/(\d+)$/)[1];
        return of(new HttpResponse(
          {
            status: 200, body: this.tserv.getData().find(task => task.id === +id)
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

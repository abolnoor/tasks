import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpResponse,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TasksData } from '../tasks/tasks-data';
import { map, mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';
import { Task } from '../tasks/task';
import { TaskService } from '../tasks/task.service';

let tasks = [];
let categories = [];
@Injectable()
export class TasksBackendInterceptor implements HttpInterceptor {

  constructor(private tserv: TaskService, private http: HttpClient) {

    this.tserv.getCategoriesData().subscribe(cats => {
      categories = cats;
      this.tserv.getTasksData().subscribe(ts => {
        tasks = ts.map(t => {
          t.categories = t.categories.map(catid => {
            return categories.find(cat => catid === cat.id);
          });
          return t;
        });
      });
      console.log(tasks, categories);
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    const backend = this;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'key=AIzaSyAV1gNpPdFNDNAspezc4EupV2rW2_b7kjs'
      })
    };
    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/api/tasks') && method === 'POST':
          return create();
        case url.endsWith('/api/tasks') && method === 'GET':
          return list();
        case url.match(/\/api\/tasks\/\d+$/) && method === 'GET':
          return view();
        default:
          return next.handle(request);
      }
    }

    function create() {
      const newBody = body;
      console.log(newBody);
      /*  if (users.find(x => x.description === newBody.description)) {
         return error('description "' + newBody.description + '" is already taken')
       } */
      newBody.id = tasks.length > 0 ? Math.max(...tasks.map(x => x.id)) + 1 : 1;
      newBody.created = new Date().toDateString();

      newBody.categories = body.categories.map(catid => {
        return categories.find(cat => catid === cat.id);
      });

      tasks.push(newBody);

      const nt = {
        notification: {
          title: 'New Task: ',
          body: newBody.description + ', Created at: ' + newBody.created
        },
        to: window.localStorage.getItem('fcm_token')
      };
      backend.http.post('https://fcm.googleapis.com/fcm/send', nt, httpOptions).subscribe(data => {
        console.log('data', data);
      });

      return ok('created');
    }

    function list() {
      const data = tasks;
      return ok(data);
    }
    function view() {
      const id = url.match(/\/api\/tasks\/(\d+)$/)[1];
      const data = tasks.find(x => x.id === +id);
      return ok(data);
    }

    function ok(body?) {
      console.log(body);
      return of(new HttpResponse({ status: 200, body }));
    }
    function error(message) {
      return throwError({ error: { message } });
    }
  }
}

export const TasksBackendInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TasksBackendInterceptor, multi: true },
];

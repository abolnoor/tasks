import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { TaskService } from '../task.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task$: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.task$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.taskService.getTask(+params.get('id')))
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Task } from '../task';
import { TasksData } from '../tasks-data';
import { TaskService } from '../task.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<any[]>;
  selectedId: number;

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.taskService.getTasks();
    // this.tasks$ = of(TasksData);

     this.tasks$ = this.taskService.getTasks();
  }

}

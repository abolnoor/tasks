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

  tasks$: Observable<Task[]>;
  selectedId: number;

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.taskService.getTasks();
    //this.tasks$ = of(TasksData);

     this.tasks$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.taskService.getTasks();
      })
    );
  }

}

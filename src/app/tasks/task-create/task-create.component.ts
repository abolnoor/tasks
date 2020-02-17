import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';
import { Task } from '../task';
import { Router } from '@angular/router';
@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  taskForm = this.fb.group({
    description: [''],
    sub_tasks: this.fb.array([
    ]),
    deadline: ['']
  });

  /* stGroup = this.fb.group({
    st: this.fb.control('sss')
  });
   */
  st = this.fb.control('');
  get subTasks() {
    return this.taskForm.get('sub_tasks') as FormArray;
  }

  /* get st() {
    return this.taskForm.get('st') as FormControl;
  } */
  newTask$: Observable<Task>;
  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
  }

  ngOnInit(): void {
  }

  addSubTask() {
    console.log('v', this.st);
    this.subTasks.push(this.fb.control(this.st.value));
    this.st.setValue('');
  }
  removeSubTask(index: number) {
    this.subTasks.removeAt(index);
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.taskForm.value);

    this.taskService.createTask(this.taskForm.value).subscribe(data => {
      this.newTask$ = data;
      this.router.navigate(['/tasks']);
    });



  }


}

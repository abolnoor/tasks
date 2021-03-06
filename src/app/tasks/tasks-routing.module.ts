import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskCreateComponent } from './task-create/task-create.component';


const routes: Routes = [
  { path: 'tasks',  component: TaskListComponent },
  { path: 'tasks/create',  component: TaskCreateComponent },
  { path: 'task/:id', component: TaskDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }

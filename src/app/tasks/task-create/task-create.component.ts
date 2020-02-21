import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';
import { Task } from '../task';
import { Router } from '@angular/router';
import { Category } from '../category';
@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit, AfterViewInit {

  taskForm = this.fb.group({
    description: ['', [Validators.required]],
    sub_tasks: this.fb.array([
    ]),
    deadline: ['', [Validators.required]],
    categories: this.fb.array([], [Validators.required])
  });

  @ViewChild('mapElement', { static: false }) mapElement: ElementRef;
  map: google.maps.Map;

  marker: google.maps.Marker;
  /* stGroup = this.fb.group({
    st: this.fb.control('sss')
  });
   */
  st = this.fb.control('');
  cats: Category[];
  get subTasks() {
    return this.taskForm.get('sub_tasks') as FormArray;
  }
  get categories() {
    return this.taskForm.get('categories') as FormArray;
  }

  /* get st() {
    return this.taskForm.get('st') as FormControl;
  } */



  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskService.getCategoriesData().subscribe(cats => {
      this.cats = cats;
      /* this.cats.map(() => {
        this.categories.push(this.fb.control(false));
      }); */

      /* setValue(this.cats.map(cat => {
        return this.fb.control(false);
      })); */
    });
  }


  ngOnInit(): void {

  }

  ngAfterViewInit() {
    const latLng = new google.maps.LatLng(33.5090536, 36.2798887);
    const mapProperties = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // console.log(this.mapElement);
    setTimeout(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: 'Task Location'
      });

      this.map.addListener('click', (e) => {
        this.marker.setPosition(e.latLng);
        this.map.panTo(e.latLng);
      });
    }, 300);

  }

  addSubTask() {
    console.log('v', this.st);
    this.subTasks.push(this.fb.control(this.st.value));
    this.st.setValue('');
  }
  removeSubTask(index: number) {
    this.subTasks.removeAt(index);
  }
  onCheckboxChange(e) {
    if (e.target.checked) {
      this.categories.push(this.fb.control(+e.target.value));
    } else {
      let i = 0;
      this.categories.controls.forEach((item: FormControl) => {
        if (item.value === +e.target.value) {
          this.categories.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(e, this.categories.value, this.taskForm.value);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    const task = this.taskForm.value as Task;
    const loc = this.marker.getPosition().toJSON();
    task.location = { latitude: loc.lat, longitude: loc.lng };
    console.warn(task);
    this.taskService.createTask(task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }


}

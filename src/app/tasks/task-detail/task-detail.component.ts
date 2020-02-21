import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import { } from 'googlemaps';
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
export class TaskDetailComponent implements OnInit, AfterViewInit {
  task$: Observable<any>;
  @ViewChild('mapElement', { static: false }) mapElement: ElementRef;
  map: google.maps.Map;

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

  ngAfterViewInit() {
    this.task$.subscribe(t => {

      const latLng = new google.maps.LatLng(t.location.latitude, t.location.longitude);
      const mapProperties = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      console.log(this.mapElement);
      setTimeout(() => {
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

        const marker = new google.maps.Marker({
          position: latLng,
          title: t.description
        });

        marker.setMap(this.map);
      }, 1000);
    });


  }

}

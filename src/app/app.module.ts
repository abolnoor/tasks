import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TasksBackendInterceptorProviders } from './_api/tasks-backend.interceptor';

import { TasksModule } from './tasks/tasks.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TasksModule,
    AppRoutingModule
  ],
  providers: [
    TasksBackendInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home/home.component';
import { ProjectDetailComponent } from './home/project-detail/project-detail.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { TaskDetailComponent } from './home/task-detail/task-detail.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TeamListComponent } from './team-management/team-list/team-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectDetailComponent,
    NewProjectComponent,
    TaskDetailComponent,
    TeamListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TaskDetailComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home/home.component';
import { ProjectDetailComponent } from './home/project-detail/project-detail.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { TaskDetailComponent } from './home/task-detail/task-detail.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RoleDetailComponent } from './home/role-detail/role-detail.component';
import { PeopleComponent } from './people/people.component';
import { NewPersonComponent } from './people/new-person/new-person.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectDetailComponent,
    NewProjectComponent,
    TaskDetailComponent, RoleDetailComponent, PeopleComponent, NewPersonComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TaskDetailComponent,RoleDetailComponent, NewPersonComponent]
})
export class AppModule { }

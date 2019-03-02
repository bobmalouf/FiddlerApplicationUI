import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectDetailComponent } from './home/project-detail/project-detail.component';
import { PeopleComponent } from './people/people.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: 
    [
      { path: ':id', component: ProjectDetailComponent }
    ]
  },
  { path: 'newProject', component: NewProjectComponent },
  {path: 'people', component: PeopleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

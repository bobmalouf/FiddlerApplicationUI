import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectDetailComponent } from './home/project-detail/project-detail.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent, children: [

    { path: ':id', component: ProjectDetailComponent }

  ] },
  { path: 'new', component: NewProjectComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

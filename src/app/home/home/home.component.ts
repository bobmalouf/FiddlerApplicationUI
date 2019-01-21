import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UiHelperService } from 'src/app/shared/services/ui-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public projects: Project[];

  constructor(private projectService: ProjectService, public ui: UiHelperService, private router: Router){}

  ngOnInit(): void {
    this.getProjects();
    
  }
  private getProjects(): void {
    this.projectService.getProjects().subscribe(a => this.projects = a);
  }

  public getActivatedProject(): Project {
    if(this.router.url.split("/").length > 2){
      return this.projects.filter(a => a.projectId === this.router.url.split("/")[2])[0];
    } else  {
      return null;
    }
  }


}

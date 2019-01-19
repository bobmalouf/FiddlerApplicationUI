import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UiHelperService } from 'src/app/shared/services/ui-helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public projects: Project[];

  constructor(private projectService: ProjectService, public ui: UiHelperService){}

  ngOnInit(): void {
    this.getProjects();
    
  }
  private getProjects(): void {
    this.projectService.getProjects().subscribe(a => this.projects = a);
  }


}

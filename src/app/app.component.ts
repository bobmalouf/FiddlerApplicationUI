import { Component, OnInit } from '@angular/core';
import { ProjectService } from './shared/services/project.service';
import { Project } from './model/project';
import { UiHelperService } from './shared/services/ui-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FiddlerApplicationUI';
  public projects: Project[];

  constructor(private projectService: ProjectService, public ui: UiHelperService){}

  ngOnInit(): void {
    this.getProjects();
    
  }
  private getProjects(): void {
    this.projectService.getProjects().subscribe(a => this.projects = a);
  }

}

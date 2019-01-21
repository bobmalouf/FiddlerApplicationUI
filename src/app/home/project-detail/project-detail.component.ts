import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UiHelperService } from 'src/app/shared/services/ui-helper.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {


  @Input() project: Project;

  constructor(private projectService: ProjectService, public ui: UiHelperService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProject();
    this.route.params.subscribe(() => {
      this.getProject();
    });
  }
  private getProject(): void {
    this.projectService.getProject(this.router.url.split("/")[2]).subscribe(a => this.project = a);
  }

}

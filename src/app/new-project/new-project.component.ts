import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../shared/services/alert.service';
import { AlertType } from '../shared/enum/alert-type.enum';
import { Router } from '@angular/router';
import { Project } from '../model/project';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  public newProjectForm = new FormGroup({
    jsonURL: new FormControl(''),
    json: new FormControl('')

  })

  public sampleJSON: string

  constructor(private httpService: HttpService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
  }

  public previewJSON() {
    this.httpService.post<string>(environment.apiConfig.serviceEndpoints.validateJSON,
      {
        "jsonURL": this.newProjectForm.controls['jsonURL'].value
      }).subscribe(a => {
        this.sampleJSON = a;
        this.alertService.createAlert(AlertType.Primary, "JSON retrieved", true);

      }, () => {
        this.alertService.createAlert(AlertType.Danger, "Error retrieving JSON", true);
      })
  }

  public createProject(): void {
    this.httpService.post<Project>(environment.apiConfig.serviceEndpoints.createProject, {
      "jsonURL": this.newProjectForm.controls['jsonURL'].value
    }).subscribe(a => {
      this.alertService.createAlert(AlertType.Success, "Project Created", true);
      this.router.navigateByUrl('/home/' + a.projectId);

    }), () => {
      this.alertService.createAlert(AlertType.Danger, "Error creating project", true);
    }
  }

}

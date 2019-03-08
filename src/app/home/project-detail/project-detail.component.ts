import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectInformation, Task } from 'src/app/model/project';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UiHelperService } from 'src/app/shared/services/ui-helper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertType } from 'src/app/shared/enum/alert-type.enum';
import { TeamRoleObject } from 'src/app/model/team';
import { RoleDetailComponent } from '../role-detail/role-detail.component';
import { TeamMember } from 'src/app/model/teamMember';
import { AddRoleComponent } from '../add-role/add-role.component';
import { AddAttachmentComponent } from '../add-attachment/add-attachment.component';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { FileService } from 'src/app/shared/services/file.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {


  @Input() project: ProjectInformation;
  @Output() refresh = new EventEmitter<boolean>();
  private projectClosed: boolean;
  public fileNames = [];

  constructor(private sanitizer:DomSanitizer, private modal: NgbModal,
    private projectService: ProjectService,
    public ui: UiHelperService, private router: Router, private route: ActivatedRoute, private alertService: AlertService, private fileService: FileService) { }

  ngOnInit(): void {
    this.getProject();
    this.route.params.subscribe(() => {
      this.getProject();
    });
  }
  private getProject(): void {
    this.projectService.getProject(this.router.url.split("/")[2]).subscribe(a => {
      if (!this.project || this.project.projectId !== a.projectId) {
        a.projectStatus == 'Closed' ? this.projectClosed = true : this.projectClosed = false;
      }
      this.project = a;
      if (!this.projectClosed && a.projectStatus == 'Closed') {
        location.reload();
      }
      this.getFileName(this.project.attachments);

    });
  }

  public selectTask(task: Task): void {
    let ref = this.modal.open(TaskDetailComponent);
    ref.componentInstance.task = task;
    ref.componentInstance.ref = ref;
    ref.result.then(a => {
      let proc = this.project.processesArray.find(b => b.subProcessTasks.includes(a));
      this.projectService.completeTask(this.project.projectId,
        this.project.processesArray.indexOf(proc), proc.subProcessTasks.indexOf(a)).subscribe(() => {
          this.getProject();
          this.alertService.createAlert(AlertType.Primary, "Task Updated", true);
          this.refresh.emit(true);

        }, () => {
          this.alertService.createAlert(AlertType.Danger, "Error in updating task", true);

        })
    }, () => {

    })
  }


  public editRole(teamRoleObject: TeamRoleObject): void {
    let ref = this.modal.open(RoleDetailComponent);
    ref.componentInstance.teamRoleObject = teamRoleObject;
    ref.componentInstance.project = this.project;
    ref.componentInstance.ref = ref;
    ref.result.then(() => {
      this.getProject();
      this.refresh.emit(true);

    }, () => {
      // this.alertService.createAlert(AlertType.Danger, "Error in updating task", true);

    })
  }
  public addRole(): void {
    let ref = this.modal.open(AddRoleComponent);
    ref.componentInstance.project = this.project;
    ref.componentInstance.ref = ref;
    ref.result.then(() => {
      this.getProject();
      this.refresh.emit(true);

    }, () => {
      // this.alertService.createAlert(AlertType.Danger, "Error in updating task", true);

    })
  }
  public addAttachment(): void {
    let ref = this.modal.open(AddAttachmentComponent);
    ref.componentInstance.project = this.project;
    ref.componentInstance.ref = ref;
    ref.result.then(() => {
      this.getProject();
      this.refresh.emit(true);

    }, () => {
      // this.alertService.createAlert(AlertType.Danger, "Error in updating task", true);

    })
  }
  public docLink(fileId: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(environment.apiConfig.restURI + environment.apiConfig.serviceEndpoints.fileService.getFile + fileId);
  }
  public getFileName(fileId: string[]): void{
    this.fileNames = [];
    let incrementor = 0;
    for (const file of fileId) {
      this.fileService.getFileName(file.toString()).subscribe(a => {
        console.log("sdf")
        this.fileNames.push(incrementor, 0, {id: file, name: a})
        incrementor++;
      })
    }
  }

}

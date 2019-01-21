import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UiHelperService } from 'src/app/shared/services/ui-helper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/model/task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertType } from 'src/app/shared/enum/alert-type.enum';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {


  @Input() project: Project;
  @Output() refresh = new EventEmitter<boolean>();
  private projectClosed: boolean;

  constructor(private modal: NgbModal,
    private projectService: ProjectService,
    public ui: UiHelperService, private router: Router, private route: ActivatedRoute, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getProject();
    this.route.params.subscribe(() => {
      this.getProject();
    });
  }
  private getProject(): void {
    this.projectService.getProject(this.router.url.split("/")[2]).subscribe(a => {
      if(!this.project || this.project.projectId !== a.projectId){
        a.projectStatus == 'Closed' ? this.projectClosed = true : this.projectClosed = false;
      }
      this.project = a;
      if(!this.projectClosed && a.projectStatus == 'Closed'){
        location.reload();
      }
    
    });
  }

  public selectTask(task: Task): void {
    let ref = this.modal.open(TaskDetailComponent);
    ref.componentInstance.task = task;
    ref.componentInstance.ref = ref;
    ref.result.then(a => {
      (a as Task).taskStatus = "Closed";
      let proc = this.project.processes.find(b => b.tasks.includes(a));
      this.projectService.updateTask(a, this.project.projectId,
        this.project.processes.indexOf(proc), proc.tasks.indexOf(a)).subscribe(() => {
          this.getProject();
          this.alertService.createAlert(AlertType.Primary, "Task Updated", true);
          this.refresh.emit(true);

        }, () => {
          this.alertService.createAlert(AlertType.Danger, "Error in updating task", true);

        })
    }, () => {

    })
  }

}

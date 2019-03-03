import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/project.service';
import { ProjectInformation } from 'src/app/model/project';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertType } from 'src/app/shared/enum/alert-type.enum';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {


  @Input() project: ProjectInformation;
  @Input() ref: NgbModalRef

  public name: String;
  
  constructor(private projectService: ProjectService, private alertService: AlertService) { }

  ngOnInit() {
  }

  public createRole(roleName: String){
    this.projectService.addRole(this.project.projectId, roleName).subscribe(() => {
      this.alertService.createAlert(AlertType.Success, "Crated role " + roleName, false);
      this.saveModal();
    },  err => {
      this.alertService.createAlert(AlertType.Danger, err, false);

    })
  }

  public closeModal() {
    this.ref.dismiss();
  }
  public saveModal() {
    this.ref.close();
  }


}

import { Component, OnInit, Input } from '@angular/core';
import { Task, ProjectInformation } from 'src/app/model/project';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TeamRoleObject } from 'src/app/model/team';
import { TeamMember } from 'src/app/model/teamMember';
import { PeopleService } from 'src/app/shared/services/people.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { AlertType } from 'src/app/shared/enum/alert-type.enum';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {

  constructor(private modal: NgbModal, private ps: PeopleService, private projectService: ProjectService, private alertService: AlertService) { }

  @Input() teamRoleObject: TeamRoleObject;
  @Input() project: ProjectInformation;
  @Input() ref: NgbModalRef

  public teamMembers: TeamMember[];
  public allPeople: TeamMember[];
  public addMode: boolean;

  public selectedPerson: TeamMember;


  ngOnInit() {

    this.ps.getPeople().subscribe(a => {
      this.teamMembers = a.filter(b => this.teamRoleObject.teamMembersInRole.some(c => c == b.teamMemberID));
      this.allPeople = a.filter(b => !this.teamRoleObject.teamMembersInRole.some(c => c == b.teamMemberID));
    })
  }

  public addPerson(person: TeamMember): void {
    let roleIndex = this.project.team.teamRoleList[this.project.team.teamRoleList.indexOf(this.teamRoleObject)];
    this.projectService.addPersonToRole(this.project.projectId, this.project.team.teamRoleList.indexOf(roleIndex),
      (person as TeamMember).teamMemberID).subscribe(() => {
        this.alertService.createAlert(AlertType.Success, "Added " + person.teamMemberName + " added", false);
        this.saveModal();
      }, err => {
        this.alertService.createAlert(AlertType.Danger, err, false);

      })

  }

  public removeRole(){
    this.projectService.removeRole(this.project.projectId, this.project.team.teamRoleList.indexOf(this.teamRoleObject)).subscribe(() => {
      this.alertService.createAlert(AlertType.Success, "Removed role", false);
      this.saveModal();

    });
    
  }

  public closeModal() {
    this.ref.dismiss();
  }
  public saveModal() {
    this.ref.close();
  }

}

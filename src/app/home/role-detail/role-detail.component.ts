import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/model/project';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TeamRoleObject } from 'src/app/model/team';
import { TeamMember } from 'src/app/model/teamMember';
import { PeopleService } from 'src/app/shared/services/people.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {

  constructor(private modal: NgbModal, private ps: PeopleService) { }

  @Input() teamRoleObject: TeamRoleObject;
  @Input() ref: NgbModalRef

  public teamMembers: TeamMember[];
  public allPeople: TeamMember[];
  public addMode: boolean;

  public selectedPerson: TeamMember;


  ngOnInit() {

    this.ps.getPeople().subscribe(a => {
      this.allPeople = a;
      this.teamMembers = this.allPeople.filter(b => this.teamRoleObject.teamMembersInRole.some( c => c == b.teamMemberID));
    })
  }

  public closeModal() {
    this.ref.dismiss();
  }
  public saveModal() {
    this.ref.close(this.selectedPerson);
  }

}

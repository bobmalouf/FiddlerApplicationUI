import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../shared/services/people.service';
import { TeamMember } from '../model/teamMember';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPersonComponent } from './new-person/new-person.component';
import { AlertService } from '../shared/services/alert.service';
import { AlertType } from '../shared/enum/alert-type.enum';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  constructor(private ps: PeopleService, private modal: NgbModal, private alertService: AlertService) { }

  public allPeople: TeamMember[];

  ngOnInit() {

    this.ps.getPeople().subscribe(a => {
      this.allPeople = a;
    })
  }

  public createPerson(): void {
    let ref = this.modal.open(NewPersonComponent);
    ref.componentInstance.ref = ref;
    ref.result.then(a => {
      this.ps.createPerson(a).subscribe(() => {
        this.alertService.createAlert(AlertType.Primary, "Person Created", true);
        // this.refresh.emit(true);
        this.ngOnInit();

      }, () => {
        this.alertService.createAlert(AlertType.Danger, "Error in creating person", true);

      })
    }, () => {

    })
  }

}

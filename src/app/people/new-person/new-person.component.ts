import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.scss']
})
export class NewPersonComponent implements OnInit {

  constructor() { }

  @Input() ref: NgbModalRef
  public name: String;

  ngOnInit() {
  }

  public closeModal() {
    this.ref.dismiss();
  }
  public saveModal() {
    this.ref.close(this.name);
  }

}

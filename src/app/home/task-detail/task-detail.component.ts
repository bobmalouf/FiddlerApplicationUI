import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/model/project';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  @Input() task: Task;
  @Input() ref: NgbModalRef


  ngOnInit() {
  }

  public closeModal() {
    this.ref.dismiss();
  }
  public saveModal() {
    this.ref.close(this.task);
  }

}

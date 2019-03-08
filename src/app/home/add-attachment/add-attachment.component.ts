import { Component, OnInit, Input } from '@angular/core';
import { ProjectInformation } from 'src/app/model/project';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/shared/services/project.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertType } from 'src/app/shared/enum/alert-type.enum';
import { FileUploader, FileItem } from 'ng2-file-upload';


@Component({
  selector: 'app-add-attachment',
  templateUrl: './add-attachment.component.html',
  styleUrls: ['./add-attachment.component.scss']
})
export class AddAttachmentComponent implements OnInit {

  @Input() project: ProjectInformation;
  @Input() ref: NgbModalRef

  public name: String;
  public uploader:FileUploader = new FileUploader({});
  
  constructor(private projectService: ProjectService, private alertService: AlertService) {

    this.uploader.onAfterAddingFile = (file) => {
      this.uploadFile(file);
    }
   }

  ngOnInit() {
  }

  public uploadFile(file: FileItem){
    this.projectService.addDocument(this.project.projectId, file._file).subscribe(() => {
      this.alertService.createAlert(AlertType.Success, "Added document", false);
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

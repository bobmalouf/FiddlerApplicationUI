import { Injectable } from '@angular/core';
import { ProjectInformation, Task } from 'src/app/model/project';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {  ProjectTeam} from "src/app/model/team";


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpService: HttpService) { }


  public getFileName(fileId: string): Observable<any> {
    return this.httpService.getRawText(environment.apiConfig.serviceEndpoints.fileService.getFile + fileId + '/name');
    }
  
}

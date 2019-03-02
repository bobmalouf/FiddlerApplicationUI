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
export class ProjectService {

  constructor(private httpService: HttpService) { }


  public getProjects(): Observable<ProjectInformation[]> {
    return this.httpService.get<ProjectInformation[]>(environment.apiConfig.serviceEndpoints.projectService.getProjects).pipe(map(a => {
      return a.map(b => { b.created = new Date(b.created).toDateString(); return b; })
    }));
  }
  public getProject(id: String): Observable<ProjectInformation> {
    return this.httpService.get<ProjectInformation>(environment.apiConfig.serviceEndpoints.projectService.getProject + '/' + id).pipe(map(b => {
      b.created = new Date(b.created).toDateString(); return b;
    })
    );
  }

  public addPersonToRole(projectId: String, roleIndex: number, personId: String): Observable<ProjectTeam> {
    return this.httpService.post<ProjectTeam>(environment.apiConfig.serviceEndpoints.projectService.getProject + '/' + projectId + '/team/' + 
    roleIndex + '/add', personId);
    // return of(null);
  }
  public updateTask(task: Task, projectId: String, processId: number, taskId: number): Observable<Task> {
    console.log(projectId + ' - ' + processId + ' = ' + taskId)
    console.log(task)
    return this.httpService.post<Task>(environment.apiConfig.serviceEndpoints.projectService.getProject + '/' + projectId + '/' + 
    processId + '/' + taskId, task);
    // return of(null);
  }
  public completeTask(projectId: String, processId: number, taskId: number): Observable<Task> {
    console.log(projectId + ' - ' + processId + ' = ' + taskId)
    return this.httpService.post<Task>(environment.apiConfig.serviceEndpoints.projectService.getProject + '/' + projectId + '/' + 
    processId + '/' + taskId + "/status", "COMPLETED");
    // return of(null);
  }
}

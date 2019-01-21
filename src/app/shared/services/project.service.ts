import { Injectable } from '@angular/core';
import { Project } from 'src/app/model/project';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/model/task';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpService: HttpService) { }


  public getProjects(): Observable<Project[]> {
    return this.httpService.get<Project[]>(environment.apiConfig.serviceEndpoints.getProject).pipe(map(a => {
      return a.map(b => { b.created = new Date(b.created); return b; })
    }));
  }
  public getProject(id: String): Observable<Project> {
    return this.httpService.get<Project>(environment.apiConfig.serviceEndpoints.getProject + '/' + id).pipe(map(b => {
      b.created = new Date(b.created); return b;
    })
    );
  }
  public updateTask(task: Task, projectId: String, processId: number, taskId: number): Observable<Task> {
    console.log(projectId + ' - ' + processId + ' = ' + taskId)
    console.log(task)
    return this.httpService.post<Task>(environment.apiConfig.serviceEndpoints.getProject + '/' + projectId + '/' + 
    processId + '/' + taskId, task);
    // return of(null);
  }
}

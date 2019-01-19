import { Injectable } from '@angular/core';
import { Project } from 'src/app/model/project';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}

import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { ProjectInformation, Task } from 'src/app/model/project';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { TeamMember } from 'src/app/model/teamMember';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpService: HttpService) { }


  public getPeople(): Observable<TeamMember[]> {
    return this.httpService.get<TeamMember[]>(environment.apiConfig.serviceEndpoints.peopleService.getPeople).pipe(map(a => {
      return a.map(b => {
      b.teamMemberStartDate = new Date(b.teamMemberStartDate).toDateString();
        b.teamMemberEndDate ? b.teamMemberEndDate = new Date(b.teamMemberStartDate).toDateString() : null; return b;
      })
    }));
  }
  public getPerson(id: String): Observable<TeamMember> {
    return this.httpService.get<TeamMember>(environment.apiConfig.serviceEndpoints.peopleService.getPerson + '/' + id).pipe(map(b => {
      b.teamMemberStartDate = new Date(b.teamMemberStartDate).toDateString();
      b.teamMemberEndDate ? b.teamMemberEndDate = new Date(b.teamMemberStartDate).toDateString() : null; return b;
    })
    );
  }
  public createPerson(name: String): Observable<TeamMember> {
    return this.httpService.post<TeamMember>(environment.apiConfig.serviceEndpoints.peopleService.createPerson, name);
    // return of(null);
  }
}

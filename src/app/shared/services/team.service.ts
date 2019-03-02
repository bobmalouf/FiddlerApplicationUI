import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { ProjectTeam } from 'src/app/model/team';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpService: HttpService) { }


  public getTeams(): Observable<ProjectTeam[]> {
    return this.httpService.get<ProjectTeam[]>(environment.apiConfig.serviceEndpoints.teamService.getTeams);
  }
  public getTeam(id: String): Observable<ProjectTeam> {
    return this.httpService.get<ProjectTeam>(environment.apiConfig.serviceEndpoints.teamService.getTeam + '/' + id)
  }

  public createNewTeam(): Observable<ProjectTeam> {
    return this.httpService.post<ProjectTeam>(environment.apiConfig.serviceEndpoints.teamService.createTeam,
      "https://raw.githubusercontent.com/bobmalouf/FiddlerTemplates/master/src/templates/json/TechnologyPatentReviewTeamTemplate.json");
  }

}

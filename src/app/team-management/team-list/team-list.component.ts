import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/shared/services/team.service';
import { UiHelperService } from 'src/app/shared/services/ui-helper.service';
import { Router } from '@angular/router';
import { ProjectTeam } from "src/app/model/team";
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertType } from 'src/app/shared/enum/alert-type.enum';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  public teams: ProjectTeam[] = [];

  constructor(private ts: TeamService, public ui: UiHelperService,
    private router: Router, private as: AlertService){}


    ngOnInit(): void {
      this.getTeamsFromService();
    }

    public getTeamsFromService(): void {
      this.ts.getTeams().subscribe(a => this.teams = a);
    }

    public createNewTeam(): void {
      this.ts.createNewTeam().subscribe(a => {
        this.as.createAlert(AlertType.Success, "Team " + a.teamId + " created", false);
        this.getTeamsFromService();
      })
    }

    public getActivatedTeam(): ProjectTeam {
      if(this.router.url.split("/").length > 2){
        return this.teams.filter(a => a.teamId === this.router.url.split("/")[2])[0];
      } else  {
        return null;
      }
    }

}

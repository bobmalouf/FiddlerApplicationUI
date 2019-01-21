import { Component, OnInit } from '@angular/core';
import { AlertService } from './shared/services/alert.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'FiddlerApplicationUI';

  public expand: boolean;

  constructor(public alertService: AlertService){
    
  }
 
}
